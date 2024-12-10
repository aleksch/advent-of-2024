const css = `
<style>
  :host {
    position: relative;
    display: flex;
    * {
      box-sizing: border-box;
    }
  }
  input {
    max-width: 570px;
    width: 100%;
    height: 96px;
    font-size: 20px;
    border: 3px solid rgba(219, 219, 219, 1);
    background-color: rgba(244, 244, 244, 1);
    border-radius: 10px;
    padding: 0 80px 0 32px;
    font-family: Avenir;
  }
  button {
    position: absolute;
    right: 32px;
    height: 32px;
    width: 32px;
    top: calc(50% - 16px);
    border: none;
    background-color: transparent;
    background-image: url('./assetes/clipboard.svg');
    cursor: pointer;
    &:hover, &:focus  {
      .tooltip {
        visibility: visible;
        opacity: 1;
      }
    }
    &.copied {
      background-image: url('./assetes/check.svg');
    }
  }
  .tooltip {
    font-size: 14px;
    visibility: hidden;
    position: absolute;
    top: -200%;
    background-color: #000;
    color: #fff;
    padding: 14px;
    border-radius: 8px;
    width: 80px;
    left: 50%;
    margin-left: -40px;
    text-align: center;
    transition: all .3s ease;
    opacity: 0;
    z-index: 1;
    outline: none;
    &::before {
      content: '';
      position: absolute;
      bottom: -25%;
      width: 0; 
      height: 0; 
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 30px solid black;
      z-index: -1;
      right: calc(50% - 20px);
    }
  }
</style>
`
const html = `
<input tabindex="0" type="text" id="input">
<button class="" tabindex="0" id="copy">
  <div class="tooltip">Copy</div>
</button>
`
const template = document.createElement('template')
template.innerHTML = `${css}${html}`

class InputWithCopy extends HTMLElement {
  COPIED_STATE_TIMEOUT = 5000
  isCopiedState = false
  intervalId

  constructor() {
    super()
  
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.input = this.shadowRoot.querySelector('#input')
    this.copyButton = this.shadowRoot.querySelector('#copy')
    this.tooltip = this.copyButton.querySelector('.tooltip')
  }

  connectedCallback() {
    this.input.addEventListener('input', () => this.isCopiedState && this.setCopyState())

    this.copyButton.addEventListener('click', async () => {
      try {
        const data = this.prepareClipboardItemFromText(this.input.value)
        await navigator.clipboard.write(data);
        this.setCopiedState()
        this.intervalId = setTimeout(this.setCopyState.bind(this), this.COPIED_STATE_TIMEOUT)
      } catch (e) {
        console.log(e)
        alert("Your browser does not support Clipboard API :(")
      }
    })
  }

  prepareClipboardItemFromText(text) {
    const type = "text/plain";
    const blob = new Blob([text], { type });
    return [new ClipboardItem({ [type]: blob })];
  }

  setCopyState() {
    clearInterval(this.intervalId)
    this.isCopiedState = false
    this.copyButton.classList.remove('copied')
    this.tooltip.innerHTML = 'Copy'
  }

  setCopiedState() {
    this.isCopiedState = true
    this.copyButton.classList.add('copied')
    this.tooltip.innerHTML = 'Copied!'
  }
}

customElements.define('input-with-copy', InputWithCopy)
