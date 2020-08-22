let calculator = document.querySelector('.calculator')
setupCalculator(calculator, numbers, operators)

function setupCalculator(container, numbers, operators) {

  // output
  let output = document.createElement('div')
  output.classList.add('ouput')

  // Options
  let optionsContainer = document.createElement('div')
  optionsContainer.classList.add('options')

  options.forEach(option => {
    let opt = document.createElement('div')
    opt.classList.add('option')
    opt.innerText = option
    optionsContainer.appendChild(opt)

    opt.addEventListener('click', () => {
      if (option === 'C') {
        first = []
        second = []
        operation = []
        output.innerText = ''
      }
    })
  })

  // Numbers
  let numbersContainer = document.createElement('div')
  numbersContainer.classList.add('numbers')

  numbers.forEach(number => {
    var num = document.createElement('div')
    num.classList.add('number')
    num.innerText = number
    numbersContainer.appendChild(num)
    num.addEventListener('click', () => {
      if (operation.length) {
        second.push(number)
        output.innerText += number
      } else {
        first.length ? output.innerText += number : output.innerText = number
        first.push(number)
      }
    })
  })

  // Operators
  let operatorsContainer = document.createElement('div')
  operatorsContainer.classList.add('operators')

  operators.forEach(operator => {
    let op = document.createElement('div')
    op.classList.add('operator')
    op.innerText = operator
    operatorsContainer.appendChild(op)
    op.addEventListener('click', () => {
      if (operator === '=') {
        printAnswer(first, operation, second, output)
        first = []
        second = []
        operation = ''
      } else {
        operation = operator
        !first.length && output.innerText ? first.push(output.innerText) : ''
        output.innerText += operator
      }
    })
  })

  container.appendChild(output)
  container.appendChild(optionsContainer)
  container.appendChild(numbersContainer)
  container.appendChild(operatorsContainer)
}

function printAnswer(first, operation, second, container) {
  answer = eval(parseInt(first.join('')) + operation + parseInt(second.join('')))
  container.innerText = answer
}
