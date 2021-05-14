import Vue from 'vue';
import App from './App.vue';
import { Autocomplete } from 'buefy';
import 'buefy/dist/buefy.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use( Autocomplete );

Vue.config.productionTip = false;

new Vue( {
  render: h => h( App ),
} ).$mount( '#app' );

const app = Vue.createApp( {} );
app.use( VueAxios, axios );