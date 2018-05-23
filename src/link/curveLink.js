import Link from './link'

export default class CurveLink extends Link {
	constructor() {
		super(nodeA, nodeB)
		this.curve = '0.5'
	}

	draw(ctx) {
		let x1 = this.nodeA.x;
		let y1 = this.nodeA.y;
		let x2 = this.nodeB.x;
		let y2 = this.nodeB.y;
		let mx = x1;
		let my = y1;

		mx = x1 + (x2 - x1);
		my = y1 + (y2 - y1);

		mx *= this.curve;
		my *= this.curve;

		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(' + this.style.strokeStyle + ',' + this.style.alpha + ')';
		ctx.lineWidth = this.style.lineWidth;
		ctx.moveTo(x1 + this.nodeA.width / 2, y1 + this.nodeA.height / 2);
		ctx.quadraticCurveTo(mx + this.nodeA.width / 2, my + this.nodeA.height / 2,
			x2 + this.nodeA.width / 2, y2 + this.nodeA.height / 2);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}
