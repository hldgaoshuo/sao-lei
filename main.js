let __main = function() {
    const canvas = document.getElementById("id-canvas-1")
    const ctx = canvas.getContext("2d")

    const contrast = document.getElementById("id-canvas-2")
    const contrastCtx = contrast.getContext("2d")

    // 初始化地图
    let gameMap = []
    for (let i = 0; i < objectWidth * objectHeight; i++) {
        gameMap.push(0)
    }
    let count = 0
    while (true) {
        let i = ran()
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
        let count = 0

        let cx = mod(i, objectWidth)
        let cy = div(i, objectWidth)
        if (cx - 1 >= 0 && cy - 1 >= 0) {
            if (gameMap[(cx - 1) + (cy - 1) * objectWidth] === 9) {
                count++
            }
        }
        if (cx >= 0 && cy - 1 >= 0) {
            if (gameMap[(cx) + (cy - 1) * objectWidth] === 9) {
                count++
            }
        }
        if (cx + 1 <= 8 && cy - 1 >= 0) {
            if (gameMap[(cx + 1) + (cy - 1) * objectWidth] === 9) {
                count++
            }
        }
        if (cx - 1 >= 0 && cy >= 0) {
            if (gameMap[(cx - 1) + (cy) * objectWidth] === 9) {
                count++
            }
        }
        if (cx + 1 <= 8 && cy >= 0) {
            if (gameMap[(cx + 1) + (cy) * objectWidth] === 9) {
                count++
            }
        }
        if (cx - 1 >= 0 && cy + 1 <= 8) {
            if (gameMap[(cx - 1) + (cy + 1) * objectWidth] === 9) {
                count++
            }
        }
        if (cx >= 0 && cy + 1 <= 8) {
            if (gameMap[(cx) + (cy + 1) * objectWidth] === 9) {
                count++
            }
        }
        if (cx + 1 <= 8 && cy + 1 <= 8) {
            if (gameMap[(cx + 1) + (cy + 1) * objectWidth] === 9) {
                count++
            }
        }

        if (gameMap[i] !== 9) {
            gameMap[i] = count
        }
    }

    // 记录所有 GuaImage 对象
    const images = []

    // 初始化所有 GuaImage 对象
    for (let i = 0; i < gameMap.length; i++) {
        const w = imageWidth
        const h = imageHeight

        let point = gameMap[i]
        let name = point + '.png'
        let x = mod(i, objectWidth) * (w + imageGap)
        let y = div(i, objectWidth) * (h + imageGap)

        images.push(GuaImage.new(point, name, x, y, w, h, ctx, contrastCtx))
    }

    // 为所有 GuaImage 对象添加周围对象
    for (let i = 0; i < gameMap.length; i++) {
        let image = images[i]
        let cx = mod(i, objectWidth)
        let cy = div(i, objectWidth)
        if (cx - 1 >= 0 && cy - 1 >= 0) {
            let aroundImage = images[(cx - 1) + (cy - 1) * objectWidth]
            image.addAroundGuaImage(aroundImage)
        }
        if (cx >= 0 && cy - 1 >= 0) {
            let aroundImage = images[(cx) + (cy - 1) * objectWidth]
            image.addAroundGuaImage(aroundImage)
        }
        if (cx + 1 <= 8 && cy - 1 >= 0) {
            let aroundImage = images[(cx + 1) + (cy - 1) * objectWidth]
            image.addAroundGuaImage(aroundImage)
        }
        if (cx - 1 >= 0 && cy >= 0) {
            let aroundImage = images[(cx - 1) + (cy) * objectWidth]
            image.addAroundGuaImage(aroundImage)
        }
        if (cx + 1 <= 8 && cy >= 0) {
            let aroundImage = images[(cx + 1) + (cy) * objectWidth]
            image.addAroundGuaImage(aroundImage)
        }
        if (cx - 1 >= 0 && cy + 1 <= 8) {
            let aroundImage = images[(cx - 1) + (cy + 1) * objectWidth]
            image.addAroundGuaImage(aroundImage)
        }
        if (cx >= 0 && cy + 1 <= 8) {
            let aroundImage = images[(cx) + (cy + 1) * objectWidth]
            image.addAroundGuaImage(aroundImage)
        }
        if (cx + 1 <= 8 && cy + 1 <= 8) {
            let aroundImage = images[(cx + 1) + (cy + 1) * objectWidth]
            image.addAroundGuaImage(aroundImage)
        }
    }

    canvas.addEventListener('mousedown', function(event) {
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
