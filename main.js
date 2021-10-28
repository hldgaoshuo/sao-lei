class GuaImage {
    constructor(point, name, x, y, w, h, ctx) {
        this.point = point
        this.name = name
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.ctx = ctx
        this.unknown = true
        this.marked = false
        this.aroundGuaImage = []

        this.drawInitImage()
    }

    static new(point, name, x, y, w, h, ctx) {
        return new this(point, name, x, y, w, h, ctx)
    }

    addAroundGuaImage(image) {
        this.aroundGuaImage.push(image)
    }

    drawInitImage() {
        let ctx = this.ctx
        let x = this.x
        let y = this.y

        const img = new Image(this.w, this.h)
        img.onload = function () {
            ctx.drawImage(img, x, y)
        }
        img.src = 'init.png'
    }

    drawNameImage() {
        let ctx = this.ctx
        let x = this.x
        let y = this.y

        const img = new Image(this.w, this.h)
        img.onload = function () {
            ctx.drawImage(img, x, y)
        }
        img.src = this.name
    }

    drawMarkImage() {
        let ctx = this.ctx
        let x = this.x
        let y = this.y

        const img = new Image(this.w, this.h)
        img.onload = function () {
            ctx.drawImage(img, x, y)
        }
        img.src = 'mark.png'
    }

    draw(n) {
        if (n === 0) {
            return this.drawLeft()
        } else if (n === 1) {
            return this.drawRight()
        }
    }

    drawLeft() {
        if (!this.unknown) {
            return false
        }

        this.drawNameImage()

        if (this.point !== 0) {
            if (this.point === 9) {
                log('game over')
                return true
            } else {
                return false
            }
        }

        this.unknown = false

        for (let i = 0; i < this.aroundGuaImage.length; i++) {
            let o = this.aroundGuaImage[i]
            o.drawLeft()
        }
    }

    drawRight() {
        this.marked = !this.marked

        if (this.marked) {
            this.drawMarkImage()
        } else {
            this.drawInitImage()
        }
    }
}

let __main = function() {
    const canvas = document.getElementById("id-canvas")
    const ctx = canvas.getContext("2d")

    // 记录所有 GuaImage 对象
    const images = []

    // 初始化所有 GuaImage 对象
    for (let i = 0; i < gameMap.length; i++) {
        const w = imageWidth
        const h = imageHeight

        let item = gameMap[i]
        let point = item[0]
        let name = item[0] + '.png'
        let x = item[1] * (w + imageGap)
        let y = item[2] * (h + imageGap)

        images.push(GuaImage.new(point, name, x, y, w, h, ctx))
    }

    // 为所有 GuaImage 对象添加周围对象
    for (let i = 0; i < gameMap.length; i++) {
        let image = images[i]
        let item = gameMap[i]
        let cx = item[1]
        let cy = item[2]
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
            this.removeEventListener('mousedown', arguments.callee, false)
        }
    })
}

__main()
