<template>
<div >
    <div  style="height: 150px;" ref="gantt"></div>
</div>

</template>

<script>
/*eslint-disable*/
import 'dhtmlx-gantt'
export default {
   name: 'gantt',
   props: {
     tasks: {
       default () {
         return {data: []}
       }
     }
   },
   data(){
      return this.$props.tasks
   },
  mounted() {
    gantt.config.open_tree_initially = true;
    gantt.config.autosize = "y";
    gantt.init(this.$refs.gantt)
    gantt.parse(this.$props.tasks)
  },
  watch:{
    data:function(val, old){
        gantt.clearAll()
        var neu = {data:[]}
        neu.data = val;
        console.log(JSON.stringify(neu))
        if(neu.data.some(x=>!x.text.match("^M")))
        gantt.parse(JSON.stringify(neu));
    }
  }
}
</script>

<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";

</style>