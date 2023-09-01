import { defineStore } from 'pinia';
import type { IRootState } from './types';

import { useMainStore } from './main/index';

export const useRootStore = defineStore('root', {
    state: (): IRootState => {
        return {
            name: 'root',
            main: useMainStore(),
        };
    },
});
