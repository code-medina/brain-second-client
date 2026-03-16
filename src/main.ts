import { MenuController } from './controllers/menu.controller'
import { LocalStorageRespository } from './repositories/local-storage.repository'
import { IdeaService } from './services/idea.service'
import './style.css'

/* 
const menuIdea=document.getElementById("menu-idea");
const menuDevlog=document.getElementById("menu-devlog");
const menuKnowledge=document.getElementById("menu-knowledge"); */
const menu = document.getElementById('menu')
const routerOutlet = document.getElementById('router-outlet')

const ideaService = new IdeaService(new LocalStorageRespository())
 new MenuController(routerOutlet!, menu!, { idea: ideaService })

