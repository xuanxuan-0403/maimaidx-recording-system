import { IData } from '@/service/login/types';

export interface ILoginState {
    name: string;
    username: string;
    userIP: string;
    data: IData;
}
