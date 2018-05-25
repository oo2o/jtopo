import Node from './node'

export default class UMLClassNode extends Node {
	constructor(name) {
		super(name)
		this.width = 168
		this.className = name
		this.style.fillStyle = '71, 167, 184'
		this.rowHeight = 18
		this.classObj = null
	}

	draw(ctx, scale) {
		if (!this.visible) return;
		if (this.classObj != null) {
			this.operations = [];
			this.attributes = [];
			for (let k in this.classObj) {
				let v = this.classObj[k];
				if (typeof v == 'function') {
					this.operations.push('+ ' + k);
				} else {
					this.attributes.push('- ' + k);
				}
			}
		}

		if (this.operations == null || this.operations.length == 0) {
			this.operations = [' '];
		}
		if (this.attributes == null || this.attributes.length == 0) {
			this.attributes = [' '];
		}

		this.height = (this.operations.length + this.attributes.length + 1) * this.rowHeight + 3;
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = 'rgba(239,247,149,' + this.alpha + ')';
		ctx.rect(this.x, this.y, this.width, this.getHeight());
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fill();
		ctx.font = this.style.fontSize + ' ' + this.style.font;

		ctx.moveTo(this.x, this.y + this.rowHeight + 3);
		ctx.lineTo(this.x + this.width, this.y + this.rowHeight + 3);

		let textWidth = ctx.measureText(this.className).width;
		ctx.strokeText(this.className, this.getX() + (this.getWidth() - textWidth) / 2, this.getY() + this.rowHeight);

		for (let i = 0; i < this.operations.length; i++) {
			let operation = this.operations[i];
			ctx.strokeText(operation, this.getX() + 5, this.getY() + this.rowHeight + this.rowHeight * (i + 1));
		}

		ctx.moveTo(this.x, this.y + this.rowHeight * (this.operations.length + 1) + 3);
		ctx.lineTo(this.x + this.width, this.y + this.rowHeight * (this.operations.length + 1) + 3);

		let begingHeight = this.y + this.rowHeight * (this.operations.length + 1);
		for (let i = 0; i < this.attributes.length; i++) {
			let attribute = this.attributes[i];
			ctx.strokeText(attribute, this.getX() + 5, begingHeight + this.rowHeight * (i + 1));
		}
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		ctx.scale(1, 1)
	}
}
