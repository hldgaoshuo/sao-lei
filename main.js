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
        this.aroundGuaImage = []

        this.drawInitImage()
    }
    static new(point, name, x, y, w, h, ctx) {
        return new this(point, name, x, y, w, h, ctx)
    }
    drawInitImage() {
        let ctx = this.ctx
        let x = this.x
        let y = this.y

        const img = new Image(this.w, this.h)
        img.onload = function () {
            ctx.drawImage(img, x, y)
        }
        img.src = 'b.png'
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
    addAroundGuaImage(image) {
        this.aroundGuaImage.push(image)
    }
    recurs() {
        if (!this.unknown) {
            return
        }

        this.unknown = false

        for (let i = 0; i < this.aroundGuaImage.length; i++) {
            let o = this.aroundGuaImage[i]
            o.recurs()
        }
    }
    update(x, y) {
        if ((x > this.x) && (x < this.x + this.w) && (y > this.y) && (y < this.y + this.h)) {
            if (this.point === 9) {
                this.drawNameImage()
                return true
            }
            this.recurs()
            return false
        }
    }
    draw() {
        if (!this.unknown) {
            this.drawNameImage()
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

    for (let i = 0; i < images.length; i++) {
        log(images[i])
    }

    canvas.addEventListener('mousedown', function(event) {
        for (let i = 0; i < images.length; i++) {
            let image = images[i]
            if (image.update(event.offsetX, event.offsetY)) {
                log('game over')
            }
        }
        for (let i = 0; i < images.length; i++) {
            let image = images[i]
            image.draw()
        }
    })
}

__main()
