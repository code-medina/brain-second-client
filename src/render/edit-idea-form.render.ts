import type { IdeaSchema } from '../schemas/idea/idea.schema'
import { ideaForm } from '../ui/idea-form'

export function editIdeaFormRender(idea: IdeaSchema) {
  //todo  throw error if idea not defined

  const root = ideaForm()

  root.title.value = idea.title

  root.description.value = idea.description

  root.id.value = idea._id
  root.id.setAttribute('type', 'text')
  root.id.readOnly = true

  root.createdAt.setAttribute('type', 'text')
  root.createdAt.readOnly = true
  root.createdAt.value = new Date(idea.createdAt).toISOString();

  root.cancel.textContent = 'cancel edit'
  root.submit.textContent = 'edit idea'

  return root.form
}
