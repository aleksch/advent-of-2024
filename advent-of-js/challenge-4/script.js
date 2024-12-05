const layout = document.querySelector('.resizeble-layout')

let height
let width

let isStartMovingHorizontal = false
let isStartMovingVertical = false

function calculateInitStyles() {
  height = layout.clientHeight
  width = layout.clientWidth

  const savedColumns = localStorage.getItem('columns')
  const savedRows = localStorage.getItem('rows')
  if (savedColumns && savedRows) {
    layout.style.gridTemplateColumns = savedColumns
    layout.style.gridTemplateRows = savedRows  
    return
  }

  layout.style.gridTemplateColumns = `${width / 2}px ${width / 2}px`
  layout.style.gridTemplateRows = `${height / 2}px ${height / 2}px`
}

function onInrectionEnd() {
  isStartMovingHorizontal = false
  isStartMovingVertical = false
}

function onIntereaction(clientX, clientY) {
  if (isStartMovingHorizontal) {
    layout.style.gridTemplateRows = `${clientY}px ${height - clientY}px`
  }
  if (isStartMovingVertical) {
    layout.style.gridTemplateColumns = `${clientX}px ${width - clientX}px`
  }
}

function onInteractionStart(e) {
  if (e.target.classList.contains('control-horizontal')) {
    isStartMovingHorizontal = true
  }
  if (e.target.classList.contains('control-vertical')) {
    isStartMovingVertical = true
  }
}

function recalculateStyles() {
  height = layout.clientHeight
  width = layout.clientWidth
  const firstColumnWidth = Number(layout.style.gridTemplateColumns.split('px')[0].trim())
  const firstRowHeight = Number(layout.style.gridTemplateRows.split('px')[0].trim())

  const newFirstColumnWidthPercent = firstColumnWidth / width * 100
  const newSeconColumnWidthPercent = 100 - newFirstColumnWidthPercent;
  const newFirstRowHeight = firstRowHeight / height * 100
  const newSecondRowHeight = 100 - newFirstRowHeight

  layout.style.gridTemplateColumns = `${newFirstColumnWidthPercent}% ${newSeconColumnWidthPercent}%`
  layout.style.gridTemplateRows = `${newFirstRowHeight}% ${newSecondRowHeight}%`
}

document.addEventListener('DOMContentLoaded', calculateInitStyles)

document.addEventListener('mousedown', onInteractionStart)
document.addEventListener('touchstart', onInteractionStart)
document.addEventListener('mouseup', onInrectionEnd)
document.addEventListener('touchend', onInrectionEnd)
document.addEventListener('mousemove', (e) => onIntereaction(e.clientX, e.clientY))
document.addEventListener('touchmove', (e) => onIntereaction(e.touches[0].clientX, e.touches[0].clientY))

window.addEventListener('resize', recalculateStyles)
window.addEventListener('beforeunload', () => {
  localStorage.setItem('columns', layout.style.gridTemplateColumns)
  localStorage.setItem('rows', layout.style.gridTemplateRows)
})
