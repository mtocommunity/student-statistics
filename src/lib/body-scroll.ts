/**
 * Lock and unlock body scroll. Useful for modals or overlays.
 */
export function controlBodyScrollLock() {
  let scrollY = 0;

  function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
  }

  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
  }

  return { lockScroll, unlockScroll };
}
