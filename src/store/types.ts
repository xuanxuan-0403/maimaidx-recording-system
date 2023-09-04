import { Store } from 'pinia';

import type { ILoginState } from './login/types';
import type { IMainState } from './main/types';

export interface IRootState {
    name: string;
    login: Store<'login', ILoginState, {}, {}>;
    main: Store<'main', IMainState, {}, {}>;
}
