<template>
  <div class="container">
    <!-- Projekt anlegen button im Headbereich-->
    <div class="card">
      <div class="card-title">  
        <h3>MRP-Lauf nach Algorithmus</h3>
      </div>
      <div class="card-content">
        <div>

	    
	      <MaschinGant :tasks="actual"></MaschinGant>

          <button class="primary" @click="gesamtLauf">Gesamtlauf</button>
		  <button class="primary" @click="weiter">Weiter</button>
          <button class="primary" @click="reset">Reset</button>

        </div>
      </div>
    </div>
  
    </div>
  
  </div>
</template>


<script>
  /*eslint-disable*/
  import Giffler from './Diagram/giffler.vue';
  import MaschinGant from './Diagram/GanttDiagram.vue';

  import { Utils } from 'quasar'

  
  export default {
      
    data() {  
      return {
      }  
    },
  
    mounted() {
        this.$store.dispatch('loadStepAlg')
    },
  
    computed: {         
        color(){
        return this.$store.getters.getFarbe
        },
        ok(){
         return true;
        },
        step(){
        return this.$store.getters.displayStep
        },
        actual(){
        return this.$store.getters.displaySchritteverplant
        }
    },
  
    methods: {
      gesamtLauf() {
      this.$store.dispatch('reset')
      var allSteps = this.$store.getters.displayAlgorithmusSchritte;

      var maschines = allSteps.data.filter((x,i)=>{return x.text.match("^Ma")});
      var onlySteps = allSteps.data.filter((x,i)=>{return x.Schritt}).map(x=>x.Schritt);
      var res = onlySteps.concat(maschines)
      this.$store.dispatch('update',res)
      },
      weiter() {

         var step = this.$store.getters.displayStep;
         var AlgSteps = this.$store.getters.displayAlgorithmusSchritte;

         var AlgStepsUntil = AlgSteps.data.filter((x,i)=> i<= step);
         var onlySteps = AlgStepsUntil.filter((x) => {return x.Schritt})
         .map(x =>x.Schritt)
         var maschines = AlgSteps.data.filter((x,i)=>{return x.text.match("^Ma")});
        var res = onlySteps.concat(maschines)
         this.$store.dispatch('update',res)
         this.$store.dispatch('changeColor', AlgSteps.data[step].id)
  		 this.$store.dispatch('incStep')
      },
      reset(){
          this.$store.dispatch('reset')
          gantt.render();
      }


	  
    },
    components:{
    	Giffler,
    	MaschinGant
    }
  
  
  }
</script>



