export interface IData {
    additional_rating: number;
    charts: {};
    nickname: string;
    plate: string;
    rating: number;
    user_general_data: any;
    username: string;
}

export interface IdivingPlayer {
    config: any;
    data: IData;
    headers: any;
    request: any;
    status: number;
    statusText: string;
}
