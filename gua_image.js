class GuaImage {
    constructor(x, y, w, h, ctx, contrastCtx) {
        this.point = 0
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.ctx = ctx
        this.contrastCtx = contrastCtx
        this.unknown = true
        this.marked = false
        this.aroundGuaImage = []

        this.drawInitImage()
    }

    static new(x, y, w, h, ctx, contrastCtx) {
        return new this(x, y, w, h, ctx, contrastCtx)
    }

    addAroundGuaImage(image) {
        this.aroundGuaImage.push(image)
    }

    setPoint(point) {
        this.point = point
        this.drawContrastCtx()
    }

    drawContrastCtx() {
        let ctx = this.contrastCtx
        let x = this.x
        let y = this.y

        const img = new Image(this.w, this.h)
        img.onload = function () {
            ctx.drawImage(img, x, y)
        }
        img.src = './pic/'+this.point+'.png'
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
        img.src = './pic/'+this.point+'.png'
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
        this.unknown = false

        if (this.point !== 0) {
            return this.point === 9;
        }

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
