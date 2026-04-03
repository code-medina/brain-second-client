import type { HandlerError } from '../core/handler-error'
import type { ModalService } from '../core/modal.service'
import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { newKnowledgeFormRender } from '../render/form-knowledge.render'
import { knowledgeCardRender } from '../render/knowledge-card.render'
import { render } from '../render/render'
import { CreateKnowledgeSchema } from '../schemas/knowledge/create-knowledge.schema'
import { knowledgeSeed } from '../seed/knowledge.seed'
import type { KnowledgeService } from '../services/knowledge.service'

export class KnowledgeController implements DestroyableController {
  private handlerError: HandlerError
  private modalService: ModalService
  private container: HTMLElement
  private service: KnowledgeService
  private actions: Record<string, (id?: string) => Promise<void> | void>

  constructor(
    container: HTMLElement,
    modalService: ModalService,
    handle: HandlerError,
    service: KnowledgeService
  ) {
    this.service = service
    this.handlerError = handle
    this.modalService = modalService
    this.container = container
    this.listKnowledge()
    this.actions = {
      new: this.showFormNewKnowledge,
      edit: () => alert('edit knowledge'),
      delete: () => alert('delete knowledge'),
      search: () => alert('mock search'), //todo search not  handle click must be input event
    }
    this.container.addEventListener('click', this.handleClick)
  }

  //init contruct
  private listKnowledge = async () => {
    const list = [...knowledgeSeed]
    const div = this.container.querySelector('#knowledge-list-div') as HTMLElement
    if (div) {
      console.log('ui list', div, list)
      const frag = document.createDocumentFragment()
      list.forEach(k => frag.append(knowledgeCardRender(k)))
      render(div, frag)
    }
  }
  //handler click for container
  private handleClick = async (ev: PointerEvent) => {
    ev.preventDefault()
    const target = ev.target as HTMLElement
    if (!target) {
      return
    }
    const action = target.dataset.action
    if (!action) {
      return
    }
    const handler = this.actions[action]
    if (handler) {
      await handler()
    }
  }
  destroy(): void {
    //limpia listeners
    this.container.removeEventListener('click', this.handleClick)
  }

  //action event
  showFormNewKnowledge = () => {
    //need modalservice and
    const p = document.createElement('p')
    p.textContent = 'new knowledge form'
    const form = newKnowledgeFormRender()

    this.modalService.showModal(form)
    //  create form
    // handle new know with service

    this.modalService.registerHandler('submit', async (ev: Event) => {
      const e = ev as SubmitEvent
      this.onSubmitNewKnowledge(e)
    })
  }
  onSubmitNewKnowledge = async (ev: SubmitEvent) => {
    ev.preventDefault()
    const target = ev.target as HTMLFormElement
    const formData = new FormData(target)
    const title = formData.get('title')?.toString() || ''
    const content = formData.get('content')?.toString() || ''
    const dto = { title, content }
    const schema = CreateKnowledgeSchema.safeParse(dto)
    this.modalService.closeModal()
    if (!schema.success) {
      const newError = new Error(`${schema.error.issues.map(e => e.message).join('\n')}`)
      this.handlerError.handle(newError, '⚠️ Error invalid input')
      return
    } else {
      const newKnowledge = await this.service.createKnowledge(dto)
      const card = knowledgeCardRender(newKnowledge)
      if (card) {
        const div = this.container.querySelector('#knowledge-list-div') as HTMLElement
        div?.prepend(card)
      }
    }
  }
}
