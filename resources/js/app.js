require('./bootstrap');

window.Vue = require('vue');

Vue.config.devtools = false;
Vue.config.productionTip = false;

Vue.component('calculator-component', require('./components/CalculatorComponent.vue').default);

/**
 * We will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});
