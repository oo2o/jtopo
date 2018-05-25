export default class Tips {
	constructor(name) {
		this.width = 0;
		this.height = 0;
		this.style = { fontSize: 10, font: '' }
		this.alpha = 1
		this.strokeStyle = 'rgba(230, 230, 230, ' + this.alpha + ')'
		this.direction = 'Top'
		this.type = 'Top'
		this.text = null
	}

	draw(ctx) {
		switch (this.type) {
			case 'Top':
				this.drawTop(ctx)
				break
			case 'Bottom':
				this.drawBottom(ctx)
				break;
			case 'Left':
				this.drawLeft(ctx)
				break;
			case 'Right':
				this.drawRight(ctx)
				break;
			default:
				this.drawTop(ctx)
				break;
		}
	}

	drawTop(ctx) {
		if (!this.text || this.text == '') return;
		let textWidth = ctx.measureText(this.text).width;
		ctx.save();
		ctx.beginPath();
		ctx.font = this.style.fontSize + ' ' + this.style.font;
		ctx.strokeStyle = this.strokeStyle;
		debugger
		if (textWidth > this.width) {
			ctx.strokeText(this.text, -this.wdith - 2, -this.y - 2);
		} else {
			ctx.strokeText(this.text, -this.width / 2, -this.height - 5);
			ctx.moveTo(-this.width / 2 - 2, -this.height - 20)
			ctx.lineTo(-this.width / 2 + 2 + textWidth, -this.height - 20)
			ctx.lineTo(-this.width / 2 + 2 + textWidth, -this.height + 5)
			ctx.lineTo((-this.width / 2 + 2 + textWidth / 2), -this.height + 5)
			ctx.lineTo((-this.width / 2 + 2 + textWidth / 2) + 2, -this.height + 10)
			ctx.lineTo((-this.width / 2 + 2 + textWidth / 2) - 10, -this.height + 5)
			ctx.lineTo(-this.width / 2 - 2, -this.height + 5)
		}
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	drawLeft(ctx) {

	}

	drawBottom(ctx) {

	}

	drwaRight(ctx) {

	}
}
