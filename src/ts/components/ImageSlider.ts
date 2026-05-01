export const scrollImageSlider = (): void => {
  const track = document.querySelector(".slider__track") as HTMLUListElement;
  const prevBtn = document.querySelector(
    ".slider__control.prev",
  ) as HTMLButtonElement;
  const nextBtn = document.querySelector(
    ".slider__control.next",
  ) as HTMLButtonElement;

  if (!track || !prevBtn || !nextBtn) return;

  nextBtn.addEventListener("click", () => {
    const scrollAmount = track.clientWidth;
    const gap = parseInt(getComputedStyle(track).getPropertyValue("gap")) || 0;

    track.scrollBy({
      left: scrollAmount + gap,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    const scrollAmount = track.clientWidth;
    const gap = parseInt(getComputedStyle(track).getPropertyValue("gap")) || 0;

    track.scrollBy({
      left: -(scrollAmount + gap),
      behavior: "smooth",
    });
  });

  track.addEventListener("scrollend", () => {
    const atStart = track.scrollLeft <= 0;
    const atEnd =
      Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth;

    prevBtn.classList.toggle("slider__control--disabled", atStart);
    nextBtn.classList.toggle("slider__control--disabled", atEnd);
  });
};
