import { IdeaLocalStorageRespository } from '../repositories/idea-local-storage.repository'
import { KnowledgeStorageRespository } from '../repositories/knowledge.repository'
import { ideasSeed } from './idea.seed'
import { knowledgeSeed } from './knowledge.seed'

export async function seedIdeas() {
  const repo = new IdeaLocalStorageRespository()
  const lista = await repo.list()
  if (lista.length === 0) {
    ideasSeed.forEach(i => {
      repo.create(i)
    })
  }
}
export async function seedKnowledges() {
  const repo = new KnowledgeStorageRespository()
  const list = await repo.list()
  if (list.length === 0) {
    knowledgeSeed.forEach(k => repo.create(k))
  }
}
