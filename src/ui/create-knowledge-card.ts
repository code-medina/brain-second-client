export function createKnowledgeCard() {
  const div = document.createElement('div')

  const header = document.createElement('header')
  const title = document.createElement('h2')
  header.append(title)

  const main = document.createElement('main')
  const content = document.createElement('p')
  main.append(content)

  const footer = document.createElement('footer')
 
  div.append(header)
  div.append(main)
  div.append(footer)
  return { div, title, main, content,footer }
}
