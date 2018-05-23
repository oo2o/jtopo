import Element from '../element'

export default class Container extends Element {
	constructor(name) {
		super()
		this.name = name
		this.x = 0;
		this.y = 0;
		this.width = 40;
		this.height = 40;
		this.items = [];
		this.style = { fillStyle: '193, 200, 254' };
		this.alpha = 0.3;
		this.dragable = true;
	}

	add(e) {
		this.items.push(e);
		e.parentContainer = this;
	}

	remove(e) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i] === e) {
				e.parentContainer = null;
				this.items = this.items.split(i, 1);
				e.lastParentContainer = this;
				break;
			}
		}
	}

	removeAll() {
		for (let i = 0; i < this.items.length; i++) {
			this.remove(this.items[i]);
		}
	}

	setLocation(x, y) {
		let dx = x - this.getX();
		let dy = y - this.getY();
		this.setX(x);
		this.setY(y);

		for (let i = 0; i < this.items.length; i++) {
			let item = this.items[i];
			item.setLocation(item.getX() + dx, item.getY() + dy);
		}
	}

	updateBound() {
		let bound = { x: 10000000, y: 1000000, width: 0, height: 0 };
		if (this.items.length > 0) {
			let minX = 10000000;
			let maxX = -10000000;
			let minY = 10000000;
			let maxY = -10000000;
			let width = maxX - minX;
			let height = maxY - minY;
			for (let i = 0; i < this.items.length; i++) {
				let item = this.items[i];
				if (item.x <= minX) {
					minX = item.x;
				}
				if (item.x >= maxX) {
					maxX = item.x;
				}
				if (item.y <= minY) {
					minY = item.y;
				}
				if (item.y >= maxY) {
					maxY = item.y;
				}
				width = maxX - minX + item.width;
				height = maxY - minY + item.height;
			}

			this.x = minX - 5;
			this.y = minY - 5;
			this.width = width + 5;
			this.height = height + 5;
		}
	}

	draw(ctx) {
		this.updateBound();
		ctx.save();
		ctx.beginPath();
		ctx.shadowBlur = 9;
		ctx.shadowColor = 'rgba(0,0,0,0.5)';
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.fillStyle = 'rgba(' + this.style.fillStyle + ',' + this.alpha + ')';
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
		ctx.restore();
	}

}
