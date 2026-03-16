export function createSectionIdea(): DocumentFragment {
  const fragment = document.createDocumentFragment()
  const div = document.createElement('div')
  div.textContent="list the ideas";
  const form = document.createElement('form')
  
  fragment.append(div)
  fragment.append(form)
  return fragment
}
