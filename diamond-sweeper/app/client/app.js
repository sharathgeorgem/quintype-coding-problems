global.startApp = function (container) {
  console.log('Inside the function')
  console.log('Here is the container:', container)
}

console.log('Outside the f')
let cells = document.getElementsByTagName('td')
console.log('The cells are ', cells)
for (let cell of cells) {
  cell.className += 'unknown'
}
