import Vue from 'vue'
import App from './App.vue'
import codeBlock from '@/components/code-block'
Vue.component('code-block',codeBlock)

var app = new Vue({
    render: h => h(App)
}).$mount('#app')

console.log(process.env.NODE_ENV)
console.log('hellow vue')