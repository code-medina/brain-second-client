import { createSectionIdea } from '../ui/create-section-idea'

export function ideaSectionRender() {
  const section = createSectionIdea()
  section.div.id = 'idea-list-div'
  section.form.id = 'idea-form'
  console.log("section",section);
  return section
}
