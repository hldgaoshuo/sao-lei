let log = console.log.bind(console)

let div = function (a, b) {
    return Math.floor(a / b)
}

let mod = function (a, b) {
    return a % b
}

let ran = function () {
    return Math.round(Math.random()*80)
}

let pro = function (targetIndex, randomIndex) {
    let targetIndexX = mod(targetIndex, objectWidth)
    let targetIndexY = div(targetIndex, objectWidth)

    let randomIndexX = mod(randomIndex, objectWidth)
    let randomIndexY = div(randomIndex, objectWidth)

    if (targetIndexX - 1 >= 0 && targetIndexY - 1 >= 0) {
        if (targetIndexX - 1 === randomIndexX && targetIndexY - 1 === randomIndexY) {
            return true
        }
    }
    if (targetIndexX >= 0 && targetIndexY - 1 >= 0) {
        if (targetIndexX === randomIndexX && targetIndexY - 1 === randomIndexY) {
            return true
        }
    }
    if (targetIndexX + 1 <= 8 && targetIndexY - 1 >= 0) {
        if (targetIndexX + 1 === randomIndexX && targetIndexY - 1 === randomIndexY) {
            return true
        }
    }
    if (targetIndexX - 1 >= 0 && targetIndexY >= 0) {
        if (targetIndexX - 1 === randomIndexX && targetIndexY === randomIndexY) {
            return true
        }
    }
    if (targetIndexX + 1 <= 8 && targetIndexY >= 0) {
        if (targetIndexX + 1 === randomIndexX && targetIndexY === randomIndexY) {
            return true
        }
    }
    if (targetIndexX - 1 >= 0 && targetIndexY + 1 <= 8) {
        if (targetIndexX - 1 === randomIndexX && targetIndexY + 1 === randomIndexY) {
            return true
        }
    }
    if (targetIndexX >= 0 && targetIndexY + 1 <= 8) {
        if (targetIndexX === randomIndexX && targetIndexY + 1 === randomIndexY) {
            return true
        }
    }
    if (targetIndexX + 1 <= 8 && targetIndexY + 1 <= 8) {
        if (targetIndexX + 1 === randomIndexX && targetIndexY + 1 === randomIndexY) {
            return true
        }
    }
    return false
}
