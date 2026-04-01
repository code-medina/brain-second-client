import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { editIdeaFormRender } from '../render/edit-idea-form.render'
import { ideaCardRender } from '../render/idea-card.render'

import type { IdeaService } from '../services/idea.service'
import type { ModalService } from '../core/modal.service'
import { UpdateIdeaSchema } from '../schemas/idea/update-idea.schema'
import { CreateIdeaSchema } from '../schemas/idea/create-idea.schema'
import { newIdeaFormRender } from '../render/new-idea-form.render'
import { render } from '../render/render'
import { messageErrorCardRender } from '../render/message-error-card.render'

export class IdeaController implements DestroyableController {
  private modalService: ModalService
  private service: IdeaService
  private container: HTMLElement
  private actions: Record<string, (id?: string) => Promise<void> | void>

  constructor(service: IdeaService, container: HTMLElement, modalService: ModalService) {
    this.modalService = modalService
    this.service = service
    this.container = container

    //actions
    this.actions = {
      edit: this.editIdea,
      delete: this.deleteIdea,
      new: this.newIdea,
    }

    this.container.addEventListener('click', this.handlerClick) //setup delegation click
    this.listIdea()
  }

  handlerClick = async (ev: PointerEvent) => {
    ev.preventDefault()
    const target = ev.target as HTMLElement
    const action = target.dataset.action
    if (!action) {
      return
    }

    //new not need to id
    const handler = this.actions[action]
    if (action === 'new') {
      await handler()
      return
    }

    const card = target.closest('[data-id]')
    if (!card) {
      return
    }
    const id = card.getAttribute('data-id') || undefined
    if (!id) {
      return
    }
    console.log('actions and action', this.actions, action)

    if (handler) {
      await handler(id)
    }
  }

  //actions click
  private deleteIdea = async (id?: string): Promise<void> => {
    if (!id) {
      return
    }
    console.log('delete idea')
    await this.service.destroy(id)
    const card = document.getElementById(id)
    console.log('card', card)
    if (card) {
      card.remove()
    }
  }

  private newIdea = async () => {
    const form = newIdeaFormRender()
    //register handler y new form show modal
    this.modalService.registerHandler('click', (ev: Event) => {
      if (ev as PointerEvent) {
        const target = ev.target as HTMLElement
        if (target && target.matches('[type="button"]')) {
          this.modalService.closeModal()
        }
      }
    })
    this.modalService.registerHandler('submit', (ev: Event) =>
      this.handleSubmitNewModal(ev as SubmitEvent)
    )
    this.modalService.showModal(form)
  }

  private editIdea = async (id?: string) => {
    if (!id) {
      return
    }
    const exit = await this.service.getById(id)

    if (exit) {
      const form = editIdeaFormRender(exit)

      this.modalService.registerHandler('click', (ev: Event) => {
        if (ev as PointerEvent) {
          const target = ev.target as HTMLElement
          if (target && target.matches('[type="button"]')) {
            this.modalService.closeModal()
          }
        }
      })
      this.modalService.registerHandler('submit', (ev: Event) =>
        this.handlerSubmitEditModal(ev as SubmitEvent)
      )
      /* form.addEventListener('submit', this.handlerSubmitEdit,{once:true}) */
      this.modalService.showModal(form)

      console.log('show form with idea', id)
    }
  }

  // handler form modal
  private handleSubmitNewModal = async (ev: SubmitEvent) => {
    ev.preventDefault()

    const target = ev.target as HTMLFormElement
    const formData = new FormData(target)

    const title = formData.get('title')?.toString()
    const description = formData.get('description')?.toString()

    console.log('new idea with', title, description)
    const schema = CreateIdeaSchema.safeParse({ title, description })
    if (schema.success) {
      try {
        const newIdea = await this.service.create(schema.data)

        //card append
        const cardNew = ideaCardRender(newIdea)
        console.log('card new ', cardNew)
        const div = this.container.querySelector('#idea-list-div')
        div?.prepend(cardNew)
      } catch (error) {
        console.log('Error new idea input', error)
      }
    } else {
      alert('data invalid')
    }

    this.modalService.closeModal()
  }
  private handlerSubmitEditModal = async (ev: SubmitEvent) => {
    ev.preventDefault()

    const target = ev.target as HTMLFormElement
    const formData = new FormData(target)

    const title = formData.get('title')?.toString()
    const description = formData.get('description')?.toString()
    const id = formData.get('id')?.toString()
    const created = formData.get('created')?.toString()

    console.log('edit idea with', title, description, id, created)
    const card = document.getElementById(id || '')
    if (!card) {
      console.log('no exist card id', id)

      return
    }

    const update = UpdateIdeaSchema.safeParse({ _id: id, title, description })

    if (update.success) {
      try {
        const ideaEdit = await this.service.update(update.data)
        //remplace card
        const cardEdit = ideaCardRender(ideaEdit)
        console.log('edit card', cardEdit)
        card.replaceWith(cardEdit)
      } catch (error) {
        //modal service
        const cardError = messageErrorCardRender(
          'Update failed',
          `Error update idea ${(error as Error)?.message || ''}`
        )
        this.modalService.showModal(cardError)

        console.log('Error edit idea input', error)
      }
    } else {
      const cardError = messageErrorCardRender(
        'Error invalid input',
        update.error.issues.map(t => t.message).join('\n')
      )
      this.modalService.showModal(cardError)
      console.log('Error edit idea input', update.error.issues.map(t => t.message).join('\n'))
    }
  }

  //init contruct
  private listIdea = async () => {
    const list = await this.service.getAll()
    console.log(list)
    const div = this.container.querySelector('#idea-list-div') as HTMLElement
    if (div) {
      const frag = document.createDocumentFragment()
      list.forEach(l => frag.append(ideaCardRender(l)))

      render(div, frag)
    }
  }
  //interface
  destroy(): void {
    this.container.removeEventListener('click', this.handlerClick)
  }
}
