import axios from 'axios';

import { divingPlayer } from '../api';
import { IData } from './types';

// 接入查分器
export function getDivingPlayerRequest(username: string) {
    return axios.post<IData>(divingPlayer, { username, b50: true });
}
