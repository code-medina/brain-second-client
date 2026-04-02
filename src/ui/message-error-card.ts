export function messageErrorCard() {
  const root = document.createElement('div')

  const header = document.createElement('header')
  const main = document.createElement('main')
  const title = document.createElement('h4')
  const message = document.createElement('p')

  header.append(title)
  main.append(message)
  root.append(header, main)
  return { root, title, message }
}
