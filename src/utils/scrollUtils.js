export function scrollToTop(behavior) {
  window.scrollTo({ top: 0, behavior: behavior || "smooth" });
}

export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementTop - 100,
      behavior: "smooth",
    });
  }
}
