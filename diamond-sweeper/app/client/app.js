global.startApp = function (container) {
  let countOfDiamonds = 0
  let arrayOfDiamonds = []
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
  let cells = document.getElementsByClassName('cell')

  for (let cell of cells) {
    cell.addEventListener('click', checkForDiamond)
    if (!(cell.classList.contains('unknown'))) {
      cell.classList += ' unknown'
    }
    if (cell.classList.contains('diamond')) {
      ++countOfDiamonds
      let cellBounds = cell.getBoundingClientRect()
      arrayOfDiamonds.push({
        cellPositionTop: parseInt(cellBounds.top),
        cellPositionLeft: parseInt(cellBounds.left)
      })
    }
  }

  console.log('The array of Diamond position object is ', arrayOfDiamonds)

  function checkForDiamond (e) {
    let elementToCheck = e.srcElement
    let elementPosition = elementToCheck.getBoundingClientRect()
    let elementPositionObj = {
      top: parseInt(elementPosition.top),
      left: parseInt(elementPosition.left)
    }

    elementToCheck.classList.remove('unknown')

    if (elementToCheck.classList.contains('diamond')) {
      console.log('You just found a diamond')
    } else {
      let dynamicDistanceArray = findTheNearestDiamond(elementPositionObj)
      let closestDiamondIndex = dynamicDistanceArray.indexOf(Math.min(...dynamicDistanceArray))

      let diamondPosition = arrayOfDiamonds[closestDiamondIndex]
      console.log('The diamond position to be passed is ', diamondPosition)
      let typeOfArrow = findTypeOfArrow(elementPosition, diamondPosition)

      console.log('The type of arrow is ', typeOfArrow)
      console.log('The diamond position : ', diamondPosition)
      console.log('The elementClickedOnPosition is ', elementPositionObj)

      console.log('The new array for the type of arrows is given as ', dynamicDistanceArray)
      elementToCheck.classList.add('arrow')
      elementToCheck.style['transform'] = arrowDirections[typeOfArrow]
      setTimeout(() => elementToCheck.classList.remove('arrow'), 1000)
    }

    console.log(` The number of diamonds are ${countOfDiamonds} `)
  }

  function findTypeOfArrow (originObj, targetObj) {
    let x0 = parseInt(originObj.left)
    let x1 = targetObj.cellPositionLeft

    let y0 = parseInt(originObj.top)
    let y1 = targetObj.cellPositionTop
    console.log(x0, x1, y0, y1)
    // if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) {
    // Debug
    // }
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

  function findTheNearestDiamond (diamondPositionObj) {
    let distanceArr = arrayOfDiamonds.map((item, index, arr) => {
      return parseInt(Math.sqrt(Math.pow((item.cellPositionLeft - diamondPositionObj.left), 2) +
        Math.pow((item.cellPositionTop - diamondPositionObj.top), 2)))
    })
    return distanceArr
  }
}
