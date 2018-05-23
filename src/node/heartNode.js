import Node from './node'

export default class HeartNode extends Node {
	constructor(name) {
		super(name)
		this.width = 120
		this.height = 120
	}

	draw(ctx) {
		if (!this.visible) return;
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = 'rgba(' + this.style.fillStyle + ',' + this.alpha + ')';
		ctx.moveTo(this.x + 75, this.y + 40);
		ctx.bezierCurveTo(this.x + 75, this.y + 37, this.x + 70, this.y + 25, this.x + 50, this.y + 25);
		ctx.bezierCurveTo(this.x + 20, this.y + 25, this.x + 20, this.y + 62.5, this.x + 20, this.y + 62.5);
		ctx.bezierCurveTo(this.x + 20, this.y + 80, this.x + 40, this.y + 102, this.x + 75, this.y + 120);
		ctx.bezierCurveTo(this.x + 110, this.y + 102, this.x + 130, this.y + 80, this.x + 130, this.y + 62.5);
		ctx.bezierCurveTo(this.x + 130, this.y + 62.5, this.x + 130, this.y + 25, this.x + 100, this.y + 25);
		ctx.bezierCurveTo(this.x + 85, this.y + 25, this.x + 75, this.y + 37, this.x + 75, this.y + 40);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}
