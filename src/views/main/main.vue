<template>
    <div class="main">
        <header class="header">
            <h1 class="nickname">{{ nickname }}</h1>
            <h2 class="rating">{{ rating }}</h2>
        </header>
        <article class="center">
            <p class="text">点击开始录制</p>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LocalCache from '@/utils/cache';
import { useRootStore } from '@/store/index';
const login = useRootStore().login;

export default defineComponent({
    setup() {
        const nickname = ref<string>(login.data.nickname);
        const rating = ref<number>(login.data.rating);
        return {
            nickname,
            rating,
        };
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
    background: url('../../assets/images/main-bgc.png') no-repeat 0 center / 120%;

    .header {
        margin-top: 5%;
        width: 90%;
        height: 30%;
        // background: #f00;
    }

    .center {
        width: 65vw;
        height: 65vw;
        background: url('../../assets/images/btn.png') no-repeat center center / 100%;
        p {
        }
    }
}
</style>
