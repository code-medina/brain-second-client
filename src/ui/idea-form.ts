export function ideaForm() {
  const form = document.createElement('form')
  const title = document.createElement('input')
  const description=document.createElement("textarea");
  const submit = document.createElement('button')
  const cancel = document.createElement('button')
  const id=document.createElement("input");

  id.setAttribute("type","hidden");
  title.setAttribute('type', 'text')
  submit.setAttribute('type', 'submit')
  cancel.setAttribute('type', 'button')

  form.append(id,title,description, submit, cancel);
  return { form,id ,title,description, submit, cancel }
}
