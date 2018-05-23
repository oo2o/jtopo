import Link from './link'

export default class ArrowsLink extends Link {
	constructor() {
		super(nodeA, nodeB)
		this.angle = '0.4'
		this.offset = 30
	}

	draw(ctx) {
		ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(' + this.style.strokeStyle + ',' + this.style.alpha + ')';
			ctx.fillStyle = 'rgba(' + this.style.fillStyle + ',' + this.style.alpha + ')';
			ctx.lineWidth = this.style.lineWidth;

			let ta = {x: this.nodeA.x + this.nodeA.width/2, y:this.nodeA.y + this.nodeA.height/2};
			let t = {x: this.nodeB.x + this.nodeB.width/2, y:this.nodeB.y + this.nodeB.height/2};

			let angle = Math.atan2(ta.y - t.y, ta.x - t.x);
			t.x = t.x + Math.cos(angle) * this.nodeB.width/2;
			t.y = t.y + Math.sin(angle) * this.nodeB.height/2;

			let da = 0.4;
			let pointA = {x: t.x + Math.cos(angle-da) * this.offset,
						  y: t.y + Math.sin(angle-da) * this.offset};

			let pointB = {x: t.x + Math.cos(angle+da) * this.offset,
						  y: t.y + Math.sin(angle+da) * this.offset};

			ctx.moveTo(this.nodeA.x + this.nodeA.width / 2, this.nodeA.y + this.nodeA.height / 2);
			//ctx.lineTo(this.nodeB.x + this.nodeB.width / 2, this.nodeB.y + this.nodeB.height / 2);
			ctx.lineTo(pointA.x + (pointB.x - pointA.x)/2, pointA.y + (pointB.y - pointA.y)/2);

			ctx.moveTo(pointA.x , pointA.y);
			ctx.lineTo(t.x, t.y);
			ctx.lineTo(pointB.x, pointB.y);
			ctx.lineTo(pointA.x , pointA.y);
			if(this.style.fillStyle != null){
				ctx.fill();
			}
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
	}
}
