/*eslint-disable*/
import {configFile} from '../config/configFile'

const moduleMRPStore = {

    state: {
        step: 0,
		Schritteverplant: {data:[]},
        AlgorithmusSchritte: [],
        Farbe:["green","green","green","green","green","green","green","green","green","green"],
    },
    getters: {
        displayedAuftraege: state => state.Produktionsauftrage,
        displayAlgorithmusSchritte: state => state.AlgorithmusSchritte,
        displaySchritteverplant: state => state.Schritteverplant,
        displayStep: state => state.step,
        getFarbe: state => state.Farbe,
    },
    mutations: {

        LOAD_STEPS(state, steps) {
            //Gesamte Schritte speichern
            state.AlgorithmusSchritte = steps
            //Maschinen laden
            steps.data.filter((x,i,arr)=>{
                if(x.text.match("^M")){
                   state.Schritteverplant.data.push(x)
                }
            });
        },
        CCOLOR(state, step){
            state.step = step;
            state.Farbe = state.Farbe.map((x,i)=> i==step? x = "red":x="green");
            state.step++;
        },
        ADD(state,step){state.Schritteverplant.data.push(step)},
        RESET(state){
            state.step = 0;
            state.Schritteverplant.data = [];
            state.AlgorithmusSchritte.data.filter((x,i,arr)=>{
                            if(x.text.match("^M")){
                               state.Schritteverplant.data.push(x)
                            }
                        });
            state.Farbe = state.Farbe.map((x)=>x="green")
        },
    },
    actions: {
        loadStepAlg({ commit }){
            fetch(configFile.AlgStep, {
                            method: "GET",
                        })
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(aufs) {
                                commit('LOAD_STEPS', aufs)
                        });
        },
        changeColor({commit},id){
        	commit('CCOLOR',id)
        },
        addStep({commit},step){
            commit('ADD',step)
        },
        reset({commit}){
            commit('RESET')
        }
    }
}

export default moduleMRPStore;
