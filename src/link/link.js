import Element from '../element'
import { getDistance } from '../util'

export default class Link extends Element {
	constructor(nodeA, nodeB, name) {
		super()
		this.nodeA = nodeA;
		this.nodeB = nodeB;
		this.name = name
		this.style = { strokeStyle: '116, 166, 250', alpha: 1, lineWidth: 2 };
	}

	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(' + this.style.strokeStyle + ',' + this.style.alpha + ')';
		ctx.lineWidth = this.style.lineWidth;
		ctx.moveTo(this.nodeA.x + this.nodeA.width / 2, this.nodeA.y + this.nodeA.height / 2);
		ctx.lineTo(this.nodeB.x + this.nodeB.width / 2, this.nodeB.y + this.nodeB.height / 2);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	getLength() {
		return getDistance(this.nodeA, this.nodeB);
	}
}
