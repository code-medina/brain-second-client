export function createSectionKnowledge() {
  const div = document.createElement('div')

  const main = document.createElement('main')

  const header = document.createElement('header')
  const button = document.createElement('button')
  const input = document.createElement('input') // search
  header.append(button)
  header.append(input)

  div.append(header)
  div.append(main)
  return { div, header, button, input, main }
}
