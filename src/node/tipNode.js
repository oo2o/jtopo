import Node from './node'

export default class TipNode extends Node {
	constructor(name) {
		super(name)
		this.width = 100
		this.height = 100
	}

	draw(ctx) {
		if (!this.visible) return;
		var x = this.x;
		var y = this.y;
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(230, 230, 230, 0.8)';
		ctx.moveTo(x + 50, y);
		ctx.quadraticCurveTo(x, y, x, y + 37.5);
		ctx.quadraticCurveTo(x, y + 75, x + 25, y + 75);
		ctx.quadraticCurveTo(x + 25, y + 95, x + 5, y + 100);
		ctx.quadraticCurveTo(x + 35, y + 95, x + 45, y + 75);
		ctx.quadraticCurveTo(x + 100, y + 75, x + 100, y + 37.5);
		ctx.quadraticCurveTo(x + 100, y, x + 50, y);

		ctx.strokeText(this.name, this.x + 20, this.y + 20);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}
