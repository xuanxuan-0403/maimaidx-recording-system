import { Store } from 'pinia';

import type { IMainState } from './main/types';

export interface IRootState {
    name: string;
    main: Store<'main', IMainState, {}, {}>;
}
