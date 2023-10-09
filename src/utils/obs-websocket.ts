import OBSWebSocket from 'obs-websocket-js';

export const obs = new OBSWebSocket();

export function obsConnect(ip: string, password: string) {
    return new Promise((resolve, reject) => {
        obs.connect(`ws://${ip}:4455`, password)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
}

// 断开链接
// setTimeout(() => {
//     obs.disconnect()
// }, 3000);

// setTimeout(() => {
//     // 开始录制
//     obs.call('StartRecord')
//         .then((res) => {
//             console.log(1);
//         })
//         .catch((err) => {
//             console.log('error');
//         });
// }, 2000);
