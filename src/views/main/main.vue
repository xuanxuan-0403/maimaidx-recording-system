<template>
    <div class="main">
        <header class="header">
            <h1 class="nickname">{{ nickname }}</h1>
            <h2 class="rating">{{ rating }}</h2>
        </header>
        <article :class="{ center: true, active: isStataRecord }" @click="btnClick">
            <p class="text">点击开始录制</p>
            <p class="time">{{ recordText }}</p>
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

        // 全局监听其他用户是否在录制
        let publicRecordActiveTimer = setInterval(() => {
            obs.call('GetRecordStatus').then((res) => {
                recordText.value = res.outputTimecode;
                if (res.outputActive) {
                    isStataRecord.value = true;
                } else {
                    isStataRecord.value = false;
                }
            });
        }, 1000);

        const btnClick = () => {
            if (!isStataRecord.value) {
                isStataRecord.value = true;
                obs.call('StartRecord');
            } else {
                isStataRecord.value = false;
                obs.call('StopRecord').then((res) => {
                    console.log('停止录制');
                });
                obs.call('GetRecordStatus').then((res) => {
                    console.log(res);
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
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url(../../assets/images/penson.png) center 30% / 120% no-repeat,
        url('../../assets/images/main-bgc.png') no-repeat 0 center / 130%;

    .header {
        margin-top: 5%;
        width: 90%;
        height: 50%;
    }

    .center {
        display: flex;
        flex-direction: column;
        width: 65vw;
        height: 65vw;
        background: url('../../assets/images/btn.png') no-repeat center center / 100%;
        align-items: center;
        justify-content: center;
        transition: all 0.5s;
        p {
            font-weight: bold;
            font-size: 1.4em;
            margin: 0;
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
