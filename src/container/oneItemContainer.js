import Container from './container'

export default class GhomboidContainer extends Container {
	constructor() {
		super()
		this.rows = 1;
		this.cols = 1;
		this.cellWidth = 50;
		this.cellHeight = 50;

		this.setDragable(false);

		this.style.fillStyle = '0,100,100';
		this.alpha = 0.5;
	}
}
