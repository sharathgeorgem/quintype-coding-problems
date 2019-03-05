global.startApp = function (container) {
  let countOfDiamonds = 0
  let cells = document.getElementsByClassName('cell')

  for (let cell of cells) {
    cell.addEventListener('click', sayHi)
    if (!(cell.classList.contains('unknown'))) {
      cell.classList += ' unknown'
    }
    if (cell.classList.contains('diamond')) {
      ++countOfDiamonds
    }
  }

  function sayHi () {
    console.log(`The number of diamonds are ${countOfDiamonds} `)
  }
}
