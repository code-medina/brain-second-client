
export function createSectionIdea(){
/*   const fragment = document.createDocumentFragment() */
  const div = document.createElement('div')
/* 
  div.id = 'idea-list-div'
  div.textContent = 'list the ideas'
 */
  const form = document.createElement('form')
/*   form.id="idea-form"
  fragment.append(div)
 fragment.append(form) 
 return fragment 
 */
  return {div,form};
}
