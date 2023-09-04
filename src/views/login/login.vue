<template>
    <div class="login">
        <img class="img-trans" src="../../assets/video/GB/GB0.png" alt="" ref="imgRef" />
        <article class="container" ref="containerRef">
            <div class="logo">
                <img src="../../assets/images/logo.png" alt="" />
                <!-- <h2>内录系统</h2> -->
            </div>
            <div class="btns">
                <button class="login-btn" @click="handleLoginBtn">登录</button>
            </div>
        </article>
        <div
            class="footer"
            @click="
                containerRef!.style.transform = 'translateY(0)';
                loginBoxIsShow = false;
            "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 480 50"
                preserveAspectRatio="none"
                style="height: 50px"
            >
                <path
                    d="M0,0 v25 q5,5 10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 v-25 Z"
                    fill="#7cbc29"
                ></path>
            </svg>
            <div class="img"></div>
        </div>
        <Transition name="loginBox">
            <div class="login-box" v-if="loginBoxIsShow">
                <h2>请输入查分器账号密码，及机厅IP</h2>
                <h2><input type="text" placeholder="查分器账号" v-model="username" /></h2>
                <h2><input type="text" placeholder="机厅IP" v-model="userIP" /></h2>
                <img src="../../assets/images/chara_01.png" alt="" @click="handleLogin" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getDivingPlayerRequest } from '@/service/login';
import { useRootStore } from '@/store/index';
import { obsConnect } from '@/utils/obs-websocket';
import { validateIPAddress } from '@/utils/verifyIP';

const login = useRootStore().login;

export default defineComponent({
    setup() {
        const containerRef = ref<HTMLElement>();
        const loginBtnRef = ref<HTMLElement>();
        const signInBtnRef = ref<HTMLElement>();
        const loginBoxIsShow = ref(false);
        const videoRef = ref<HTMLVideoElement>();
        const imgRef = ref<HTMLImageElement>();

        function transImg() {
            let imgNumber = 0;
            const time = setInterval(() => {
                console.log(111);
                if (imgNumber !== 48) {
                    imgNumber++;
                    imgRef.value!.src = require(`../../assets/video/GB/GB${imgNumber}.png`);
                } else {
                    clearInterval(time);
                }
            }, 40);
        }

        const username = ref<string>();
        const userIP = ref<string>();

        const handleLoginBtn = () => {
            containerRef.value!.style.transform = 'translateY(-45%)';
            loginBoxIsShow.value = true;
        };

        const handleLogin = async () => {
            if (username && userIP) {
                const data = await getDivingPlayerRequest(username.value!);
                console.log(data.data);
                login.data = data.data;
                login.username = username.value!;
                login.userIP = userIP.value!;
                const res = validateIPAddress(userIP.value!);
                // obsConnect(userIP.value!, 'xyx316516').then((res) => {
                //     console.log(res);
                // });
                if (res) {
                    imgRef.value!.style.display = 'block';
                    transImg();
                    // setTimeout(() => {
                    //     router.push('/main');
                    // }, 1000);
                }
            }
        };
        return {
            username,
            userIP,
            containerRef,
            loginBtnRef,
            signInBtnRef,
            videoRef,
            loginBoxIsShow,
            handleLoginBtn,
            handleLogin,
            imgRef,
        };
    },
});
</script>

<style scoped lang="less">
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #51bcf3;
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        transition: all 0.5s;
        align-items: center;
        height: fit-content;
        transform: translateY();
        .logo {
            position: relative;
            width: 100%;
            img {
                width: 100%;
            }
            h2 {
                position: absolute;
                color: #fff;
                font-weight: bold;
                font-size: 18px;
                bottom: 5%;
                right: 10%;
            }
        }

        .btns {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 30%;
            padding: 2.5% 14% 7%;
            justify-content: space-between;
            align-items: center;

            button {
                color: #fff;
                font-weight: bold;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                background: url('../../assets/images/button.png') no-repeat center center / 100%;
                padding: 5%;
            }
        }
    }
    .footer {
        position: fixed;
        width: 100%;
        height: 35%;
        bottom: 0;
        left: 0;
        background-color: #55ab37;
        .img {
            width: 100%;
            position: absolute;
            height: 47px;
            top: -10%;
            background: url(../../assets/images/back_area_dx.png) repeat-x;
            background-size: 480px auto;
            animation: marquee 30s linear infinite;
        }
    }

    .login-box {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        height: 30%;
        background-color: #fff;
        box-shadow: 0 0 0 2px #ff6a6a, 0 0 0 6px #fff, 1px 8px 8px rgba(0, 0, 0, 0.2),
            0 12px rgba(0, 0, 0, 0.2);
        border-radius: 10px;

        h2 {
            display: flex;
            font-weight: bold;
            font-size: 14px;
            text-align: center;
            margin: 3% 5%;
            justify-content: center;
            font-weight: lighter;
            height: 35px;
            line-height: 30px;
            background: url(../../assets/images/line_01.png) no-repeat 0 bottom / 100%;
            input {
                width: 80%;
                height: 87%;
                border: 0;
                text-align: center;
                &:focus {
                    outline: none;
                }
            }
        }
        img {
            position: absolute;
            bottom: -30%;
            left: -7%;
        }
    }

    .img-trans {
        display: none;
        height: 100%;
        position: absolute;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

@keyframes marquee {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -480px 0;
    }
}

.loginBox-enter-active,
.loginBox-leave-active {
    transition: opacity 0.5s ease;
    transition-delay: 0.2s;
}

.loginBox-enter-from,
.loginBox-leave-to {
    opacity: 0;
}
</style>
