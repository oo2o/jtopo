const Util = {
	drawStart(ctx) {
		ctx.save();
		ctx.beginPath();
	},
	drawEnd() {
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	},
	getDistance(p1, p2) {
		let dx = p2.x - p1.x;
		let dy = p2.y - p1.y;
		return Math.sqrt(dx * dx + dy * dy);
	},
	mouseCoords(event) {
		if (event.pageX || event.pageY) {
			return { x: event.pageX, y: event.pageY };
		}
		return {
			x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
			y: event.clientY + document.body.scrollTop - document.body.clientTop
		};
	},
	getXY(box, event) {
		event = event || mouseCoords(window.event);
		let x = document.body.scrollLeft + (event.x || event.layerX);
		let y = document.body.scrollTop + (event.y || event.layerY);
		return { x: x - box.offset.left, y: y - box.offset.top };
	},
	rotatePoint(bx, by, x, y, angle) {
		let dx = x - bx;
		let dy = y - by;
		let r = Math.sqrt(dx * dx + dy * dy);
		let a = Math.atan2(dy, dx) + angle;
		return {
			x: bx + Math.cos(a) * r,
			y: by + Math.sin(a) * r
		};
	},
	rotatePoints(target, points, angle) {
		let result = [];
		for (let i = 0; i < points.length; i++) {
			let p = rotatePoint(target.x, target.y, points[i].x, points[i].y, angle);
			result.push(p);
		}
		return result;
	}
}

class MessageBus {
	constructor(name) {
		this.name = name;
		this.messageMap = {};
		this.messageCount = 0;
	}
	subscribe(topic, action) {
		if (! typeof topic == 'string') {
			this.subscribes(topic, action);
		} else {
			var actions = this.messageMap[topic];
			if (actions == null) {
				this.messageMap[topic] = [];
			}
			this.messageMap[topic].push(action);
			this.messageCount++;
		}
	}
	subscribes(topics, action) {
		var results = [];
		var counter = 0;
		for (var i = 0; i < topics.length; i++) {
			var topic = topics[i];
			var actions = this.messageMap[topic];
			if (actions == null) {
				this.messageMap[topic] = [];
			}
			function actionProxy(result) {
				results[i] = result;
				counter++;
				if (counter == topics.length) {
					counter = 0;
					return action.apply(null, results);
				} else {
					return null;
				}
			};

			this.messageMap[topic].push(actionProxy);
			this.messageCount++;
		}
	}
	unsubscribe(topic) {
		var actions = this.messageMap[topic];
		if (actions != null) {
			this.messageMap[topic] = null;
			delete (this.messageMap[topic]);
			this.messageCount--;
		}
	}
	publish(topic, data, concurrency) {
		var actions = this.messageMap[topic];
		if (actions != null) {
			for (var i = 0; i < actions.length; i++) {
				if (concurrency) {
					(function (action, data) {
						setTimeout(function () { action(data); }, 10);
					})(actions[i], data);
				} else {
					actions[i](data);
				}
			}
		}
	}
}

export default { MessageBus, ...Util }
