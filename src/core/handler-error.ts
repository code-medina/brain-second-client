import { messageErrorCardRender } from '../render/message-error-card.render'
import type { ModalService } from './modal.service'

export class HandlerError {
  private modalService: ModalService
  constructor(modalService: ModalService) {
    this.modalService = modalService
  }

  handle(err: unknown, title: string = '🚨 Error') {
    const message = err instanceof Error ? err.message : ' ⚠️​ unexpected error'
    const card = messageErrorCardRender(title, message)
    this.modalService.showModal(card)
  }
}
