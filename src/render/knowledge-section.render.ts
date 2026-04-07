import { createSectionKnowledge } from '../ui/create-section-knowledge'

export function knowledgeSectionRender() {
  const root = createSectionKnowledge()
  root.main.id = 'knowledge-list-div'
  root.button.textContent = 'new'
  root.button.dataset.action = 'new'
  root.input.dataset.action = 'search'
  root.input.placeholder = ' 🔎 search'

  return root
}
