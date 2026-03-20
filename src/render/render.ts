export function render(container: HTMLElement, fragmento: DocumentFragment) {
  if (container) {
    container.innerHTML = ''
    console.log("add fragmento",fragmento)
    container.append(fragmento)
  }
}
