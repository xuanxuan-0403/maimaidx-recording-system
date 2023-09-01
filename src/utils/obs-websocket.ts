import OBSWebSocket from 'obs-websocket-js';

const obs = new OBSWebSocket();

obs.connect('ws://127.0.0.1:4455', 'xyx316516')
    .then((res) => {
        console.log('obs 链接成功!', res);
    })
    .catch((err) => {
        console.log(err);
    });

// 断开链接
// setTimeout(() => {
//     obs.disconnect()
// }, 3000);

setTimeout(() => {
    // 开始录制
    obs.call('StartRecord')
        .then((res) => {
            console.log(1);
        })
        .catch((err) => {
            console.log('error');
        });
}, 2000);
