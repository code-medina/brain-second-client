export function ideaForm() {
  const form = document.createElement('form')
  const title = document.createElement('input')
  const description = document.createElement('textarea')
  const submit = document.createElement('button')
  const cancel = document.createElement('button')
  const id = document.createElement('input')
  const createdAt = document.createElement('input')

  createdAt.setAttribute('type', 'hidden')
  createdAt.setAttribute('name', 'created')

  id.setAttribute('type', 'hidden')
  id.setAttribute('name', 'id')

  title.setAttribute('type', 'text')
  title.setAttribute('name', 'title')

  description.setAttribute('name', 'description')

  submit.setAttribute('type', 'submit')
  cancel.setAttribute('type', 'button')

  form.append(id ,createdAt, title, description, submit, cancel)
  return { form, id,createdAt, title, description, submit, cancel }
}
