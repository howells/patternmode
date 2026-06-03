export const shouldIgnoreKeyboardNavigationTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof Element)) {
    return false;
  }

  return (
    (target as HTMLElement).isContentEditable ||
    Boolean(
      target.closest(
        'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], audio, video',
      ),
    )
  );
};
