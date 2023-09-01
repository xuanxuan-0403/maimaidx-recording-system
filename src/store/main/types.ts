import { IData } from '@/service/main/types';

export interface IMainState {
    name: string;
    username: string;
    userIP: string;
    data: IData;
}
