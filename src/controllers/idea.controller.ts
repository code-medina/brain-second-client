import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import type { IdeaService } from '../services/idea.service'

export class IdeaController implements DestroyableController {
  private service: IdeaService
  private container: HTMLElement
  private actions: Record<string, (id: string) => Promise<void> | void>
  constructor(service: IdeaService, container: HTMLElement) {
    this.service = service
    this.container = container
    //binds
    this.destroy.bind(this)
    this.handlerSubmit.bind(this)
    this.handlerClick.bind(this)

    //actions
    this.actions = {
      edit: (id: string) => {
        this.editIdea(id)
      },
      delete: (id: string) => {
        this.deleteIdea(id)
      },
    }
    this.setupDelegation()
  }

  destroy(): void {
    this.container.removeEventListener('submit', this.handlerSubmit)
    this.container.removeEventListener('click', this.handlerClick)
  }

  private async handlerClick(ev: PointerEvent) {
    ev.preventDefault()
    const target = ev.target as HTMLElement
    const action = target.dataset.action
    if (!action) {
      return
    }
    const handler = this.actions[action]
    if (handler) {
      await handler('id')
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
    this.container.addEventListener('submit', this.handlerSubmit)
    //click
    this.container.addEventListener('click', this.handlerClick)
  }

  private async deleteIdea(id: string): Promise<void> {
    await this.service.destroy(id)
  }
  private async editIdea(id: string) {
    //todo
    console.log('edit idea show modal??', id)
  }
}
