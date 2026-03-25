import type { AppServices } from '../interfaces/app.services'
import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { ideaSectionRender } from '../render/idea-section.render'
import { render } from '../render/render'
import type { ModalService } from '../services/modal.service'

import { IdeaController } from './idea.controller'

export class MenuController {
  private routerOutlet: HTMLElement
  private menu: HTMLElement
  private services: AppServices
  private currentController: DestroyableController | null = null
  private router: Record<string, () => void | Promise<void>>
  private modalService:ModalService;
  constructor(
    container: HTMLElement,
    menu: HTMLElement,
    services: AppServices,
    modalService: ModalService
  ) {
    this.modalService=modalService;
    this.routerOutlet = container
    this.menu = menu
    this.services = services
    this.router = {
      idea: this.showIdea.bind(this),
      devlog: this.showDevLog.bind(this),
      knowledge: () => this.showKnowledge(),
    }
    this.setupMenu()
  }

  private setupMenu() {
    this.menu.addEventListener('click', async (ev: PointerEvent) => {
      ev.preventDefault()
      const target = ev.target as HTMLElement
      const action = target.dataset.action
      if (!action) {
        return
      }
      const handler = this.router[action]
      if (handler) {
        await handler()
      }
    })
  }

  private showKnowledge() {
    console.log('show knowledge')
    console.log('create controller knowledge')
  }
  private showDevLog() {
    console.log('show devlog')
    console.log('create controller devLog')
  }
  private showIdea() {
    const section = ideaSectionRender()
    const frag = document.createDocumentFragment()

    frag.append(section.div, section.form)
    render(this.routerOutlet, frag)

    if (this.currentController?.destroy) //elimino anterior controller
    {
      this.currentController.destroy()
    }
    this.currentController = new IdeaController(this.services.idea, this.routerOutlet,this.modalService)
  }

}
