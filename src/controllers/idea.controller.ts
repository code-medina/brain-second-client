import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { ideaCardRender } from '../render/idea-card.render'
import type { IdeaService } from '../services/idea.service'

export class IdeaController implements DestroyableController {
  private service: IdeaService
  private container: HTMLElement
  private actions: Record<string, (id: string) => Promise<void> | void>
  private boundHandlerClick: (ev: PointerEvent) => Promise<void>
  private boundHandlerSubmit: (ev: SubmitEvent) => Promise<void>
  constructor(service: IdeaService, container: HTMLElement) {
    this.service = service
    this.container = container
    //binds
    this.boundHandlerClick = this.handlerClick.bind(this)
    this.boundHandlerSubmit = this.handlerSubmit.bind(this)
    /* this.destroy = this.destroy.bind(this) */

    //actions
    this.actions = {
      edit: this.editIdea.bind(this),
      delete: this.deleteIdea.bind(this),
    }
    console.log(this.actions)
    this.setupDelegation()
    this.listIdea()
  }

  destroy(): void {
    this.container.removeEventListener('submit', this.boundHandlerSubmit)
    this.container.removeEventListener('click', this.boundHandlerClick)
  }

  private async handlerClick(ev: PointerEvent) {
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
  private async handlerSubmit(ev: SubmitEvent) {
    ev.preventDefault()

    const target = ev.target as HTMLFormElement
    const formData = new FormData(target)
    console.log(formData)
  }
  setupDelegation() {
    console.log('setup delegation idea')
    this.container.addEventListener('submit', this.boundHandlerSubmit)
    //click
    this.container.addEventListener('click', this.boundHandlerClick)
  }

  private async deleteIdea(id: string): Promise<void> {
    await this.service.destroy(id)
  }
  private async editIdea(id: string) {
    //todo
    //show form edit idea
    console.log('show form with idea', id)
  }
  private async listIdea() {
    const list = await this.service.getAll()
    console.log(list)
    // add card the list
    console.log(this.container)

    const div = this.container.querySelector('#idea-list-div')
    console.log(div)
    list.forEach(l => {
      div?.append(ideaCardRender(l))
    })
  }
}
