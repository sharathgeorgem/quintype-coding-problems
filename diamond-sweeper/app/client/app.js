global.startApp = function (container) {
  let countOfDiamonds = 0
  let cells = document.getElementsByClassName('cell')

  for (let cell of cells) {
    cell.addEventListener('click', checkForDiamond)
    if (!(cell.classList.contains('unknown'))) {
      cell.classList += ' unknown'
    }
    if (cell.classList.contains('diamond')) {
      ++countOfDiamonds
    }
  }

  function checkForDiamond (e) {
    console.log('When you click you get all this', e)
    let elementToCheck = e.srcElement
    let position = elementToCheck.getBoundingClientRect()
    console.log('The top and the left positions are ', position.top, position.left)
    elementToCheck.classList.remove('unknown')
    if (elementToCheck.classList.contains('diamond')) {
      console.log('You just found a diamond')
    } else {
      elementToCheck.classList.add('arrow')
    }
    console.log(`The number of diamonds are ${countOfDiamonds} `)
  }
}
