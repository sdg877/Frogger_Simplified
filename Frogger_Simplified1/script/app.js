function init() {
    const grid = document.querySelector('.grid')
    const width = 10
    const height = 10
    const cellCount = width * height
    let cells = []
    const startingPosition = 95
    let currentPosition = startingPosition
    const carSpeed = 500
    let fixedStartingPositions = [10, 20, 30, 40, 50, 60, 70, 80]
    let validRow = [1, 2, 3, 4, 5, 6, 7, 8]
    let collided = false

    function createGrid() {
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement('div')
            cell.dataset.index = i
            cell.style.height = `${100 / height}%`
            cell.style.width = `${100 / width}%`
            grid.appendChild(cell)
            cells.push(cell)
            const row = Math.floor(i / width)
            cell.classList.add(`row-${row}`)
        }

        addFrog(startingPosition)
        createCars()
    }

    function addFrog(position) {
        cells[position].classList.add('frog')
    }

    function addCar(position) {
        if (position >= 0 && position < cellCount && cells[position]) {
            cells[position].classList.add('carright')
        }
    }

  function createCars() {
    carMovementInterval = setInterval(moveCars, carSpeed / 3)
    const carGenerationInterval = setInterval(() => {
        const emptyStartingPositions = fixedStartingPositions.filter(
            (position) => !cells[position].classList.contains('carright')
        );

        if (emptyStartingPositions.length > 0) {
            const randomStartingPosition =
                emptyStartingPositions[Math.floor(Math.random() * emptyStartingPositions.length)]
            addCar(randomStartingPosition)
        } else {
            clearInterval(carGenerationInterval)
        }
    }, carSpeed * 0.4)

    setTimeout(() => {
        clearInterval(carGenerationInterval)
    }, carSpeed * 100);

    setInterval(moveCars, carSpeed / 3)
}

function moveCars() {
    const carIndices = cells.reduce((acc, cell, index) => {
        if (cell.classList.contains('carright') && isValidRow(index)) {
            cells[index].classList.remove('carright')
            acc.push(index)
        }
        return acc
    }, [])

    carIndices.forEach((currentPosition) => {
        if (cells[currentPosition].classList.contains('frog')) {
            stopGame()
            return
        }

        if (cells[currentPosition]) {
            cells[currentPosition].classList.remove('carright')
            let nextPosition = currentPosition + 1

            if (nextPosition < cellCount && nextPosition % width !== 0 && cells[nextPosition] && !cells[nextPosition].classList.contains('carright')) {
                cells[nextPosition].classList.add('carright')
            } else {
                cells[currentPosition].classList.remove('carright')

                const currentRow = Math.floor(currentPosition / width)
                const nextRow = currentRow + width

                if (nextRow < height) {
                    const nextStartingPosition = nextRow * width
                    if (cells[nextStartingPosition]) {
                        cells[nextStartingPosition].classList.add('carright')
                    }
                }
            }
        }
    })
}


function isValidRow(index) {
    const currentRow = Math.floor(index / width)
    return validRow.includes(currentRow)
}

function handleMovement(event) {
    const key = event.key
    const movements = {
        ArrowUp: -width,
        ArrowDown: width,
        ArrowLeft: -1,
        ArrowRight: 1,
    };

    const newPosition = currentPosition + movements[key]

    checkCollision()

    if (
        newPosition >= 0 &&
        newPosition < cellCount &&
        !cells[newPosition].classList.contains('carright')
    ) {
        cells[currentPosition].classList.remove('frog')
        cells[newPosition].classList.add('frog')
        currentPosition = newPosition;

        if (Math.floor(newPosition / width) === 0) {
            alert("YOU WIN!!")
            resetGame()
    }
}
}

function checkCollision() {
    cells.forEach((cell, index) => {
        if (cell.classList.contains('frog') && cell.classList.contains('carright')) {
        }
    })
}

function stopGame() {
    if (!collided) {
        collided = true;
        alert("GAME OVER - YOU LOSE!!")
        clearInterval(carMovementInterval)
        document.removeEventListener('keyup', handleMovement);
        resetGame()
    }
}


    function resetGame() {
        collided = false
        cells.forEach(cell => {
            cell.classList.remove('frog', 'carright')
        })
        currentPosition = startingPosition
        addFrog(startingPosition)
        createCars()
        document.addEventListener('keyup', handleMovement)
    }

    document.addEventListener('keyup', handleMovement)
    createGrid()
    moveCars()
}


window.addEventListener('DOMContentLoaded', init)
