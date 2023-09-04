<template>
    <div class="audio">
        <audio autoplay loop :src="music" ref="audio" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    setup() {
        const music = require('../../assets/audio/login_BGM.mp3');
        const audioRef = ref<HTMLAudioElement>();

        onMounted(() => {
            setTimeout(() => {
                audioRef.value?.play();
            }, 2000);
        });
        return {
            music,
            audioRef,
        };
    },
});
</script>

<style scoped></style>
