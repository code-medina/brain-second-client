import { messageErrorCard } from '../ui/message-error-card'

export function messageErrorCardRender(title: string, message: string) {
  const card = messageErrorCard()
  card.title.textContent = title
  card.message.textContent = message
  return card.root
}
