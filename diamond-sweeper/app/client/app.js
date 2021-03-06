global.startApp = function (container) {
  /* Initialization */

  let countOfDiamonds = 0
  let diamondsUncovered = 0
  let arrayOfDiamonds = []
  let initialScore = 64

  /* As the given arrow svg points to west, the other directions are adjusted accordingly */
  let arrowDirections = {
    'north': 'rotate(-90deg)',
    'south': 'rotate(-270deg)',
    'east': 'rotate(-180deg)',
    'west': 'rotate(0deg)',
    'north-east': 'rotate(-45deg)',
    'north-west': 'rotate(-135deg)',
    'south-east': 'rotate(45deg)',
    'south-west': 'rotate(135deg)'
  }

  let modal = document.querySelector('.modal')

  let restartGame = document.querySelector('.restart-game')
  restartGame.addEventListener('click', initialize)

  /* Add unknown class to all the table cells before the game starts */
  let cells = document.getElementsByClassName('cell')
  for (let cell of cells) {
    cell.addEventListener('click', checkForDiamond)

    if (!(cell.classList.contains('unknown'))) {
      cell.classList += ' unknown'
    }
    /* If cell contains a diamond, add its position to the distance array for distance calculation */
    if (cell.classList.contains('diamond')) {
      ++countOfDiamonds
      let cellBounds = cell.getBoundingClientRect()
      arrayOfDiamonds.push({
        cellPositionTop: parseInt(cellBounds.top),
        cellPositionLeft: parseInt(cellBounds.left)
      })
    }
  }

  /* To display initial score */
  let score = document.getElementById('score')
  score.textContent = 'Score : ' + initialScore

  function initialize () {
    window.location.reload()
  }

  /* To check for presence of diamond on click */
  function checkForDiamond (e) {
    let elementToCheck = e.srcElement
    let elementPosition = elementToCheck.getBoundingClientRect()
    let elementPositionObj = {
      cellPositionTop: parseInt(elementPosition.top),
      cellPositionLeft: parseInt(elementPosition.left)
    }
    elementToCheck.classList.remove('unknown')
    score.textContent = 'Score : ' + (--initialScore)

    if (elementToCheck.classList.contains('diamond')) {
      elementToCheck.parentNode.style['background-color'] = '#78e08f'

      /* When all diamonds are uncovered display score using modal */
      if (diamondsUncovered === 7) {
        let score = document.getElementById('final-score')
        score.textContent = 'Your score : ' + initialScore
        toggleModal()
      }
      ++diamondsUncovered
      console.log('You just found a diamond')
      // arrayOfDiamonds.splice(arrayOfDiamonds.indexOf(elementPositionObj), 1) // debug
    } else {

      /* To display arrow according to location of the nearest diamond */
      elementToCheck.parentNode.style['background-color'] = '#2e383a'
      let dynamicDistanceArray = findTheNearestDiamond(elementPositionObj)
      let closestDiamondIndex = dynamicDistanceArray.indexOf(Math.min(...dynamicDistanceArray))
      let diamondPosition = arrayOfDiamonds[closestDiamondIndex]
      let typeOfArrow = findTypeOfArrow(elementPositionObj, diamondPosition)

      elementToCheck.classList.add('arrow')
      elementToCheck.style['transform'] = arrowDirections[typeOfArrow]
      setTimeout(() => elementToCheck.classList.remove('arrow'), 1000)
    }
  }

  function toggleModal () {
    modal.classList.toggle('show-modal')
  }

  function findTypeOfArrow (originObj, targetObj) {
    let x0 = originObj.cellPositionLeft
    let x1 = targetObj.cellPositionLeft
    let y0 = originObj.cellPositionTop
    let y1 = targetObj.cellPositionTop

    if (x0 === x1) {
      if (y0 > y1) return 'north'
      return 'south'
    }
    if (y0 === y1) {
      if (x0 > x1) return 'east'
      return 'west'
    }
    if (x0 < x1 && y0 < y1) return 'south-east'
    if (x0 > x1 && y0 < y1) return 'south-west'
    if (x0 > x1 && y0 > y1) return 'north-west'
    if (x0 < x1 && y0 > y1) return 'north-east'
  }

  /* Returns a distance array which consists of the distances between clicked square and other diamonds */
  function findTheNearestDiamond (diamondPositionObj) {
    let distanceArr = arrayOfDiamonds.map((item, index, arr) => {
      return parseInt(Math.sqrt(Math.pow((item.cellPositionLeft - diamondPositionObj.cellPositionLeft), 2) +
        Math.pow((item.cellPositionTop - diamondPositionObj.cellPositionTop), 2)))
    })
    return distanceArr
  }
}
