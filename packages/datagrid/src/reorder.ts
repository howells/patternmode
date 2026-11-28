import type { DragEvent } from "react";
import { useState } from "react";

/** Moves `id` to where `target` stands in `ids`. */
export const moveId = (ids: readonly string[], id: string, target: string): string[] => {
  const next = ids.filter((candidate) => candidate !== id);
  const at = next.indexOf(target);
  const after = ids.indexOf(id) < ids.indexOf(target);

  next.splice(at + (after ? 1 : 0), 0, id);

  return next;
};

/**
 * Drag to reorder a short list: spread the returned props onto each item.
 */
export const useDragReorder = (ids: readonly string[], onReorder: (ids: string[]) => void) => {
  const [dragged, setDragged] = useState<string | null>(null);

  return (id: string) => ({
    "data-dragging": dragged === id ? "" : undefined,
    draggable: true,
    onDragEnd: () => {
      setDragged(null);
    },
    onDragOver: (event: DragEvent) => {
      event.preventDefault();

      if (dragged !== null && dragged !== id) {
        onReorder(moveId(ids, dragged, id));
      }
    },
    onDragStart: () => {
      setDragged(id);
    },
  });
};
