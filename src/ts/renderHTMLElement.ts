// type ElementType = "header" | "footer";

// const renderHeader = (template: TemplateType): void => {
//   const element: HTMLTemplateElement | null = document.getElementById(
//     template,
//   ) as HTMLTemplateElement | null;

//   if (!element) return;

//   const clone = element.content.cloneNode(true);
//   document.body.appendChild(clone);
// };

export const renderHTMLElement = async (url: string): Promise<void> => {
  const response = await fetch(url);
  const html = await response.text();

  document.body.insertAdjacentHTML("afterbegin", html);
};

// const renderFooter = async (): Promise<void> => {
//   const response = await fetch("../../src/html/footer.html");
//   const html = await response.text();

//   document.body.insertAdjacentHTML("afterbegin", html);
// };
