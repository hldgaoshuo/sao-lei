let log = console.log.bind(console)

let div = function (a, b) {
    return Math.floor(a / b)
}

let mod = function (a, b) {
    return a % b
}

let aroundCoordinates = function (index) {
    let r = []

    let cx = mod(index, objectWidth)
    let cy = div(index, objectWidth)

    if (cx - 1 >= 0 && cy - 1 >= 0) {
        r.push([cx - 1, cy - 1])
    }
    if (cx >= 0 && cy - 1 >= 0) {
        r.push([cx, cy - 1])
    }
    if (cx + 1 <= 8 && cy - 1 >= 0) {
        r.push([cx + 1, cy - 1])
    }
    if (cx - 1 >= 0 && cy >= 0) {
        r.push([cx - 1, cy])
    }
    if (cx + 1 <= 8 && cy >= 0) {
        r.push([cx + 1, cy])
    }
    if (cx - 1 >= 0 && cy + 1 <= 8) {
        r.push([cx - 1, cy + 1])
    }
    if (cx >= 0 && cy + 1 <= 8) {
        r.push([cx, cy + 1])
    }
    if (cx + 1 <= 8 && cy + 1 <= 8) {
        r.push([cx + 1, cy + 1])
    }

    return r
}

let randomIndex = function () {
    return Math.round(Math.random()*80)
}

let imageIndex = function (x, y, images) {
    for (let i = 0; i < images.length; i++) {
        let image = images[i]
        let ix = image.x
        let iy = image.y
        let iw = image.w
        let ih = image.h
        if ((x > ix) && (x < ix + iw) && (y > iy) && (y < iy + ih)) {
            return i
        }
    }
}

let protectIndices = function (targetIndex, randomIndex) {
    let randomIndexX = mod(randomIndex, objectWidth)
    let randomIndexY = div(randomIndex, objectWidth)

    let as = aroundCoordinates(targetIndex)
    for (let i = 0; i < as.length; i++) {
        let a = as[i]
        if (a[0] === randomIndexX && a[1] === randomIndexY) {
            return true
        }
    }
    return false
}
