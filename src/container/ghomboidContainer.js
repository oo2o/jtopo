import Container from './container'

export default class GhomboidContainer extends Container {
	constructor() {
		super()
		this.offset = 50
	}

	draw(ctx) {
		this.updateBound();
		ctx.save();
		ctx.beginPath();
		ctx.shadowBlur = 9;
		ctx.shadowColor = 'rgba(0,0,0,0.9)';
		ctx.shadowOffsetX = 6;
		ctx.shadowOffsetY = 6;
		ctx.fillStyle = 'rgba(' + this.style.fillStyle + ',' + this.alpha + ')';
		ctx.moveTo(this.x + this.offset, this.y);
		ctx.lineTo(this.x + this.offset + this.width, this.y);
		ctx.lineTo(this.x + this.width, this.y + this.height);
		ctx.lineTo(this.x, this.y + this.height);
		ctx.lineTo(this.x + this.offset, this.y);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}
