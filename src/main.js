/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Register Charts globally
import BarChart from './views/BarChart.vue'
import LineChart from './views/LineChart.vue'
import Doughnut from './views/Doughnut.vue'

Vue.component("BarChart", BarChart)
Vue.component("LineChart", LineChart)
Vue.component("Doughnut", Doughnut)


Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");