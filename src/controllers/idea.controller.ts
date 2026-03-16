import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import type { IdeaService } from '../services/idea.service'

export class IdeaController  implements DestroyableController{
  private service: IdeaService
  private container: HTMLElement
  private actions: Record<string, (id: string) => Promise<void> | void>
  constructor(service: IdeaService, container: HTMLElement) {
    this.service = service
    this.container = container
    this.actions = {
      edit: (id: string) => {
        console.log(id)
      },
      delete: (id: string) => {
        console.log(id)
      },
    }
    this.setupDelegation()
  }
  destroy(): void {
    throw new Error('Method not implemented.')
  }
  setupDelegation() {
    console.log('setup delegation idea')
    this.container.addEventListener('submit', (ev: SubmitEvent) => {
      ev.preventDefault()
      const target = ev.target as HTMLFormElement
      const formData = new FormData(target)
      console.log(formData)
    })
    //click
    this.container.addEventListener('click', async (ev: PointerEvent) => {
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
    })
  }
}
