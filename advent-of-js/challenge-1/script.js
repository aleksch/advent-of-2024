const toggleButtom = document.querySelector('#toggle-button')
const passwordInput = document.querySelector("#password")
const passwordContainer = document.querySelector('.password-container')

toggleButtom.addEventListener('click', () => {
  const newType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
  passwordInput.setAttribute('type', newType)
  passwordContainer.classList.toggle('password-visible')
})
