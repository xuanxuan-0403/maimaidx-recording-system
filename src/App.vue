<template>
    <div class="app">
        <router-view></router-view>
        <button class="setting"></button>
    </div>
</template>

<style scoped lang="less">
.app {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .setting {
        width: 8vw;
        height: 11vw;
        position: absolute;
        top: 3%;
        right: 5%;
        background: url(./assets/images/setting.png) no-repeat 0 0 /100%;
        z-index: 99;
    }
}
</style>
