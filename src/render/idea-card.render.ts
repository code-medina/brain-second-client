import type { IdeaSchema } from '../schemas/idea/idea.schema'
import { createIdeaCard } from '../ui/create-idea-card'

export function ideaCardRender(idea: IdeaSchema) {
  console.log(idea)
  const card = createIdeaCard()
  card.title.textContent = idea.title
  card.description.textContent = idea.description
  card.footer.textContent = idea._id
  card.footer.innerHTML += `<button data-action="delete">delete</button>`
  card.footer.innerHTML += `<button data-action="edit">edit</button>`
  card.root.dataset.id=idea._id;
  card.root.id = idea._id //closest

  return card.root
}
