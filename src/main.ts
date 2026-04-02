import { MenuController } from './controllers/menu.controller'
import { IdeaLocalStorageRespository } from './repositories/idea-local-storage.repository'
import { seedIdeas } from './seed/seed'
import { IdeaService } from './services/idea.service'
import { ModalService } from './core/modal.service'
import './style.css'
import { HandlerError } from './core/handler-error'

/* 
const menuIdea=document.getElementById("menu-idea");
const menuDevlog=document.getElementById("menu-devlog");
const menuKnowledge=document.getElementById("menu-knowledge"); */
const menu = document.getElementById('menu')
const routerOutlet = document.getElementById('router-outlet')

const ideaService = new IdeaService(new IdeaLocalStorageRespository())
seedIdeas() //mock
const dialog = document.getElementById('modal-dialog') as HTMLDialogElement
const content = document.getElementById('content-dialog') as HTMLElement
if (dialog && content) {
  const modalService = new ModalService(dialog, content)
  const handlerError=new HandlerError(modalService);
  new MenuController(routerOutlet!, menu!, { idea: ideaService }, modalService,handlerError)
}
