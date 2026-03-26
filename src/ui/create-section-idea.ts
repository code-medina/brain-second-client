export function createSectionIdea() {
  const div = document.createElement('div')
  const main = document.createElement('main')
  const header = document.createElement('header')
  const button = document.createElement('button')
  header.append(button)

  div.append(header)
  div.append(main)
  return { div, header, button, main }
}
