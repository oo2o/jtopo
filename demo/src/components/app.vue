<template>
  <div>
		<canvas ref="test" width="1000" height="400" ></canvas>
  </div>
</template>

<script>

	import JTopo from  'JTopo'
	export default {
		mounted(){
      const option = {
        canvas: this.$refs.test, // required
        isScale: true,
        imageSrc: '/static/aa.png',
        name: 'aa'
      }
			let stage = new JTopo.Stage(option)
			var scene = new JTopo.Scene(stage); // 创建一个场景对象
      let node1Option = {
        name: 'hello',
        text: 'test',
        tip: {
          text: '刘妙想',
          type: 'Top'
        },
        x: 300,
        y: 200
      }
      let node2Option = {
        name: 'hello2',
        text: 'test',
        tip: {
          text: 'text',
          type: 'Top'
        },
        x: 100,
        y: 200
      }
      var node = new JTopo.Node(node1Option);    // 创建一个节点
			var node2 = new JTopo.Node(node2Option);
      stage.add(node); // 放入到场景中
			stage.add(node2)
			var link = new JTopo.FoldLink(node, node2, 'text');
			stage.add(link)
      let node3Option = {
        name: 'hello2',
        text: 'test',
        tip: {
          text: 'text',
          type: 'Top'
        },
        x: 400,
        y: 200
      }
      let node3 = new JTopo.Node(node3Option);
      stage.add(node3)
      let link2 = new JTopo.ArrowsFoldLink(node, node3,'link2')
      stage.add(link2)
		// 	node.onMousedown = (function(event){
    //     if(event.button == 2){
    //       node.text = '按下右键';
    //       console.log('按下右键')
    //     }else if(event.button == 1){
    //       node.text = '按下中键';
    //       console.log('按下中键')
    //     }else if(event.button == 0){
    //       node.text = '按下左键';
    //       console.log('按下左键')
    //     }
    //   });
		},
		methods: {
			reload() {
				window.location.reload();
			}
		}
	}
</script>
<style scope="css">
canvas { letter-pacing: 10px; }
</style>
