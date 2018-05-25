export default class Tips {
	constructor(option) {
		this.width = option.width || 0;
		this.height = option.height || 0;
		this.style = option.style || { fontSize: 10, font: '' }
		this.alpha = option.alpha || 1
		this.strokeStyle = option.strokeStyle || 'rgba(230, 230, 230, ' + this.alpha + ')'
		this.direction = option.direction || 'Top'
		this.type = option.type || 'Top'
		this.text = option.text || null
	}

	draw(ctx, node) {
		switch (this.type) {
			case 'Top':
				this.drawTop(ctx, node)
				break
			case 'Bottom':
				this.drawBottom(ctx, node)
				break;
			case 'Left':
				this.drawLeft(ctx, node)
				break;
			case 'Right':
				this.drawRight(ctx, node)
				break;
			default:
				this.drawTop(ctx, node)
				break;
		}
	}

	drawTop(ctx, node) {
		if (!this.text || this.text == '') return;
		let textWidth = ctx.measureText(this.text).width;
		let ds = (node.width - textWidth) / 2
		ctx.save();
		ctx.beginPath();
		ctx.font = this.style.fontSize + ' ' + this.style.font;
		ctx.strokeStyle = this.strokeStyle;
		ctx.strokeText(this.text, -node.width / 2 + ds, -node.height - 5); // 文本内容
		ctx.moveTo(-node.width / 2 - 2 + ds, -node.height - 20) // 移到左上点
		ctx.lineTo(-node.width / 2 + 2 + textWidth + ds, -node.height - 20) // 画到右边
		ctx.lineTo(-node.width / 2 + 2 + textWidth + ds, -node.height + 5) // 画到右下点
		ctx.lineTo((-node.width / 2 + 2 + textWidth / 2) + ds + 4, -node.height + 5) // 画到口边
		ctx.lineTo((-node.width / 2 + 2 + textWidth / 2) - 2 + ds, -node.height + 10)
		ctx.lineTo((-node.width / 2 + 2 + textWidth / 2) - 10 + ds, -node.height + 5)
		ctx.lineTo(-node.width / 2 - 2 + ds, -node.height + 5)
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}

	drawLeft(ctx) {
		if (!this.text || this.text == '') return;
		// let textWidth = ctx.measureText(this.text).width;
		// let ds = (node.width - textWidth) / 2
		// ctx.save();
		// ctx.beginPath();
		// ctx.font = this.style.fontSize + ' ' + this.style.font;
		// ctx.strokeStyle = this.strokeStyle;
		// ctx.strokeText(this.text, -node.width / 2 + ds, -node.height - 5); // 文本内容
		// ctx.moveTo(-node.width / 2 - 2 + ds, -node.height - 20) // 移到左上点
		// ctx.lineTo(-node.width / 2 + 2 + textWidth + ds, -node.height - 20) // 画到右边
		// ctx.lineTo(-node.width / 2 + 2 + textWidth + ds, -node.height + 5) // 画到右下点
		// ctx.lineTo((-node.width / 2 + 2 + textWidth / 2) + ds + 4, -node.height + 5) // 画到口边
		// ctx.lineTo((-node.width / 2 + 2 + textWidth / 2) - 2 + ds, -node.height + 10)
		// ctx.lineTo((-node.width / 2 + 2 + textWidth / 2) - 10 + ds, -node.height + 5)
		// ctx.lineTo(-node.width / 2 - 2 + ds, -node.height + 5)
		// ctx.closePath();
		// ctx.stroke();
		// ctx.restore();
	}

	drawBottom(ctx) {

	}

	drwaRight(ctx) {

	}
}
