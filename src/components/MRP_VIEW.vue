<template>
  <div class="container">
   <!-- GanttCard -->
  <div class="card col">

            <div class="card-content">
                    <MaschinGant :tasks="actual"></MaschinGant>
                    <button class="primary" @click="gesamtLauf">Gesamtlauf</button>
                    <button class="primary" @click="weiter">Weiter</button>
                    <button class="primary" @click="reset">Reset</button>
          </div>
      </div>
    <!-- KonsolenCard -->
    <div class="card">
         <div class="card-content">
             <div class="card col">
                <div class="card-content">
                <div class="shell-wrap">
                        <p class="shell-top-bar">MRP Lauf was passiert</p>
                        <ul class="shell-body">
                           <li v-for="item in konsolenListe">
                              {{item.text}}
                           </li>
                        </ul>
                      </div>
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
        },
        konsolenListe(){
        return this.$store.getters.displayAlgorithmusSchritteBis
        }
    },
  
    methods: {
      gesamtLauf() {
      this.$store.dispatch('reset')
      var allSteps = this.$store.getters.displayAlgorithmusSchritte;
      this.$store.dispatch('updateBIS',allSteps.data)
      var maschines = allSteps.data.filter((x,i)=>{return x.text.match("^Ma")});
      var onlySteps = allSteps.data.filter((x,i)=>{return x.Schritt}).map(x=>x.Schritt);
      var res = onlySteps.concat(maschines)
      this.$store.dispatch('update',res)
      },
      weiter() {

         var step = this.$store.getters.displayStep;
         var AlgSteps = this.$store.getters.displayAlgorithmusSchritte;

         var AlgStepsUntil = AlgSteps.data.filter((x,i)=> i<= step);
         this.$store.dispatch('updateBIS',AlgStepsUntil)



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

<style>
 @import "./css/console.css";

 .container{
 display:flex;
 }
</style>


