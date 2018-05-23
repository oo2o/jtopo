import Node from './node'

export default class CircleNode extends Node {
	constructor(name) {
		super(name)
		this.r = 30
		this.beginDegree = 0
		this.endDegree = 2 * Math.PI
	}

	draw(ctx) {
		if (this.visible == false) return;
		var w = this.r * 2 * this.scala;
		var h = this.r * 2 * this.scala;
		this.setWidth(w);
		this.setHeight(h);
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = 'rgba(' + this.style.fillStyle + ',' + this.alpha + ')';
		ctx.arc(this.x + w / 2, this.y + h / 2, w / 2, this.beginDegree, this.endDegree, true);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}
