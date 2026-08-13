(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const revealItems = [...document.querySelectorAll("[data-reveal]")];

  root.classList.add("landing-enhanced");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -9%", threshold: 0.16 });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  if (!finePointer.matches || reducedMotion.matches) return;

  document.querySelectorAll("[data-tilt]").forEach((surface) => {
    let frame = 0;
    const update = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = surface.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        const intensity = surface.dataset.tilt === "hero" ? 10 : surface.dataset.tilt === "media" ? 8 : 5;
        surface.style.setProperty("--tilt-x", `${(x * intensity).toFixed(2)}px`);
        surface.style.setProperty("--tilt-y", `${(y * intensity).toFixed(2)}px`);
        surface.style.setProperty("--tilt-rx", `${(-y * 1.2).toFixed(2)}deg`);
        surface.style.setProperty("--tilt-ry", `${(x * 1.4).toFixed(2)}deg`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      surface.style.setProperty("--tilt-x", "0px");
      surface.style.setProperty("--tilt-y", "0px");
      surface.style.setProperty("--tilt-rx", "0deg");
      surface.style.setProperty("--tilt-ry", "0deg");
    };

    surface.addEventListener("pointermove", update, { passive: true });
    surface.addEventListener("pointerleave", reset, { passive: true });
  });
})();
