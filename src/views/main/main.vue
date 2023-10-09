<template>
    <div class="main">
        <header class="header">
            <h1 class="nickname">{{ nickname }}</h1>
            <h2 class="rating">{{ rating }}</h2>
        </header>
        <article :class="{ center: true, active: isStataRecord }" @click="btnClick">
            <p class="text">{{ recordText }}</p>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRootStore } from '@/store/index';
import { obs } from '@/utils/obs-websocket';
const login = useRootStore().login;

export default defineComponent({
    setup() {
        const nickname = ref<string>(login.data.nickname);
        const rating = ref<number>(login.data.rating);

        const isStataRecord = ref<Boolean>(false);
        const recordText = ref<string>('点击开始录制');
        const btnClick = () => {
            if (!isStataRecord.value) {
                isStataRecord.value = true;
                obs.call('StartRecord').then((res) => {
                    console.log('开始录制');
                    recordText.value = '录制中';
                });
            } else {
                isStataRecord.value = false;
                obs.call('StopRecord').then((res) => {
                    console.log('停止录制');
                    recordText.value = '停止录制...';
                });
            }
        };
        return {
            nickname,
            rating,
            isStataRecord,
            recordText,
            btnClick,
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
    background: url(../../assets/images/penson.png) center 30% / 120% no-repeat,
        url('../../assets/images/main-bgc.png') no-repeat 0 center / 120%;

    .header {
        margin-top: 5%;
        width: 90%;
        height: 50%;
    }

    .center {
        display: flex;
        width: 65vw;
        height: 65vw;
        background: url('../../assets/images/btn.png') no-repeat center center / 100%;
        align-items: center;
        justify-content: center;
        transition: all 0.5s;
        p {
            font-weight: bold;
            font-size: 1.4em;
        }
    }
}

.active {
    animation: btnscale 2s forwards infinite;
}

@keyframes btnscale {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}
</style>
