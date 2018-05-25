<template>
<div>
		<canvas ref="test" width="1000" height="400" ></canvas>
  </div>
</template>
<script>

	import JTopo from  'JTopo'
	export default {
		mounted(){
			let stage = new JTopo.Stage(this.$refs.test, true, 'aa')
			var scene = new JTopo.Scene(stage); // 创建一个场景对象

      var node = new JTopo.Node("Hello");    // 创建一个节点
			var node2 = new JTopo.Node('hello2');
      node.setLocation(300,200);    // 设置节点坐标
			node.setTip('test')
      stage.add(node); // 放入到场景中
			node2.setLocation(100, 200)
			stage.add(node2)
			var link = new JTopo.FoldLink(node, node2, 'text');
			stage.add(link)
			node.onMousedown = (function(event){
        if(event.button == 2){
          node.text = '按下右键';
        }else if(event.button == 1){
          node.text = '按下中键';
        }else if(event.button == 0){
          node.text = '按下左键';
        }
      });
		},
		methods: {
			reload() {
				window.location.reload();
			}
		}
	}
</script>
