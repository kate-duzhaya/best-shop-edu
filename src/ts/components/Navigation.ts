export const highlightActiveLink = (): void => {
  const links: HTMLAnchorElement[] = [
    ...document.querySelectorAll<HTMLAnchorElement>(".header__nav-link"),
  ];
  const currentPath = window.location.pathname;
  const className: string = "header__nav-link--active";

  links.forEach((link) => {
    if (currentPath === "/") {
      links[0].classList.add(className);
    }
    if (link.getAttribute("href") === currentPath) {
      link.classList.add(className);
    }
  });
};

export const displayHamburgerMenu = (): void => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("is-open");
    });
  }
};
