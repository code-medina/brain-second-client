import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { knowledgeCardRender } from '../render/knowledge-card.render'
import { render } from '../render/render'

export class KnowledgeController implements DestroyableController {
  private container: HTMLElement
  private actions: Record<string, (id?: string) => void | Promise<void>>

  constructor(container: HTMLElement) {
    this.container = container
    this.listKnowledge()
    this.actions = {
      search: () => alert(
        'mock search'),
    }
    this.container.addEventListener('click', this.handleClick)
  }

  //init contruct
  private listKnowledge = async () => {
    const list = [{ _id: '1', title: 'cli', content: 'contente cli', createdAt: new Date() }]
    console.log(list)
    console.log(this.container)
    const div = this.container.querySelector('#knowledge-list-div') as HTMLElement
    if (div) {
      console.log('ui list', div, list)
      const frag = document.createDocumentFragment()
      list.forEach(k => frag.append(knowledgeCardRender(k)))
      render(div, frag)
    }

    // container.query selector(id) div
    //append list
    //  render(div, frag)
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
    throw new Error('Method not implemented.')
  }
}
