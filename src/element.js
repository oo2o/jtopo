

export default class Element {
	constructor() {
		this.selectedLocation = null // 鼠标点击的位置
	}

	draw() {

	}

	getId() {
		return this.id;
	}

	setId(i) {
		this.id = i;
	}

	getFloatMenu() {
		return this.floatMenu;
	}

	setFloatMenu(m) {
		this.floatMenu = m;
		return this;
	}

	isFloatMenuVisible() {
		return this.floatMenuVisible;
	}

	setFloatMenuVisible(v) {
		this.floatMenuVisible = v;
		return this;
	}

	setX(x) {
		this.x = x;
		return this;
	}

	setY(y) {
		this.y = y;
		return this;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getLocation(x, y) {
		return { x: this.getX(), y: this.getY() };
	}

	setLocation(x, y) {
		this.setX(x);
		this.setY(y);
		return this;
	}

	getWidth() {
		return this.width;
	}

	setWidth(width) {
		this.width = width;
		return this;
	}

	getHeight() {
		return this.height;
	}

	setHeight(height) {
		this.height = height;
		return this;
	}

	getSize() {
		return { width: this.getWidth(), height: this.getHeight() };
	}

	setSize(width, height) {
		this.setWidth(width);
		this.setHeight(height);
		return this;
	}

	setBound(x, y, width, height) {
		this.setLocation(x, y);
		this.setSize(width, height);
		return this;
	}

	getBound() {
		return {
			left: this.getX(), top: this.getY(),
			right: this.getX() + this.getWidth(), bottom: this.getY() + this.getHeight()
		};
	}

	isVisible() {
		return this.visible;
	}

	setVisible(v) {
		this.visible = v;
		return this;
	}

	isDragable() {
		return this.dragable;
	}

	setDragable(d) {
		this.dragable = d;
		return this;
	}

	isSelected() {
		return this.selected;
	}

	setSelected(s) {
		this.selected = s;
		return this;
	}

	isFocus() {
		return this.focus;
	}

	setFocus(f) {
		this.focus = f;
		return this;
	}

	onFocus() {
		this.setFocus(true);
		return this;
	}

	loseFocus() {
		this.setFocus(false);
		return this;
	}

	setTip(tip) {
		this.tip = tip;
		return this;
	}

	getTip() {
		return this.tip;
	}

	mousedown({ e, event }) {
		this.setSelected(true);
		this.mousedownX = e.x;
		this.mousedownY = e.y;
		this.selectedLocation = { x: this.getX(), y: this.getY() };
		this.onMousedown(event)
	}

	onMouseselected() {
		// this.setSelected(true);
		// this.selectedLocation = { x: this.getX(), y: this.getY() };
	}

	mouseselected(){
		this.setSelected(true);
		this.selectedLocation = { x: this.getX(), y: this.getY() };
		this.onMouseselected()
	}

	goBack(box) {
	}

	mouseup({ e, event }) {
		console.log('mouseup', 'ele')
		this.mouseupX = e.x;
		this.mouseupY = e.y;
		let x = e.x;
		let y = e.y;
		let box = e.context;

		if (this.gravitate) {
			for (let i = 0; i < box.links.length; i++) {
				let link = box.links[i];
				if (this === link.nodeB) {
					let newNodeA = box.findCloserNode(this, this.gravitate);
					let gravitateMsg = {
						link: link, target: this,
						oldNode: this.lastParentNode, newNode: newNodeA
					};
					if (newNodeA && newNodeA.layout && newNodeA.layout.auto == true) {
						box.layoutNode(newNodeA);
					}
					if (this.lastParentNode && this.lastParentNode.layout && this.lastParentNode.layout.auto == true) {
						box.layoutNode(this.lastParentNode);
					}
					box.publish('gravitate', { ...gravitateMsg});
					break;
				}
			}
		}

		if (this.outContainer && this.isIndrag) {
			for (let j = 0; j < box.containers.length; j++) {
				let c = box.containers[j];
				if (!this.inContainer(c)) continue;
				if (this.parentContainer !== c) continue;
				if (this.x + this.width < c.x || this.x > c.x + c.width || this.y + this.height < c.y || this.y > c.y + c.height) {
					this.parentContainer.remove(this);
					break;
				}
			}
		}

		if (this.inContainer && this.isOnMousedrag) {
			for (let j = 0; j < box.containers.length; j++) {
				let group = box.containers[j];
				if (!this.inContainer(group)) continue;
				if (x > group.x && x < group.x + group.width && y > group.y && y < group.y + group.height) {
					if (this.parentContainer) {
						this.parentContainer.remove(this);
					}
					group.add(this);
					break;
				}
			}
		}
		if (this.layout && this.layout.auto == true) {
			box.layoutNode(this);
		}
		this.isOnMousedrag = false;
		this.onMouseup(event)
	}

	cancleSelected() {
		this.setSelected(false);
		this.selectedLocation = null;
	}

	onMousedown(event) { }
	onMouseup(event) { }
	onMouseover(event) { }
	onMouseout(event) { }
	onMousedrag(event) { }
	onContextmenu(event){

	}
	contextmenu({event}){
		this.onContextmenu(event)
	}
	mouseover({ e, event }) {
		this.isOnMousOver = true;
		this.isTipVisible = true;
		this.setFocus(true);
		this.onMouseover(event)
	}

	mouseout({ e, event }) {
		this.isOnMousOver = false;
		this.isTipVisible = false;
		this.setFocus(false);
		this.onMouseout(event)
	}

	mousedrag({ e, event }) {
		this.isOnMousedrag = true;
		let dx = e.dx;
		let dy = e.dy;
		let x = e.x;
		let y = e.y;

		let newX = this.selectedLocation.x + dx;
		let newY = this.selectedLocation.y + dy;
		this.setLocation(newX, newY);
		let box = e.context;

		if (this.gravitate) {
			for (let i = 0; i < box.links.length; i++) {
				let link = box.links[i];
				if (this === link.nodeB) {
					let newNodeA = box.findCloserNode(this, this.gravitate);
					if (newNodeA != null && newNodeA !== link.nodeA) {
						if (this.lastParentNode == null) {
							this.lastParentNode = link.nodeA;
						}
						link.nodeA = newNodeA;
						break;
					}
				}
			}
		}

		if (this.inContainer) {
			for (let j = 0; j < box.containers.length; j++) {
				let group = box.containers[j];
				if (!this.inContainer(group)) continue;
				if (x > group.x && x < group.x + group.width && y > group.y && y < group.y + group.height) {
					group.setFocus(true);
				} else {
					group.setFocus(false);
				}
			}
		}
		this.isIndrag = true;
		this.onMousedrag(event)
	}
}
