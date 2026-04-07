export class ModalService {
  modal: HTMLDialogElement
  content: HTMLElement
  constructor(container: HTMLDialogElement, content: HTMLElement) {
    this.modal = container
    this.content = content
  }

  registerHandler(type: string, handler: (ev: Event) => void | Promise<void>) {
    this.content.addEventListener(type, handler, { once: true })
  }
  showModal = (element: HTMLElement) => {
    console.log("funciona??")
    if (this.content) {
      this.content.replaceChildren()
      this.content.append(element)
      this.modal.showModal()
    }
  }
  closeModal = async () => {
    this.modal.close()
  }
}
