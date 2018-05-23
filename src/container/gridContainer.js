import Container from './container'

export default class GridContainer extends Container {
	constructor() {
		super()
		this.rows = 3;
		this.cols = 2;
		this.cellWidth = 60;
		this.cellHeight = 60;
		this.offset = 3
	}

	adjustLayout() {
		for (let i = 0; i < this.items.length; i++) {
			let item = this.items[i];
			let row = Math.floor(i / this.cols);
			let col = i % this.cols;
			item.x = this.x + col * this.cellWidth;
			item.y = this.y + row * this.cellHeight;
		}
	};

	add(e) {
		let capacity = this.items.length;
		if (capacity == this.rows * this.cols) return;
		this.items.push(e);
		e.parentContainer = this;
		this.adjustLayout();
	};

	draw(ctx) {
		this.width = this.cols * this.cellWidth;
		this.height = this.rows * this.cellHeight;
		ctx.save();
		ctx.beginPath();
		ctx.shadowBlur = 12;
		ctx.shadowColor = 'rgba(0,0,0,0.9)';
		ctx.shadowOffsetX = 5;
		ctx.shadowOffsetY = 3;
		ctx.fillStyle = 'rgba(' + this.style.fillStyle + ',' + this.alpha + ')';

		let r = 0;
		if (this.isFocus()) {
			r = this.offset;
			ctx.shadowColor = 'rgba(0,0,200, 1)';
			ctx.fillRect(this.x - r, this.y - r, this.width + r * 2, this.height + r * 2);
		} else {
			ctx.shadowColor = 'rgba(0,0,0,0.5)';
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
		/*
		 ctx.moveTo(this.x-r, this.y -r);
		 ctx.lineTo(this.x-r + 10, this.y - 10 -r);
		 ctx.lineTo(this.x-r + 10 + this.width, this.y - 10-r);
		 ctx.lineTo(this.x-r + 10 + this.width, this.y + this.height - 10 -r);
		 ctx.lineTo(this.x-r + this.width, this.y + this.height -r);
		 ctx.moveTo(this.x-r + 10 + this.width, this.y - 10 -r);
		 ctx.lineTo(this.x-r + this.width, this.y -r);

		 for(let i=0; i<=this.rows; i++){
		 for(let j=0; j<this.cols; j++){
		 ctx.moveTo(this.x-r, this.y + i * this.cellHeight - r);
		 ctx.lineTo(this.x-r+this.width, this.y+ i * this.cellHeight-r);
		 }
		 }
		 for(let i=0; i<=this.rows; i++){
		 for(let j=0; j<=this.cols; j++){
		 ctx.moveTo(this.x-r + j * this.cellWidth, this.y + r);
		 ctx.lineTo(this.x-r + j * this.cellWidth, this.y+ i * this.cellHeight - r);
		 }
		 }*/

		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}
