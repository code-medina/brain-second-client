import type { HandlerError } from '../core/handler-error'
import type { ModalService } from '../core/modal.service'
import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { newKnowledgeFormRender } from '../render/new-form-knowledge.render'
import { knowledgeCardRender } from '../render/knowledge-card.render'
import { render } from '../render/render'
import { CreateKnowledgeSchema } from '../schemas/knowledge/create-knowledge.schema'
import type { KnowledgeService } from '../services/knowledge.service'
import { EditFormKnowledgeRender } from '../render/edit-knowledge-form.render'
import { UpdateKnowledgeSchema } from '../schemas/knowledge/update-knowledge.schema'

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
      edit: this.showFormEditKnowledge,
      delete: this.deleteAction,
      search: () => alert('mock search'), //todo search not  handle click must be input event
    }
    this.container.addEventListener('click', this.handleClick)
  }

  //init contruct
  private listKnowledge = async () => {
    try {
      const list = await this.service.listKnowledge()
      const div = this.container.querySelector('#knowledge-list-div') as HTMLElement
      if (div) {
        const frag = document.createDocumentFragment()
        list.forEach(k => frag.append(knowledgeCardRender(k)))
        render(div, frag)
      }
    } catch (error) {
      console.log(error)
      this.handlerError.handle(error, '⚠️ Error list knowledge')
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
    const card = target.closest('[data-id]')

    if (handler) {
      if ((action === 'edit' || action === 'delete') && card) {
        const id = card.getAttribute('data-id') || undefined
        await handler(id)
        return
      }
      await handler()
    }
  }
  destroy(): void {
    //limpia listeners
    this.container.removeEventListener('click', this.handleClick)
  }

  //action event

  showFormEditKnowledge = async (id?: string) => {
    if (!id) {
      return
    }
    const exit = await this.service.getById(id)
    if (exit) {
      const form = EditFormKnowledgeRender(exit)
      if (form) {
        this.modalService.registerHandler('submit', ev =>
          this.onSubmitEditKnowledge(ev as SubmitEvent)
        )

        this.modalService.showModal(form)
      }
    }
  }
  onSubmitEditKnowledge = async (ev: SubmitEvent) => {
    ev.preventDefault()
    const target = ev.target as HTMLFormElement
    const formData = new FormData(target)
    const title = formData.get('title')?.toString()
    const content = formData.get('content')?.toString()
    const _id = formData.get('id')?.toString()
    await this.modalService.closeModal()

    const data = UpdateKnowledgeSchema.safeParse({ _id, title, content })
    if (data.success) {
      try {
        const editKnowledge = await this.service.update(data.data)
        const cardEdit = knowledgeCardRender(editKnowledge)
        const card = document.getElementById(data.data._id)
        if (card) {
          card.replaceWith(cardEdit)
        }
      } catch (error) {
        this.handlerError.handle(error, '⚠️ Error edit knowledge')
      }
    } else {
      const error = new Error(`${data.error.issues.map(e => e.message).join('\n')}`)
      this.handlerError.handle(error, '⚠️ Error validation edit input')
    }
  }
  showFormNewKnowledge = () => {
    //need modalservice and
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
  deleteAction = async (id?: string) => {
    if (!id) {
      return
    }
    const card = document.getElementById(id)
    if (card) {
      await this.service.destroy(id)
      card.remove()
    }
  }
}
