import type { ModalService } from '../core/modal.service'
import type { DestroyableController } from '../interfaces/destroyable-controller.interface'
import { newKnowledgeFormRender } from '../render/form-knowledge.render'
import { knowledgeCardRender } from '../render/knowledge-card.render'
import { render } from '../render/render'
import { CreateKnowledgeSchema } from '../schemas/knowledge/create-knowledge.schema'

export class KnowledgeController implements DestroyableController {
  private modalService: ModalService
  private container: HTMLElement

  private actions: Record<string, (id?: string) => Promise<void> | void>

  constructor(container: HTMLElement, modalService: ModalService) {
    this.modalService = modalService
    this.container = container
    this.listKnowledge()
    this.actions = {
      new: this.showFormNewKnowledge,
      edit: () => alert('edit knowledge'),
      delete: () => alert('delete knowledge'),
      search: () => alert('mock search'), //todo search not  handle click must be input event
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
    this.container.removeEventListener('click', this.handleClick)
  }

  //action event
  showFormNewKnowledge = () => {
    //need modalservice and
    const p = document.createElement('p')
    p.textContent = 'new knowledge form'
    const form = newKnowledgeFormRender()

    this.modalService.showModal(form)
    //  create form
    // handle new know with service

    this.modalService.registerHandler('submit', async (ev: Event) => {
      //close formulario 
      ev.preventDefault()
      const e = ev as SubmitEvent
      const target = e.target as HTMLFormElement
      const formData = new FormData(target)
      const title = formData.get('title')?.toString()
      const content = formData.get('content')?.toString()
      const schema = CreateKnowledgeSchema.safeParse({ title, content })
      this.modalService.closeModal();
      if (!schema.success) {
        //handleError
        alert('no valido')
        return
      }
      alert('new knowledge')
    })
  }
}
