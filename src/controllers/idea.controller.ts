import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { editIdeaForm } from '../render/edit-idea-form'
import { ideaCardRender } from '../render/idea-card.render'

import type { IdeaService } from '../services/idea.service'
import type { ModalService } from '../services/modal.service'
import { UpdateIdeaSchema } from '../schemas/idea/update-idea.schema'

export class IdeaController implements DestroyableController {
  private modalService: ModalService
  private service: IdeaService
  private container: HTMLElement
  private actions: Record<string, (id: string) => Promise<void> | void>
  /*   private boundHandlerClick: (ev: PointerEvent) => Promise<void>
  private boundHandlerSubmit: (ev: SubmitEvent) => Promise<void> */

  constructor(service: IdeaService, container: HTMLElement, modalService: ModalService) {
    this.modalService = modalService
    this.service = service
    this.container = container
    //binds  X  refactor arrow f
    /* this.boundHandlerClick = this.handlerClick.bind(this)
    this.boundHandlerSubmit = this.handlerSubmit.bind(this) */

    //actions
    this.actions = {
      edit: this.editIdea,
      delete: this.deleteIdea,
    }
    console.log(this.actions)
    this.setupDelegation()
    this.listIdea()
  }

  handlerClick = async (ev: PointerEvent) => {
    ev.preventDefault()
    const target = ev.target as HTMLElement

    const action = target.dataset.action
    if (!action) {
      return
    }

    const card = target.closest('[data-id]')
    if (!card) {
      return
    }
    const id = card.getAttribute('data-id')
    if (!id) {
      return
    }
    console.log('actions and action', this.actions, action)
    const handler = this.actions[action]
    if (handler) {
      await handler(id)
    }
  }

  private handlerSubmit = async (ev: SubmitEvent) => {
    ev.preventDefault()

    const target = ev.target as HTMLFormElement
    const formData = new FormData(target)
    console.log(formData)
  }
  setupDelegation() {
    console.log('setup delegation idea')
    this.container.addEventListener('submit', this.handlerSubmit)
    //click
    this.container.addEventListener('click', this.handlerClick)
  }

  private deleteIdea = async (id: string): Promise<void> => {
    console.log('delete idea')
    await this.service.destroy(id)
    const card = document.getElementById(id)
    console.log('card', card)
    if (card) {
      card.remove()
    }
  }

  private editIdea = async (id: string) => {
    const exit = await this.service.getById(id)
    if (exit) {
      const form = editIdeaForm(exit)

      this.modalService.registerHandler('submit', this.handlerSubmitEditModal)
      /* form.addEventListener('submit', this.handlerSubmitEdit,{once:true}) */
      this.modalService.showModal(form)

      console.log('show form with idea', id)
    }
  }

  private handlerSubmitEditModal = async (ev: Event) => {
    ev.preventDefault()

    const target = ev.target as HTMLFormElement
    const formData = new FormData(target)
    console.log(formData)
    const title = formData.get('title')?.toString()
    const description = formData.get('description')?.toString()
    const id = formData.get('id')?.toString()
    const created = formData.get('created')?.toString()
    //todo edit service call
    console.log('edit idea with', title, description, id, created)
    //delete handler ev.target.remove->handlerSubmitEdit?
    const update = UpdateIdeaSchema.safeParse({ _id: id, title, description })
    if (update.success) {
      console.log(await this.service.update(update.data))
      //todo buscar card y remplazar con nueva data
    }

    this.modalService.closeModal()
  }

  private listIdea = async () => {
    const list = await this.service.getAll()
    console.log(list)

    const div = this.container.querySelector('#idea-list-div')
    console.log(div)
    list.forEach(l => {
      div?.append(ideaCardRender(l))
    })
  }
  //interface
  destroy(): void {
    this.container.removeEventListener('submit', this.handlerSubmit)
    this.container.removeEventListener('click', this.handlerClick)
  }
}
