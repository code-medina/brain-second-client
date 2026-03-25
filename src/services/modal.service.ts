export class ModalService {
  modal: HTMLDialogElement
  content:HTMLElement;
  constructor(container: HTMLDialogElement,content:HTMLElement) {
    this.modal = container
    this.content=content;
  }

showModal = (element: HTMLElement) => {
    if (this.content) {
      this.content.replaceChildren()
      this.content.append(element);
      this.modal.showModal()
    }
  }
  closeModal = async () => {
    this.modal.close()
  }
  
  
}
