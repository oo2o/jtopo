import Util from './util'
import { Node } from './node'
import { Container } from './container'
import { Link } from './link'

export default class Stage {
	constructor(option) {
		this.name = option.name || '';
		this.canvas = option.canvas;
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.messageBus = new Util.MessageBus();
		this.image = new Image();
		this.image.src = option.imageSrc || '';
		this.scale = 1
		this.isScale = option.isScale || false
		this.maxScale = 4
		this.minScale = 0.5
		this.init();
		this.contextMenu = option.contextMenu || null
	}

	init() {
		this.ctx.shadowBlur = 5;
		this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
		this.ctx.shadowOffsetX = 3;
		this.ctx.shadowOffsetY = 6;
		this.ctx.scale(this.scale, this.scale)

		this.startDragMouseX = 0;
		this.startDragMouseY = 0;
		this.offset = this.canvas.getBoundingClientRect()
		// this.offset = canvas.offset();
		this.isRangeSelectable = true;

		this.elements = [];
		this.containers = [];
		this.links = [];
		this.nodes = [];
		this.elementMap = {};
		this.selectedElements = [];

		let box = this;
		this.canvas.onmousedown = function (event) {
			box.isMousedown = true;
			box.canvas.style.cursor = 'move'
			box.mousedown(event);
			event.preventDefault();
		};
		this.canvas.onresize = function (event) {
			box.offset = box.canvas.getBoundingClientRect()
		}
		this.canvas.onmousemove = function (event) {
			box.mousemove(event);
		};
		this.canvas.onmouseup = function (event) {
			box.isMousedown = false;
			box.canvas.style.cursor = 'default'
			box.mouseup(event);
		};
		if (this.isScale) {
			this.canvas.onmousewheel = function (event) {
				event = event || window.event;
				box.mousewheel(event)
				event.preventDefault();
				box.updateView()
			}
		}
		if (this.contextMenu) {
			this.canvas.oncontextmenu = function (event) {
				event = event || window.event;
				box.contextmenu(event)
				event.preventDefault();
				return false;
			}
		}
		try {// IE !!
			window.addEventListener('keydown', function (e) {
				box.keydown(e);
				e.preventDefault();
			}, true);
			window.addEventListener('keyup', function (e) {
				box.keyup(e);
				e.preventDefault();
			}, true);
		} catch (e) { }

		setTimeout(() => {
			box.offset = box.canvas.getBoundingClientRect();
			box.updateView()
		}, 300);
	}

	attachMousewheel() {
		let box = this
		this.canvas.onmousewheel = function (event) {
			event = event || window.event;
			box.mousewheel(event)
			event.preventDefault();
			box.updateView()
		}
		this.isScale = true
	}

	cancleMousewheel() {
		this.canvas.onmousewheel = null
		this.isScale = false
	}

	getElementByXY(x, y) {
		let e = null;
		for (let i = this.nodes.length - 1; i >= 0; i--) {
			let node = this.nodes[i];
			if (x > node.x && x < node.x + node.width && y > node.y && y < node.y + node.height) {
				e = node;
				break;
			}
		}
		if (!e) {
			for (let i = this.containers.length - 1; i >= 0; i--) {
				let group = this.containers[i];
				if (x > group.x && x < group.x + group.width && y > group.y && y < group.y + group.height) {
					e = group;
					break;
				}
			}
		}
		return e;
	}

	getElementByName(name) {
		for (let i = this.nodes.length - 1; i >= 0; i--) {
			if (this.nodes[i].getName() == name) {
				return this.nodes[i];
			}
		}
		return null;
	}

	findCloserNode(node, cond) {
		let min = { distance: Number.MAX_VALUE, node: null };
		for (let i = this.nodes.length - 1; i >= 0; i--) {
			let typeNode = this.nodes[i];
			if (typeNode === node) continue;
			if (cond(typeNode) == true) {
				let dist = Util.getDistance(node, typeNode);
				if (dist < min.distance) {
					min.node = typeNode;
					min.distance = dist;
				}
			}
		}
		return min.node;
	}

	cancleAllSelected() {
		this.selectedElements.forEach(item => item.cancleSelected())
		this.selectedElements = [];
	};

	/**
	 *	鼠标滚轮滚动， 缩放
	 * @param {Event} event
	 */
	mousewheel(event) {
		let scale = 1;
		if (event.wheelDelta > 0) {
			if (this.scale >= this.maxScale) {
				return
			}
			scale = 2;

		} else {
			if (this.scale <= this.minScale) {
				return
			}
			scale = 0.5
		}
		this.scale *= scale
		const xy = Util.getXY(this, event)
		const newXy = { x: xy.x * 2, y: xy.y * 2 }
		this.links.forEach(link => link.style.lineWidth *= scale)
		this.containers.forEach(container => {
			container.width *= scale
			container.height *= scale
			container.x = container.x * scale
			container.y = container.y * scale
		})
		this.nodes.forEach(node => {
			node.width *= scale
			node.height *= scale
			node.x = node.x * scale
			node.y = node.y * scale
		})
	}

	mousedown(event) {
		let xy = Util.getXY(this, event);
		let x = xy.x;
		let y = xy.y;

		let selectedNode = this.getElementByXY(x, y);
		if (selectedNode && selectedNode != null) {
			selectedNode.mousedown({ e: { x: x, y: y, context: this }, event });
			this.currElement = selectedNode;
		} else if (this.currElement && this.currElement != null) {
			this.currElement.cancleSelected();
			this.currElement = null;
		}

		this.startDragMouseX = x;
		this.startDragMouseY = y;

		if (this.currElement) {
			if (this.selectedElements.indexOf(this.currElement) == -1) {
				this.cancleAllSelected();
				this.selectedElements.push(this.currElement);
			}
		} else {
			this.cancleAllSelected();
		}

		for (let i = 0; i < this.selectedElements.length; i++) {
			let node = this.selectedElements[i];
			node.selectedLocation = { x: node.x, y: node.y };
		}

		if (!this.currElement || this.currElement == null) {
			console.log('mousedown')
			this.nodes.forEach(node => node.selectedLocation = { x: node.getX(), y: node.getY() })
		}
		this.isOnMouseDown = true;
		this.publish('mousedown', { target: this.currElement, x: x, y: y, context: this });
	}

	mousemove(event) {
		let xy = Util.getXY(this, event);
		let x = xy.x;
		let y = xy.y;
		let dx = (x - this.startDragMouseX);
		let dy = (y - this.startDragMouseY);
		this.publish('mousemove', { target: this.currElement, x: x, y: y, dx: dx, dy: dy, context: this });

		//if(this.currElement && !this.currElement.isDragable()) return;

		this.updateView();
		for (let i = this.nodes.length - 1; i >= 0; i--) {
			let node = this.nodes[i];
			if (node.x + node.width < 0 || node.x > this.canvas.width) continue;

			if (x > node.x && x < node.x + node.width && y > node.y && y < node.y + node.height) {
				node.mouseover({ e: { x: x, y: y, dx: dx, dy: dy, context: this }, event });
				this.publish('mouseover', { target: node, x: x, y: y, dx: dx, dy: dy, context: this });
			} else {
				if (node.isOnMousOver) {
					node.mouseout({ e: { x: x, y: y, dx: dx, dy: dy, context: this }, event });
					this.publish('mouseout', { target: node, x: x, y: y, dx: dx, dy: dy, context: this });
				}
			}
		}
		if (this.currElement && this.isOnMouseDown && this.currElement.isDragable()) {
			this.selectedElements.forEach(node => node.mousedrag({ e: { x: x, y: y, dx: dx, dy: dy, context: this }, event }))
			// for (let i = 0; i < this.selectedElements.length; i++) {
			// 	let node = this.selectedElements[i];
			// 	node.mousedrag({ x: x, y: y, dx: dx, dy: dy, context: this });
			// }
			this.publish('mousedrag', { target: this.currElement, x: x, y: y });
		} else if (this.isOnMouseDown && this.isRangeSelectable && !this.isScale) {
			let startx = x >= this.startDragMouseX ? this.startDragMouseX : x;
			let starty = y >= this.startDragMouseY ? this.startDragMouseY : y;
			let width = Math.abs(x - this.startDragMouseX);
			let height = Math.abs(y - this.startDragMouseY);

			this.ctx.beginPath();
			this.ctx.fillStyle = 'rgba(168,202,236,0.5)';
			this.ctx.fillRect(startx, starty, width, height);
			this.ctx.closePath();

			this.nodes.forEach(node => {
				if (node.x + node.width < 0 || node.x > this.canvas.width) return;

				if (node.x > startx && node.x + node.width < startx + width) {
					if (node.y > starty && node.y + node.height < starty + height) {
						node.mouseselected({ e: { x: x, y: y, dx: dx, dy: dy, context: this }, event });
						this.selectedElements.push(node);
					}
				} else {
					node.cancleSelected();
				}
			})
		} else if (this.isOnMouseDown && this.isScale) {
			this.nodes.forEach(node => node.mousedrag({ e: { x: x, y: y, dx: dx, dy: dy, context: this }, event }))
			this.publish('mousedrag', { target: this.currElement, x: x, y: y });
		}
	}

	mouseup(event) {
		let xy = Util.getXY(this, event);
		let x = xy.x;
		let y = xy.y;
		let dx = (x - this.startDragMouseX);
		let dy = (y - this.startDragMouseY);

		this.publish('mouseup', { target: this.currElement, x: x, y: y, dx: dx, dy: dy, context: this });
		this.startDragMouseX = null;
		console.log('mouseup', 'stage')
		if (this.currElement) {
			this.currElement.mouseup({ e: { x: x, y: y, context: this, dx: dx, dy: dy }, event });
		}
		this.updateView();
		this.isOnMouseDown = false;
	}

	keydown(e) {
		let keyID = e.keyCode ? e.keyCode : e.which;
		this.publish('keydown', keyID);
		// this.updateView();
		// return;

		if (keyID === 17) { // Ctrl
		}
		if (keyID === 18) {// Alt
		}
		if (keyID === 16) { // Shift
		}
		if (keyID === 27) { // Esc
			this.cancleAllSelected();
			this.currElement = null;
		}
		if (keyID === 38 || keyID === 87) { // up arrow and W
			if (this.currElement) {
				this.currElement.y -= 5;
			}
		}
		if (keyID === 39 || keyID === 68) { // right arrow and D
			if (this.currElement) {
				this.currElement.x += 5;
			}
		}
		if (keyID === 40 || keyID === 83) { // down arrow and S
			if (this.currElement) {
				this.currElement.y += 5;
			}
		}
		if (keyID === 37 || keyID === 65) { // left arrow and A
			if (this.currElement) {
				this.currElement.x -= 5;
			}
		}
		this.updateView();
	}

	keyup(e) {
		let keyID = e.keyCode ? e.keyCode : e.which;
		this.publish('keyup', keyID);
		this.updateView();
	}

	contextmenu(event) {
		this.selectedElements.forEach( node => node.contextmenu({event}))
	}
	subscribe(topic, action) {
		this.messageBus.subscribe(topic, action);
		return this;
	}

	publish(topic, msg) {
		this.messageBus.publish(topic, msg);
		return this;
	}

	removeElementById(id) {
		for (let i = 0; i < this.elements.length; i++) {
			if (this.elements[i].id == id) {
				this.remove(i);
				break;
			}
		}
	}

	remove(e) {
		this.elements = this.elements.del(e);
		this.containers = this.containers.del(e);
		this.links = this.links.del(e);
		this.nodes = this.nodes.del(e);
		this.elementMap[e.id] = e;
	}

	addElement(e) {
		return this.add(e);
	}

	add(e) {
		if (this.elementMap[e.id] != null) {
			return;
		}
		if (!e.id) e.id = (new Date()).getTime();
		if (!e.z) e.z = this.elements.length;
		this.elements.push(e);
		if (e instanceof Container) {
			this.containers.push(e);
		} else if (e instanceof Link) {
			this.links.push(e);
		} else if (e instanceof Node) {
			this.nodes.push(e);
		}
		this.elementMap[e.id] = e;
	}

	clear() {
		this.elements = [];
		this.links = [];
		this.nodes = [];
		this.containers = [];
		this.elementMap = {};
	}

	getChilds(node) {
		let result = [];
		for (let i = 0; i < this.links.length; i++) {
			if (this.links[i].nodeA === node) {
				result.push(this.links[i].nodeB);
			}
		}
		return result;
	}

	getNodesBound(nodes) {
		let bound = { x: 10000000, y: 1000000, width: 0, height: 0 };
		if (nodes.length > 0) {
			let minX = 10000000;
			let maxX = -10000000;
			let minY = 10000000;
			let maxY = -10000000;
			let width = maxX - minX;
			let height = maxY - minY;
			for (let i = 0; i < nodes.length; i++) {
				let item = nodes[i];
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

			bound.x = minX;
			bound.y = minY;
			bound.width = width;
			bound.height = height;
			return bound;
		}
		return null;
	}

	isAllChildIsEndpoint(node) {
		let childs = this.getChilds(node);
		for (let i = 0; i < childs.length; i++) {
			let grandsons = this.getChilds(childs[i]);
			if (grandsons.length > 0) return false;
		}
		return true;
	}

	getBoundRecursion(node) {
		let childs = this.getChilds(node);
		if (childs.length == 0) return node.getBound();
		return this.getNodesBound(childs);
	}

	layoutNode(node) {
		let childs = this.getChilds(node);
		if (childs.length == 0) return node.getBound();

		this.adjustPosition(node);
		if (this.isAllChildIsEndpoint(node)) {
			return null;
		}
		for (let i = 0; i < childs.length; i++) {
			this.layoutNode(childs[i]);
		}
		return null;
	}

	adjustPosition(node) {
		let childs = this.getChilds(node);
		let layout = node.layout;
		let type = layout.type;
		let points = null;
		if (type == 'star') {
			points = JTopo.Layout.getStarPositions(node.x, node.y, childs.length, node.layout.radius,
				node.layout.beginDegree, node.layout.endDegree);
		} else if (type == 'tree') {
			points = JTopo.Layout.getTreePositions(node.x, node.y, childs.length, layout.width,
				layout.height, layout.direction);
		}
		for (let i = 0; i < childs.length; i++) {
			childs[i].setLocation(points[i].x, points[i].y);
		}
	}

	getParents(node) {
		let result = [];
		for (let i = 0; i < this.links.length; i++) {
			if (this.links[i].nodeB === node) {
				result.push(this.links[i].nodeA);
			}
		}
		return result;
	}

	updateView() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// this.ctx.scale(this.scareX, this.scareY);
		if (this.image != null) {
			this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
		}

		for (let i = 0; i < this.links.length; i++) {
			let link = this.links[i];
			if (link.nodeA.x + link.nodeA.width < 0 || link.nodeA.x > this.canvas.width) continue;
			if (link.nodeB.x + link.nodeA.width < 0 || link.nodeB.x > this.canvas.width) continue;

			link.draw(this.ctx);
		}

		for (let i = 0; i < this.containers.length; i++) {
			let c = this.containers[i];
			if (c.x + c.width < 0 || c.x > this.canvas.width) continue;

			this.containers[i].draw(this.ctx);
		}
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].x + this.nodes[i].width < 0 || this.nodes[i].x > this.canvas.width) continue;
			this.nodes[i].draw(this.ctx);
		}
	}
}
