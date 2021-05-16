import Vue from 'vue';
import vueResource from 'vue-resource';
import App from './App.vue';
import { Autocomplete } from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use( Autocomplete );
Vue.use( vueResource );
Vue.config.productionTip = false;

new Vue( {
  render: h => h( App ),
} ).$mount( '#app' );
