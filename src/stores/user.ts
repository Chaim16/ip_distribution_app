import { reactive } from 'vue'

interface UserInfo {
	username: string
	role?: string
}

interface UserState {
	token: string
	refresh: string
	userInfo: UserInfo | null
}

const state = reactive<UserState>({
	token: uni.getStorageSync('token') || '',
	refresh: uni.getStorageSync('refresh') || '',
	userInfo: uni.getStorageSync('userInfo') || null
})

const userStore = {
	state,
	
	// 设置token
	setToken(token: string) {
		state.token = token
		uni.setStorageSync('token', token)
	},

	setRefreshToken(refresh: string) {
		state.refresh = refresh
		uni.setStorageSync('refresh', refresh)
	},
	
	// 设置用户信息
	setUserInfo(userInfo: UserInfo) {
		state.userInfo = userInfo
		uni.setStorageSync('userInfo', userInfo)
	},
	
	// 清除用户信息
	clearUserInfo() {
		state.token = ''
		state.refresh = ''
		state.userInfo = null
		uni.removeStorageSync('token')
		uni.removeStorageSync('refresh')
		uni.removeStorageSync('userInfo')
	},
	
	// 获取用户信息
	getUserInfo() {
		return state.userInfo
	},
	
	// 获取token
	getToken() {
		return state.token
	}
}

export const useUserStore = () => userStore 