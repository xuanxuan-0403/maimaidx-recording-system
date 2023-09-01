import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { XRRequestInterceptors, XRRequestConfig } from './types';

import { ElLoading } from 'element-plus';
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

const DEFAULT_LOADING = true; // 设置 DEFAULT_LOADING 的默认值

class XRRequest {
    #instance: AxiosInstance; // axios实例
    #interceptors?: XRRequestInterceptors; // 拦截器对象
    #showLoading: boolean; // 这边是必选的，如果没有传，默认是true
    #loading?: ILoadingInstance;

    constructor(config: XRRequestConfig) {
        this.#instance = axios.create(config);
        // 开发者可以选择不添加showLoading属性，如果没有添加，则默认是true
        this.#showLoading = config.showLoading ?? DEFAULT_LOADING;
        this.#interceptors = config.interceptors as XRRequestInterceptors;

        // * 所有实例都有的拦截器
        // 挂载请求拦截器
        this.#instance.interceptors.request.use(
            this.#interceptors?.requestInterceptor,
            this.#interceptors?.requestInterceptorCatch,
        );
        // 挂载响应拦截器
        this.#instance.interceptors.response.use(
            this.#interceptors?.responseInterceptor,
            this.#interceptors?.responseInterceptorCatch,
        );

        // 添加所有的实例都有拦截器
        this.#instance.interceptors.request.use(
            (config) => {
                // 根据 showLoading 要不要显示 loading
                if (this.#showLoading) {
                    // 在响应前添加加载动画
                    this.#loading = ElLoading.service({
                        lock: true,
                        text: '等等等等, 快出来了....',
                        background: 'rgba(255, 255, 255, .5)',
                    });
                }

                // console.log(config);
                return config;
            },
            (err) => {
                return err;
            },
        );
        this.#instance.interceptors.response.use(
            (res) => {
                // 等待请求完成移除loading
                this.#loading?.close();
                // setTimeout(() => {
                //     this.#loading?.close();
                // }, 2000);

                // 请求失败情况2: 状态码可能是200，但是返回的数据可能为空
                const data = res.data;
                if (data.returnCode === '-1001') {
                    console.log('请求失败');
                } else {
                    return res.data;
                }
            },
            (err) => {
                console.log('所有的实例都有的拦截器, 响应失败');
                // 请求失败情况1: 判断不同的httpErrorCode显示不同的错误信息
                if (err.response.state === 404) {
                    console.log('404的错误');
                }
                return err;
            },
        );
        // * 所有实例都有的拦截器
    }

    // * 单独的拦截器，使用者可以自行添加
    // ?
    request<T = any>(config: XRRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            // 单个请求对请求config的处理
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config);
            }

            // 如果showLoading为false做的操作，判断是否需要显示loading
            if (config.showLoading === false) {
                this.#showLoading = false;
            }

            this.#instance
                .request<any, T>(config)
                .then((res) => {
                    // 单个请求对数据的处理
                    if (config.interceptors?.requestInterceptor) {
                        res = config.interceptors.requestInterceptor(res);
                    }
                    // console.log(res);

                    // 将showLoading设置true，这样不会影响下一个请求
                    this.#showLoading = DEFAULT_LOADING;

                    // 将结果resolve返回出去
                    resolve(res);
                })
                .catch((err) => {
                    // 将showLoading设置true，这样不会影响下一个请求
                    this.#showLoading = DEFAULT_LOADING;
                    reject(err);
                    return err;
                });
        });
    }

    get<T = any>(config: XRRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' });
    }

    post<T = any>(config: XRRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' });
    }

    delete<T = any>(config: XRRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' });
    }

    patch<T = any>(config: XRRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' });
    }
}

export default XRRequest;
