import ArrowsLink from './arrowsLink'

export default class ArrowsFoldLink extends ArrowsLink {
	constructor(nodeA, nodeB, name) {
		super(nodeA, nodeB)
		this.fold = 'x'
		this.angle = '0.4'
		this.offset = 10
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
			super.draw(ctx)
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
			let ta = { x: mx + this.nodeA.width / 2, y: my + this.nodeA.height / 2 };
			super.drawArrows(ctx, ta)
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}
	}
}
