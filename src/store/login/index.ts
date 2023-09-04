import { defineStore } from 'pinia';

import type { ILoginState } from './types';

export const useLoginStore = defineStore('login', {
    state: (): ILoginState => {
        return {
            name: 'login',
            username: '',
            userIP: '127.0.0.1',
            data: {
                additional_rating: 1,
                charts: [],
                nickname: 'TCPL',
                plate: '10',
                rating: 16000,
                user_general_data: [],
                username: 'TCPL',
            },
        };
    },
});
