import request from '@/utils/request'

// 登录接口
export const login = (data: { username: string; password: string }) => {
	return request({
		url: 'api/token/',
		method: 'POST',
		data
	})
}

// 获取用户信息
export const whoami = () => {
	return request({
		url: 'distribution/api/v1/user/whoami/',
		method: 'GET'
	})
} 