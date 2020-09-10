<template>
  <div class="container-fluid form-wrapper">
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.form-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/background.jpg");
}
.router-view {
}
</style>
