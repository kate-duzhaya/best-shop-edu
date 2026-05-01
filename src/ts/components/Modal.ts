export class Modal {
  private _modalMarkupPath: string;
  private _openBtnId?: string;
  private _activeDialog: HTMLDialogElement | null = null;

  constructor(modalMarkupPath: string, openBtnId?: string) {
    this._openBtnId = openBtnId;
    this._modalMarkupPath = modalMarkupPath;
    this.init();
  }

  private init(): void {
    if (this._openBtnId) {
      const openBtn = document.getElementById(
        this._openBtnId,
      ) as HTMLButtonElement;

      if (openBtn) {
        openBtn.addEventListener("click", () => this.open());
      }
    }
  }

  async open(): Promise<void> {
    if (this._activeDialog) return;

    try {
      const res = await fetch(this._modalMarkupPath);
      const htmlText = await res.text();

      const parser = new DOMParser();
      const markup = parser.parseFromString(htmlText, "text/html");
      const dialogNode = markup.querySelector("dialog") as HTMLDialogElement;

      if (dialogNode) {
        document.body.append(dialogNode);
        this._activeDialog = dialogNode;

        const closeBtn = dialogNode.querySelector(
          ".close-modal",
        ) as HTMLImageElement;

        if (closeBtn) {
          closeBtn.addEventListener("click", () => this.close());
        }

        this._activeDialog.addEventListener("click", (event: MouseEvent) => {
          if (!this._activeDialog) return;

          const rect = this._activeDialog.getBoundingClientRect();
          const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.bottom &&
            rect.left <= event.clientX &&
            event.clientX <= rect.right;

          if (!isInDialog) {
            this.close();
          }
        });

        this._activeDialog.showModal();
      }
    } catch (err) {
      console.error("Failed to load modal:", err);
    }
  }

  close(): void {
    if (this._activeDialog) {
      this._activeDialog.close();
      this._activeDialog.remove();
      this._activeDialog = null;
    }
  }
}
