/** 3D vector in model space. The sphere has unit radius. */
export interface BrioletteVec3 {
  x: number;
  y: number;
  z: number;
}

/** Unit quaternion describing the sphere's orientation. */
export interface BrioletteQuat {
  w: number;
  x: number;
  y: number;
  z: number;
}

/** A single triangular facet of the geodesic sphere. */
export interface BrioletteFace {
  /** Unit vector through the facet centroid — the facet's "direction" on the sphere. */
  center: BrioletteVec3;
  index: number;
  vertices: [BrioletteVec3, BrioletteVec3, BrioletteVec3];
}

/** A facet after rotation and projection, ready to render as an SVG polygon. */
export interface BrioletteProjectedFace {
  /** Projected centroid, used to place the selection pin. */
  center: { x: number; y: number };
  /** Rotated centroid z — larger is closer to the viewer. */
  depth: number;
  index: number;
  /** SVG polygon points string. */
  points: string;
}

/** SVG viewBox edge length. */
export const BRIOLETTE_VIEWBOX_SIZE = 320;

/** Sphere radius inside the viewBox. */
export const BRIOLETTE_RADIUS = 112;

/** Weak perspective strength — camera distance in sphere radii. */
export const BRIOLETTE_PERSPECTIVE = 5;

/** Facets whose rotated centroid sits behind this depth are culled. */
const BACKFACE_DEPTH = -0.12;

const GOLDEN = (1 + Math.sqrt(5)) / 2;

export const normalizeBrioletteVec = (v: BrioletteVec3): BrioletteVec3 => {
  const length = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / length, y: v.y / length, z: v.z / length };
};

const midpoint = (a: BrioletteVec3, b: BrioletteVec3): BrioletteVec3 =>
  normalizeBrioletteVec({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2 });

const centroid = (a: BrioletteVec3, b: BrioletteVec3, c: BrioletteVec3): BrioletteVec3 =>
  normalizeBrioletteVec({ x: a.x + b.x + c.x, y: a.y + b.y + c.y, z: a.z + b.z + c.z });

const ICOSAHEDRON_VERTICES: BrioletteVec3[] = [
  { x: -1, y: GOLDEN, z: 0 },
  { x: 1, y: GOLDEN, z: 0 },
  { x: -1, y: -GOLDEN, z: 0 },
  { x: 1, y: -GOLDEN, z: 0 },
  { x: 0, y: -1, z: GOLDEN },
  { x: 0, y: 1, z: GOLDEN },
  { x: 0, y: -1, z: -GOLDEN },
  { x: 0, y: 1, z: -GOLDEN },
  { x: GOLDEN, y: 0, z: -1 },
  { x: GOLDEN, y: 0, z: 1 },
  { x: -GOLDEN, y: 0, z: -1 },
  { x: -GOLDEN, y: 0, z: 1 },
].map(normalizeBrioletteVec);

const ICOSAHEDRON_FACES: [number, number, number][] = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1],
];

/**
 * Build the frequency-2 geodesic icosahedron: each of the 20 base triangles
 * splits into 4, with every vertex pushed onto the unit sphere — 80 facets.
 */
export const buildBrioletteFaces = (): BrioletteFace[] => {
  const faces: BrioletteFace[] = [];

  for (const [ai, bi, ci] of ICOSAHEDRON_FACES) {
    const a = ICOSAHEDRON_VERTICES[ai];
    const b = ICOSAHEDRON_VERTICES[bi];
    const c = ICOSAHEDRON_VERTICES[ci];
    if (!a || !b || !c) {
      continue;
    }
    const ab = midpoint(a, b);
    const bc = midpoint(b, c);
    const ca = midpoint(c, a);
    const triangles: [BrioletteVec3, BrioletteVec3, BrioletteVec3][] = [
      [a, ab, ca],
      [ab, b, bc],
      [ca, bc, c],
      [ab, bc, ca],
    ];

    for (const vertices of triangles) {
      faces.push({
        center: centroid(vertices[0], vertices[1], vertices[2]),
        index: faces.length,
        vertices,
      });
    }
  }

  return faces;
};

export const BRIOLETTE_IDENTITY_QUAT: BrioletteQuat = { w: 1, x: 0, y: 0, z: 0 };

export const quatFromAxisAngle = (axis: BrioletteVec3, angle: number): BrioletteQuat => {
  const unit = normalizeBrioletteVec(axis);
  const half = angle / 2;
  const sin = Math.sin(half);
  return { w: Math.cos(half), x: unit.x * sin, y: unit.y * sin, z: unit.z * sin };
};

export const quatMultiply = (a: BrioletteQuat, b: BrioletteQuat): BrioletteQuat => ({
  w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
  x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
  y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
  z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
});

export const quatNormalize = (q: BrioletteQuat): BrioletteQuat => {
  const length = Math.hypot(q.w, q.x, q.y, q.z) || 1;
  return { w: q.w / length, x: q.x / length, y: q.y / length, z: q.z / length };
};

export const rotateBrioletteVec = (q: BrioletteQuat, v: BrioletteVec3): BrioletteVec3 => {
  const tx = 2 * (q.y * v.z - q.z * v.y);
  const ty = 2 * (q.z * v.x - q.x * v.z);
  const tz = 2 * (q.x * v.y - q.y * v.x);
  return {
    x: v.x + q.w * tx + (q.y * tz - q.z * ty),
    y: v.y + q.w * ty + (q.z * tx - q.x * tz),
    z: v.z + q.w * tz + (q.x * ty - q.y * tx),
  };
};

/** The view axis — a facet centroid rotated here sits dead-center, facing the viewer. */
export const BRIOLETTE_FRONT: BrioletteVec3 = { x: 0, y: 0, z: 1 };

/** Shortest-arc quaternion rotating unit vector `from` onto unit vector `to`. */
export const quatBetweenVecs = (from: BrioletteVec3, to: BrioletteVec3): BrioletteQuat => {
  const dot = from.x * to.x + from.y * to.y + from.z * to.z;
  if (dot >= 0.999_999) {
    return BRIOLETTE_IDENTITY_QUAT;
  }
  if (dot <= -0.999_999) {
    // Antipodal — rotate 180° about any axis orthogonal to `from`.
    const axis =
      Math.abs(from.x) > 0.9
        ? normalizeBrioletteVec({ x: -from.y, y: from.x, z: 0 })
        : normalizeBrioletteVec({ x: 0, y: -from.z, z: from.y });
    return { w: 0, x: axis.x, y: axis.y, z: axis.z };
  }
  const cross = {
    x: from.y * to.z - from.z * to.y,
    y: from.z * to.x - from.x * to.z,
    z: from.x * to.y - from.y * to.x,
  };
  return quatNormalize({ w: 1 + dot, x: cross.x, y: cross.y, z: cross.z });
};

/** Spherical-linear interpolation between two orientations. */
export const quatSlerp = (a: BrioletteQuat, b: BrioletteQuat, t: number): BrioletteQuat => {
  let cosom = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
  let end = b;
  if (cosom < 0) {
    cosom = -cosom;
    end = { w: -b.w, x: -b.x, y: -b.y, z: -b.z };
  }
  if (cosom > 0.9995) {
    return quatNormalize({
      w: a.w + (end.w - a.w) * t,
      x: a.x + (end.x - a.x) * t,
      y: a.y + (end.y - a.y) * t,
      z: a.z + (end.z - a.z) * t,
    });
  }
  const omega = Math.acos(cosom);
  const sinom = Math.sin(omega);
  const scaleA = Math.sin((1 - t) * omega) / sinom;
  const scaleB = Math.sin(t * omega) / sinom;
  return {
    w: a.w * scaleA + end.w * scaleB,
    x: a.x * scaleA + end.x * scaleB,
    y: a.y * scaleA + end.y * scaleB,
    z: a.z * scaleA + end.z * scaleB,
  };
};

/**
 * Orientation that brings `center` (a facet centroid in model space) to the
 * view axis, keeping the current orientation's roll so the spin feels natural.
 */
export const orientationFacingFront = (
  orientation: BrioletteQuat,
  center: BrioletteVec3,
): BrioletteQuat => {
  const rotated = rotateBrioletteVec(orientation, center);
  return quatNormalize(quatMultiply(quatBetweenVecs(rotated, BRIOLETTE_FRONT), orientation));
};

/** Angular distance between two orientations, in radians. */
export const quatAngleBetween = (a: BrioletteQuat, b: BrioletteQuat): number => {
  const dot = Math.abs(a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z);
  return 2 * Math.acos(Math.min(1, dot));
};

/** Apply a screen-space yaw (around screen Y) then pitch (around screen X) to an orientation. */
export const rotateBrioletteOrientation = (
  orientation: BrioletteQuat,
  yaw: number,
  pitch: number,
): BrioletteQuat =>
  quatNormalize(
    quatMultiply(
      quatFromAxisAngle({ x: 1, y: 0, z: 0 }, pitch),
      quatMultiply(quatFromAxisAngle({ x: 0, y: 1, z: 0 }, yaw), orientation),
    ),
  );

const projectVertex = (v: BrioletteVec3): { x: number; y: number } => {
  const scale = BRIOLETTE_PERSPECTIVE / (BRIOLETTE_PERSPECTIVE - v.z);
  const half = BRIOLETTE_VIEWBOX_SIZE / 2;
  return {
    x: half + v.x * BRIOLETTE_RADIUS * scale,
    y: half - v.y * BRIOLETTE_RADIUS * scale,
  };
};

const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Rotate, cull, and project every facet. Returns visible facets sorted
 * back-to-front (painter's algorithm) for correct silhouette overlap.
 */
export const projectBrioletteFaces = (
  faces: readonly BrioletteFace[],
  orientation: BrioletteQuat,
): BrioletteProjectedFace[] => {
  const projected: BrioletteProjectedFace[] = [];

  for (const face of faces) {
    const rotatedCenter = rotateBrioletteVec(orientation, face.center);
    if (rotatedCenter.z < BACKFACE_DEPTH) {
      continue;
    }

    const points = face.vertices
      .map((vertex) => {
        const point = projectVertex(rotateBrioletteVec(orientation, vertex));
        return `${round(point.x)},${round(point.y)}`;
      })
      .join(" ");
    const center = projectVertex(rotatedCenter);

    projected.push({
      center: { x: round(center.x), y: round(center.y) },
      depth: rotatedCenter.z,
      index: face.index,
      points,
    });
  }

  return projected.toSorted((a, b) => a.depth - b.depth);
};
