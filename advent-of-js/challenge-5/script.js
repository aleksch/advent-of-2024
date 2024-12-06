const textarea = document.querySelector('#textarea')
const counter = document.querySelector('.textarea-counter span')

function updateCounter(value) {
  counter.innerHTML = Number(value)
}

textarea.addEventListener('input', (ev) => {
  updateCounter(ev.currentTarget.value.length)
})

document.addEventListener('DOMContentLoaded', () => {
  updateCounter(textarea.value.length)
})
