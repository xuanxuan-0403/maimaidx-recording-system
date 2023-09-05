<template>
    <div class="main">
        <header class="header"></header>
        <article class="center"></article>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {};
    },
});
</script>

<style scoped lang="less">
.main {
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url(../../assets/images/UI_TTR_BG_Base_Plus.png) no-repeat 0 center / 430%;

    .header {
        margin-top: 20%;
        width: 90%;
        height: 30%;
        background: url(../../assets/images/UI_UPE_OsasoiBoard_Base.png) no-repeat 0 center / 100%;
    }

    .center {
        width: 85vw;
        height: 85vw;
        background: url(../../assets/images/kuang.png) no-repeat center center / 100%;
    }
}
</style>
