import { Node, CircleNode, EndPointNode, GhomboidNode, HeartNode, TextNode, TipNode } from './node'
import Stage from './stage'
import Scene from './scene'
import { Link, FoldLink, CurverLink, ArrowsLink, ArrowsFoldLink } from './link'
import { Container, GhomboidContainer, GridContainer, OneItemContainer } from './container'

const JTopo = {
	constructor(name){
		this.name = name
	},
	Node: Node,
	CircleNode: CircleNode,
	EndPointNode: EndPointNode,
	GhomboidNode: GhomboidNode,
	HeartNode: HeartNode,
	TextNode: TextNode,
	TipNode: TipNode,
	Stage: Stage,
	Scene: Scene,
	Link: Link,
	FoldLink: FoldLink,
	CurverLink: CurverLink,
	ArrowsLink: ArrowsLink,
	ArrowsFoldLink: ArrowsFoldLink,
	Container: Container,
	GhomboidContainer: GhomboidContainer,
	GridContainer: GridContainer,
	OneItemContainer: OneItemContainer,
	Version: '0.1.0',
	description: '参考与https://github.com/tuanjie54188/jtopo'
}

export default JTopo
