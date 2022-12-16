import Vue from 'vue'
import App from './App.vue'

var app = new Vue({
    render: h => h(App)
}).$mount('#app')

console.log(process.env.NODE_ENV)
console.log('hellow world')