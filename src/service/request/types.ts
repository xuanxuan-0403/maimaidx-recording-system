import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// * 定义拦截器类型
export interface XRRequestInterceptors<T = AxiosResponse> {
    // 请求的拦截器
    // requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptor?: (config: any) => any;
    requestInterceptorCatch?: (error: any) => any;
    // 响应的拦截器
    responseInterceptor?: (res: T) => T;
    responseInterceptorCatch?: (error: any) => any;
}

// 拦截器接口继承自应该传入的配置(AxiosRequestConfig)
// * XRRequestConfig: 整合了上面定义拦截器和原来axios配置的类型
export interface XRRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    // 向当于对 AxiosRequestConfig 做了扩展
    interceptors?: XRRequestInterceptors<T>;
    showLoading?: boolean;
}
