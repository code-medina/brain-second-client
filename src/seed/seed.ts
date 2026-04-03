import { IdeaLocalStorageRespository } from '../repositories/idea-local-storage.repository'
import { ideasSeed } from './idea.seed'

export async function seedIdeas() {
  const repo = new IdeaLocalStorageRespository()
  const lista = await repo.list()
  if (lista.length === 0) {
    ideasSeed.forEach(i => {
      repo.create(i)
    })
  }
}
export function seedKnowledges(){

}