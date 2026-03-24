export function ideaForm() {
  const form = document.createElement('form')
  const title = document.createElement('input')
  title.setAttribute('type', 'text')
  const submit = document.createElement('button')
  submit.setAttribute('type', 'submit')
  const cancel = document.createElement('button')
  cancel.setAttribute('type', 'button')
  form.append(title, submit, cancel)
  return { form, title, submit, cancel }
}
