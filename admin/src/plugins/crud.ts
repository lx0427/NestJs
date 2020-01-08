import Vue from 'vue'
import CrudComponent from '../components/CrudComponent.vue'

const Crud = {
  install: function(Vue: any) {
    Vue.component('Crud', CrudComponent)
  }
}
export default Crud
