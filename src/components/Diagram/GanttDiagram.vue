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
   computed(){

   },
  mounted() {
    gantt.config.open_tree_initially = false;
    gantt.config.autosize = "y";
    gantt.init(this.$refs.gantt)
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