import Node from './node'

export default class CircleNode extends Node {
	constructor(option) {
		super(option)
		this.r = option.r|| 30
		this.beginDegree = option.beginDegree || 0
		let endDegree = option.endDegree || 2
		this.endDegree = endDegree * Math.PI
	}

	draw(ctx) {
		if (this.visible == false) return;
		ctx.save();
		ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		ctx.rotate(this.rotate);
		ctx.scale(this.scala, this.scala);
		let w = this.r * 2 * this.scala;
		let h = this.r * 2 * this.scala;
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
