import type { AppServices } from '../interfaces/app.services'
import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { ideaSectionRender } from '../render/idea-section.render'
import { knowledgeSectionRender } from '../render/knowledge-section.render'
import { render } from '../render/render'
import type { ModalService } from '../core/modal.service'

import { IdeaController } from './idea.controller'
import { KnowledgeController } from './knowledge.controller'
import type { HandlerError } from '../core/handler-error'

export class MenuController {
  private routerOutlet: HTMLElement
  private menu: HTMLElement
  private services: AppServices
  private currentController: DestroyableController | null = null
  private router: Record<string, () => void | Promise<void>>
  private modalService: ModalService
  private handlerError:HandlerError;
  constructor(
    container: HTMLElement,
    menu: HTMLElement,
    services: AppServices,
    modalService: ModalService,
    handlerError:HandlerError
  ) {
    this.handlerError=handlerError;
    this.modalService = modalService
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
    const section = knowledgeSectionRender()
    const frag = document.createDocumentFragment()
    frag.append(section.div)
    render(this.routerOutlet, frag)

    if (this.currentController?.destroy) {
      this.currentController.destroy()
    }
    this.currentController = new KnowledgeController(this.routerOutlet)
  }
  private showDevLog() {
    console.log('show devlog')
    console.log('create controller devLog')
  }
  private showIdea() {
    const section = ideaSectionRender()
    const frag = document.createDocumentFragment()

    frag.append(section.div)
    render(this.routerOutlet, frag)

    if (this.currentController?.destroy) //elimino anterior controller
    {
      this.currentController.destroy()
    }
    this.currentController = new IdeaController(
      this.services.idea,
      this.routerOutlet,
      this.modalService,this.handlerError

    )
  }
}
