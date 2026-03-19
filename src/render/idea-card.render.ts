import type { IdeaSchema } from '../schemas/idea/idea.schema'
import { createIdeaCard } from '../ui/create-idea-card'

export function ideaCardRender(idea: IdeaSchema) {
  console.log(idea)
  const card = createIdeaCard()
  card.title.textContent = idea.title
  card.description.textContent = idea.description
  card.footer.textContent=idea._id;
  return card.root;
}
