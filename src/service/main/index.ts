// import xrRequest from '../';
import axios from 'axios';

import { divingPlayer } from '../api';

// 接入查分器
export function getDivingPlayerRequest(username: string) {
    return axios.post(divingPlayer, { username, b50: true });
}
