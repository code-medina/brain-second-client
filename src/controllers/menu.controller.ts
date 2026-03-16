import type { AppServices } from '../interfaces/app.services'
import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { createSectionIdea } from '../ui/create-section-idea'
import { IdeaController } from './idea.controller'

export class MenuController {
  private routerOutlet: HTMLElement
  private menu: HTMLElement
  private services: AppServices
  private currentController: DestroyableController|null=null;
  private router: Record<string, () => void | Promise<void>>
  constructor(container: HTMLElement, menu: HTMLElement, services: AppServices) {
    this.routerOutlet = container
    this.menu = menu
    this.services = services
    this.router = {
      idea: this.showIdea.bind(this),
      devlog:this.showDevLog.bind(this),
      knowledge:()=>this.showKnowledge(),
    }
    this.setupMenu()
  }
  private render(frag:DocumentFragment)
  {
    this.routerOutlet.innerHTML="";
    this.routerOutlet.append(frag);
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

  private showKnowledge(){
    console.log('show knowledge')
    console.log('create controller knowledge');
   
  }
  private showDevLog() {
    console.log('show devlog')
    console.log('create controller devLog')
  }
  private showIdea() {
    console.log('show idea uis')
    console.log('call service')
    const frag = createSectionIdea()
    this.render(frag);
    /* 
    this.routerOutlet.innerHTML = ''
    this.routerOutlet.append(frag) */
    if(this.currentController?.destroy)//elimino anterior controller 
    {
      this.currentController.destroy();
    }
    this.currentController = new IdeaController(this.services.idea, this.routerOutlet)
  }
}
