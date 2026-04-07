const STORYBOOK_AVATAR_PROXY_URL = "/api/avatar";

export const STORYBOOK_AVATAR_NAMES = [
  "Alex Chen",
  "Jamie Lee",
  "Taylor Kim",
  "Riley Park",
  "Jordan Wu",
  "Morgan Li",
  "Casey Tan",
  "Avery Brooks",
  "Quinn Rivera",
  "Drew Patel",
  "Jane Doe",
  "Sam Green",
  "Alex Blue",
  "Kim Purple",
] as const;

export function buildStoryAvatarUrl(
  name: string,
  size: 64 | 128 | 256 | 512 | 1024 = 128,
): string {
  const params = new URLSearchParams();
  params.set("name", name);
  params.set("size", String(size));
  params.set("style", "professional");

  return `${STORYBOOK_AVATAR_PROXY_URL}?${params.toString()}`;
}

export const AVATAR_IMAGE_OPTIONS = {
  None: "",
  "Alex Chen": buildStoryAvatarUrl("Alex Chen"),
  "Jamie Lee": buildStoryAvatarUrl("Jamie Lee"),
  "Taylor Kim": buildStoryAvatarUrl("Taylor Kim"),
  "Riley Park": buildStoryAvatarUrl("Riley Park"),
  "Jordan Wu": buildStoryAvatarUrl("Jordan Wu"),
  "Morgan Li": buildStoryAvatarUrl("Morgan Li"),
  "Casey Tan": buildStoryAvatarUrl("Casey Tan"),
  "Avery Brooks": buildStoryAvatarUrl("Avery Brooks"),
  "Quinn Rivera": buildStoryAvatarUrl("Quinn Rivera"),
  "Drew Patel": buildStoryAvatarUrl("Drew Patel"),
} as const;

export const avatarImageControlArgType = {
  control: "select",
  options: Object.keys(AVATAR_IMAGE_OPTIONS),
  mapping: AVATAR_IMAGE_OPTIONS,
  description: "Avatar image source URL (None = no image)",
  table: {
    category: "Avatar",
  },
} as Record<string, unknown>;
