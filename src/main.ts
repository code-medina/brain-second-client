import { MenuController } from './controllers/menu.controller'
import { IdeaLocalStorageRespository } from './repositories/idea-local-storage.repository'
import { seedIdeas } from './seed/seed'
import { IdeaService } from './services/idea.service'
import './style.css'

/* 
const menuIdea=document.getElementById("menu-idea");
const menuDevlog=document.getElementById("menu-devlog");
const menuKnowledge=document.getElementById("menu-knowledge"); */
const menu = document.getElementById('menu')
const routerOutlet = document.getElementById('router-outlet')

const ideaService = new IdeaService(new IdeaLocalStorageRespository())
seedIdeas();//mock 
new MenuController(routerOutlet!, menu!, { idea: ideaService })
