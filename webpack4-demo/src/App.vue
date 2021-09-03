<template>
  <div>

    <div class="success">我成功了吗</div>
    <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        msg:"hah这是数据吗"
      }
    }
}
</script>

<style scoped>
  .success{
    color: red;
  }

</style>