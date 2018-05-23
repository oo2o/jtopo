import Node from './node'

export default class EndPointNode extends Node {
	constructor(name) {
		super(name)
		this.r = 30
		this.beginDegree = 0
		this.endDegree = 2 * Math.PI
	}

	draw(ctx) {
		if (!this.visible) return;
		let points = [];

		let rx = node.width / 3;
		let ry = node.height / 3;
		function createPoint(x, y) {
			let point = new Node();
			point.setSize(rx, ry);
			point.style.fillStyle = '0,255,0';
			point.setDragable(false);
			point.setLocation(x, y);
			return point;
		}

		points.push(createPoint(this.x - rx / 2, this.y + this.height / 2 - ry / 2));
		points.push(createPoint(this.x + this.width / 2 - rx / 2, this.y - ry / 2));

		points.push(createPoint(this.x + this.width - rx / 2, this.y + this.height / 2 - ry / 2));
		points.push(createPoint(this.x + this.width / 2 - rx / 2, this.y + this.height - ry / 2));
		if (this.isSelected()) {
			for (let i = 0; i < points.length; i++) {
				points[i].draw(ctx);
			}
		}
		super.draw(ctx)
	}
}
