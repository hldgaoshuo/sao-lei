let __init = function (images, event) {
    // 在这里初始化地图
    let gameMap = []
    for (let i = 0; i < images.length; i++) {
        gameMap.push(0)
    }

    let targetIndex = imageIndex(event.offsetX, event.offsetY, images)

    let count = 0
    while (true) {
        let i = randomIndex()

        if (protectIndices(targetIndex, i)) {
            continue
        }

        if (gameMap[i] === 9) {
            continue
        }

        gameMap[i] = 9
        count++

        if (count === landmineNumber) {
            break
        }
    }

    for (let i = 0; i < gameMap.length; i++) {
        if (gameMap[i] === 9) {
            continue
        }

        let count = 0
        let as = aroundCoordinates(i)
        for (let i = 0; i < as.length; i++) {
            let a = as[i]
            if (gameMap[a[0] + a[1] * objectWidth] === 9) {
                count++
            }
        }
        gameMap[i] = count
    }

    for (let i = 0; i < gameMap.length; i++) {
        let image = images[i]
        let point = gameMap[i]
        image.setPoint(point)
    }
}

let __main = function() {
    const canvas = document.getElementById("id-canvas-1")
    const ctx = canvas.getContext("2d")

    const contrast = document.getElementById("id-canvas-2")
    const contrastCtx = contrast.getContext("2d")

    // 记录所有 GuaImage 对象
    const images = []

    // 初始化所有 GuaImage 对象
    for (let i = 0; i < objectWidth * objectHeight; i++) {
        const w = imageWidth
        const h = imageHeight

        let x = mod(i, objectWidth) * (w + imageGap)
        let y = div(i, objectWidth) * (h + imageGap)

        images.push(GuaImage.new(x, y, w, h, ctx, contrastCtx))
    }

    // 为所有 GuaImage 对象添加周围对象
    for (let i = 0; i < images.length; i++) {
        let image = images[i]

        let as = aroundCoordinates(i)
        for (let i = 0; i < as.length; i++) {
            let a = as[i]
            image.addAroundGuaImage(images[a[0] + a[1] * objectWidth])
        }
    }

    let init = true
    canvas.addEventListener('mousedown', function(event) {
        if (init) {
            __init(images, event)

            init = false
        }

        let target = null
        for (let i = 0; i < images.length; i++) {
            let x = event.offsetX
            let y = event.offsetY
            let image = images[i]
            let ix = image.x
            let iy = image.y
            let iw = image.w
            let ih = image.h
            if ((x > ix) && (x < ix + iw) && (y > iy) && (y < iy + ih)) {
                target = image
                break
            }
        }

        if (target === null) {
            return
        }

        if (target.draw(event.button)) {
            log('game over')
            this.removeEventListener('mousedown', arguments.callee, false)
        }

        let landmineCount = 0
        for (let i = 0; i < images.length; i++) {
            let image = images[i]
            if (image.unknown) {
                landmineCount += 1
            }
        }
        if (landmineCount === landmineNumber) {
            log('game win')
            this.removeEventListener('mousedown', arguments.callee, false)
        }
    })
}

__main()
