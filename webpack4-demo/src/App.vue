<template>
  <div>
    <div class="success">我成功了吗</div>
    <div>{{ msg }}</div>
    <img :src="image" alt />
    <!-- url-loader在5.0.0默认开启了esModule=true .所以require语法需要手动default一下。 但是import引入的并不需要 -->
    <img :src="require('@/assets/image.png').default" alt />
    <img :src="require('@/assets/test.svg').default" alt="">
    <svg aria-hidden="true">
      <use :href="require('@/assets/test.svg').default"></use>
    </svg>
  </div>
</template>

<script>
// import image from "./assets/image.png";
// import('./assets/image.png').then(res => {
//   console.log(res, 'zheshi image2a ')
//   console.log(res.default)
// })
// console.log(image)
export default {
  data() {
    return {
      msg: "hah这是数据吗",
      image:require('./assets/image.png').default
      // image: image
    }
  }
}
</script>

<style scoped>
.success {
  color: red;
  /* css会自动解 default */
  background:url('~@assets/image.png'); 
}
</style>