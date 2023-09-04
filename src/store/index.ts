import { defineStore } from 'pinia';
import type { IRootState } from './types';

import { useLoginStore } from './login/index';
import { useMainStore } from './main/index';

export const useRootStore = defineStore('root', {
    state: (): IRootState => {
        return {
            name: 'root',
            login: useLoginStore(),
            main: useMainStore(),
        };
    },
});
