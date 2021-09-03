// import path from "path";
// import json from "./test.json";
// import haha from "./haha.txt";
// import exec from './haha.exec'
// console.log(exec)
// console.log(123);
// console.log(json);
// import image from "./assets/image.png";
// let a = "qweer";
// let b = "haha";
// console.log(image);
// console.log(haha);
// console.log(path.resolve(a, b));
// import Vue from 'vue'
import './base.css'
import App from './App.vue'
 

new Vue({
  el:"#app",
  render(h){
    return h(App) 
  }
})