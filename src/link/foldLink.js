import Link from './link'

export default class FoldLink extends Link {
	constructor(nodeA, nodeB, name) {
		super(nodeA, nodeB)
		this.fold = 'x'
	}

	draw(ctx) {
		let x1 = this.nodeA.x;
		let y1 = this.nodeA.y;
		let x2 = this.nodeB.x;
		let y2 = this.nodeB.y;
		let mx = x1;
		let my = y1;

		if (x1 == x2 || y1 == y2) {
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(' + this.style.strokeStyle + ',' + this.style.alpha + ')';
			ctx.lineWidth = this.style.lineWidth;
			ctx.moveTo(this.nodeA.x + this.nodeA.width / 2, this.nodeA.y + this.nodeA.height / 2);
			ctx.lineTo(this.nodeB.x + this.nodeB.width / 2, this.nodeB.y + this.nodeB.height / 2);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		} else {
			if (this.fold == 'x') {
				mx = x1 + (x2 - x1);
			} else {
				my = y1 + (y2 - y1);
			}
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(' + this.style.strokeStyle + ',' + this.style.alpha + ')';
			ctx.lineWidth = this.style.lineWidth;
			ctx.moveTo(x1 + this.nodeA.width / 2, y1 + this.nodeA.height / 2);
			ctx.lineTo(mx + this.nodeA.width / 2, my + this.nodeA.height / 2);
			ctx.lineTo(x2 + this.nodeA.width / 2, y2 + this.nodeA.height / 2);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}
	}
}
