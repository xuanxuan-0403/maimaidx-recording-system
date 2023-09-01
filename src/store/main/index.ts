import { defineStore } from 'pinia';

import type { IMainState } from './types';

export const useMainStore = defineStore('main', {
    state: (): IMainState => {
        return {
            name: 'main',
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
