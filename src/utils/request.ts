import { useUserStore } from '@/stores/user'

// 创建请求实例
const request = uni.request

// 基础URL
const BASE_URL = 'http://localhost:8000'


// 请求拦截器
const requestInterceptor = {
	invoke(options: UniApp.RequestOptions) {
		// 获取token
		const userStore = useUserStore()
		const token = userStore.getToken()
		
		// 检查是否需要添加token
		const url = options.url || ''

		// 添加token到请求头
        options.header = {
            ...options.header,
            'Authorization': `Bearer ${token}`
        }

        console.log(options.header);
        

        console.log(1111111);
        
		// 确保URL只包含一次基础URL
		if (!url.startsWith('http')) {
			options.url = `${BASE_URL}/${url.replace(/^\/+/, '')}`
		}
		
		return options
	}
}

// 响应拦截器
const responseInterceptor = {
	success(res: UniApp.RequestSuccessCallbackResult) {
		// 处理响应数据
		if (res.statusCode === 200) {
			return res.data
		} else if (res.statusCode === 401) {
			// token过期，跳转到登录页
			const userStore = useUserStore()
			userStore.clearUserInfo()
			uni.navigateTo({
				url: '/pages/login/login'
			})
			return Promise.reject(new Error('登录已过期'))
		} else {
			const errorMessage = typeof res.data === 'object' ? (res.data as any).message : '请求失败'
			return Promise.reject(new Error(errorMessage))
		}
	},
	fail(err: UniApp.GeneralCallbackResult) {
		return Promise.reject(err)
	}
}

// 注册拦截器
uni.addInterceptor('request', requestInterceptor)
uni.addInterceptor('response', responseInterceptor)

export default request 