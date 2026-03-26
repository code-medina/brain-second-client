import { createSectionIdea } from '../ui/create-section-idea'

export function ideaSectionRender() {
  const section = createSectionIdea()
  section.main.id = 'idea-list-div'

  section.button.textContent = 'new idea'
  section.button.dataset.action = 'new'
  console.log('section', section)
  return section
}
