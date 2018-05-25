import Node from './node'

export default class TextNode extends Node {
	constructor(optiopn) {
		super(optiopn)
		this.height = optiopn.height || 14
		this.style = optiopn.style || { strokeStyle: 'rgba(255,255,255, 0.99)', fillStyle: 'rgba(255,255,255, 0.5)' }
	}

	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.font = this.style.fontSize + ' ' + this.style.font;
		var textWidth = ctx.measureText(this.name).width;
		ctx.closePath();
		ctx.restore();

		this.width = textWidth;
		if (!this.visible) return;

		if (this.selected) {
			var startx = this.x - (textWidth > this.width ? (textWidth - this.width) / 2 : 0);
			var width = Math.max(this.width, textWidth);
			ctx.save();
			ctx.beginPath();
			ctx.rect(startx - 3, this.y - 1, width + 6, this.height + 2);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}
		ctx.save();
		ctx.beginPath();
		ctx.font = this.style.fontSize + ' ' + this.style.font;
		ctx.strokeStyle = this.style.strokeStyle;
		ctx.fillStyle = this.style.fillStyle;
		ctx.strokeText(this.name, this.x, this.y + 12);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}
