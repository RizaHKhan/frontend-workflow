let calculator = document.querySelector('.calculator')
setupCalculator(calculator, numbers, operators)

function setupCalculator(container, numbers, operators) {

  let output = document.createElement('div')
  output.classList.add('ouput')

  let numbersContainer = document.createElement('div')
  numbersContainer.classList.add('numbers')

  numbers.forEach(number => {
    var num = document.createElement('div')
    num.classList.add('number')
    num.innerText = number
    numbersContainer.appendChild(num)
    num.addEventListener('click', () => {
      console.log(`${number} was clicked`)
    })
  })

  let operatorsContainer = document.createElement('div')
  operatorsContainer.classList.add('operators')

  operators.forEach(operator => {
    let op = document.createElement('div')
    op.classList.add('operator')
    op.innerText = operator
    operatorsContainer.appendChild(op)
    op.addEventListener('click', () => {
      console.log(`${operator} was clicked`)
    })
  })

  container.appendChild(output)
  container.appendChild(numbersContainer)
  container.appendChild(operatorsContainer)
}

