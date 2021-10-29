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
        this.dismiss = false
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
        img.src = './pic/'+'init.png'
    }

    drawNameImage() {
        let ctx = this.ctx
        let x = this.x
        let y = this.y

        const img = new Image(this.w, this.h)
        img.onload = function () {
            ctx.drawImage(img, x, y)
        }
        img.src = './pic/'+this.name
    }

    drawMarkImage() {
        let ctx = this.ctx
        let x = this.x
        let y = this.y

        const img = new Image(this.w, this.h)
        img.onload = function () {
            ctx.drawImage(img, x, y)
        }
        img.src = './pic/'+'mark.png'
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

        this.dismiss = this.point === 9 && this.marked;
    }
}
