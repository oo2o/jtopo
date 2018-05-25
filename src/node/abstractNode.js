
import Element from '../element'
import Tips from './tips'
let ImageCache = {}
export default class AbstractNode extends Element {
	constructor(option){
		super()
		this.id = option.id || null;
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.width = option.width || 0;
		this.height = option.height || 0;
		this.visible = option.visible || true;
		this.dragable = option.dragable || true;
		this.text = option.text || option.name || ''
		this.name = option.name || '';
		this.image = option.image || null;
		this.color = option.color || null;
		this.layout = option.layout || null;
		this.gravitate = option.gravitate || null;//function(){};
		this.parentContainer = option.parentContainer || null;
		this.inContainer = option.inContainer || null;
		this.outContainer = option.outContainer || null;
		this.fixed = option.fixed || false;
		this.tip = new Tips(option.tip || {})
	}

	draw(ctx){

	}

	getName = function(){
		return this.name;
	}

	setName = function(n){
		this.name = n;
		return this;
	}

	getImage = function(){
		return this.image;
	}

	setImage = function(i){
		let node = this;
		if(typeof i == 'string'){
			let img = this.image = new Image();
			this.image.onload = function(){
				node.setSize(img.width, img.height);
			};
			this.image.src = i;
		}else{
			this.image = i;
		}
	}

	getTypeImage = function(type){
		let typeImages = {
			'zone' : './img/zone.png',
			'host' : './img/host.png',
			'vm' : './img/vm.png'
		};
		if(ImageCache[type]){
			return ImageCache[type];
		}
		let src = typeImages[type];
		if(src == null) return null;

		let image = new Image();
		image.src = src;
		return ImageCache[type] = image;
	}

	getType = function(){
		return this.type;
	}

	setType = function(type){
		this.type = type;
		this.setImage(this.getTypeImage(type));
	}

}
