import AbstractNode from './abstractNode'

export default class Node extends AbstractNode {

	constructor(name) {
		super(name)
		this.name = name;
		this.width = 35;
		this.height = 35;
		this.x = 0;
		this.y = 0;
		this.style = { fillStyle: '71, 167, 184', fontSize: '10pt', font: "Consolas" };
		this.type = null;
		this.selected = false;

		this.alpha = 1;
		this.scala = 1;
		this.rotate = 0
		this.tip = null
	}

	drawText(ctx) {
		let text = this.text;
		if (!text || text == '') return;
		let textWidth = ctx.measureText(text).width;
		ctx.font = this.style.fontSize + ' ' + this.style.font;
		ctx.strokeStyle = 'rgba(230, 230, 230, ' + this.alpha + ')';
		ctx.strokeText(text, -this.width / 2 + (this.width - textWidth) / 2, this.height / 2 + 12);
	}

	drawTip(ctx) {

	}

	drawSelectedRect(ctx) {
		var textWidth = ctx.measureText(this.name).width;
		var w = this.width
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(168,202,255, 0.9)';
		ctx.fillStyle = 'rgba(168,202,236,0.5)';
		ctx.rect(-w / 2 - 2, -this.height / 2 - 2, w + 4, this.height + 4);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	draw(ctx) {
		if (!this.isVisible) return;
		ctx.save();
		ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		ctx.rotate(this.rotate);

		if (this.selected || this.focus) {
			this.drawSelectedRect(ctx);
		}
		let image = this.getImage();
		if (image != null) {
			//ctx.rect(-this.width/2, -this.height/2, this.width, this.height);
			//ctx.clip();
			ctx.drawImage(image, -this.width / 2, -this.height / 2);
		} else {
			ctx.beginPath();
			ctx.fillStyle = 'rgba(' + this.style.fillStyle + ',' + this.alpha + ')';
			ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
			ctx.fill();
			ctx.closePath();
		}
		this.drawText(ctx);
		if (this.isTipVisible) {
			this.drawTip(ctx);
		}
		ctx.restore();
	}

	split(angle) {
		let node = this;
		function genNode(x, y, r, beginDegree, endDegree) {
			let newNode = new JTopo.Node();
			newNode.setImage(node.image);
			newNode.setLocation(x, y);
			newNode.draw = function (ctx) {
				ctx.save();
				ctx.arc(this.x + this.width / 2, this.y + this.height / 2, r, beginDegree, endDegree);
				ctx.clip();
				ctx.beginPath();
				if (this.image != null) {
					ctx.drawImage(this.image, this.x, this.y);
				} else {
					ctx.fillStyle = 'rgba(' + this.style.fillStyle + ',' + this.alpha + ')';
					ctx.rect(this.x, this.y, this.width, this.height);
					ctx.fill();
				}
				ctx.closePath();
				ctx.restore();
			};
			return newNode;
		};
		let beginDegree = angle;
		let endDegree = angle + Math.PI;

		let nodeA = genNode(node.x, node.y, node.width, beginDegree, endDegree);
		let nodeB = genNode(node.x, node.y, node.width, beginDegree + Math.PI, beginDegree);

		return {
			nodeA: nodeA,
			nodeB: nodeB
		};
	}
}
