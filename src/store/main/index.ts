import { defineStore } from 'pinia';

import type { IMainState } from './types';

export const useMainStore = defineStore('main', {
    state: (): IMainState => {
        return {
            name: 'main',
        };
    },
});
