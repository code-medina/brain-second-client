import { MenuController } from './controllers/menu.controller'
import { IdeaLocalStorageRespository } from './repositories/idea-local-storage.repository'
import { seedIdeas, seedKnowledges } from './seed/seed'
import { IdeaService } from './services/idea.service'
import { ModalService } from './core/modal.service'
import './style.css'
import { HandlerError } from './core/handler-error'
import { KnowledgeService } from './services/knowledge.service'
import { KnowledgeStorageRespository } from './repositories/knowledge.repository'

const menu = document.getElementById('menu')
const routerOutlet = document.getElementById('router-outlet')

const ideaService = new IdeaService(new IdeaLocalStorageRespository())
const knowledgeService = new KnowledgeService(new KnowledgeStorageRespository())
seedKnowledges()//mocks
seedIdeas() 
const dialog = document.getElementById('modal-dialog') as HTMLDialogElement
const content = document.getElementById('content-dialog') as HTMLElement

if (dialog && content) {
  const modalService = new ModalService(dialog, content)
  const handlerError = new HandlerError(modalService)

  new MenuController(
    routerOutlet!,
    menu!,
    { idea: ideaService, knowledge: knowledgeService },
    modalService,
    handlerError
  )
}
