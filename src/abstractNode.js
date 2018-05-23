
import Element from './element'
let ImageCache = {}
export default class AbstractNode extends Element {

	constructor(name){
		super()
		this.id = null;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.visible = true;
		this.dragable = true;

		this.name = name;
		this.image = null;
		this.color = null;
		this.layout = null;
		this.gravitate = null;//function(){};
		this.parentContainer = null;
		this.inContainer = null;
		this.outContainer = null;
		this.fixed = false;
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
