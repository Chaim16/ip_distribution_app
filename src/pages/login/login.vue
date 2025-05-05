<template>
	<view class="login-container">
		<view class="welcome-text">欢迎来到企业网络IP地址管理系统</view>
		<view class="login-box">
			<view class="login-title">用户登录</view>
			<view class="form">
				<view class="input-group">
					<input type="text" v-model="username" placeholder="请输入用户名" />
				</view>
				<view class="input-group">
					<input type="password" v-model="password" placeholder="请输入密码" />
				</view>
				<button class="login-btn" @click="handleLogin">立即登录</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login, whoami } from '@/api/user'
import { useUserStore } from '@/stores/user'

const username = ref('')
const password = ref('')
const userStore = useUserStore()

const handleLogin = async () => {
	if (!username.value || !password.value) {
		uni.showToast({
			title: '请输入用户名和密码',
			icon: 'none'
		})
		return
	}
	
	try {
		uni.showLoading({
			title: '登录中...'
		})
		
		// 调用登录接口
		const res = await login({
			username: username.value,
			password: password.value
		})
		console.log('登录响应:', res)
		
		// 保存token
		userStore.setToken(res.data.access)
		userStore.setRefreshToken(res.data.refresh)
		
		// 获取用户信息
		const userInfoRes = await whoami()
		console.log('用户信息响应:', userInfoRes.data.data)
		userStore.setUserInfo(userInfoRes.data.data)
		
		uni.hideLoading()
		uni.showToast({
			title: '登录成功',
			icon: 'success'
		})
		
		// 登录成功后跳转到首页
		uni.reLaunch({
			url: '/pages/index/index'
		})
	} catch (error: any) {
		uni.hideLoading()
		uni.showToast({
			title: error.message || '登录失败',
			icon: 'none'
		})
	}
}
</script>

<style lang="scss">
.login-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f5f5f5;
	padding: 40rpx;
	
	.welcome-text {
		font-size: 42rpx;
		font-weight: bold;
		color: #333;
		margin: 60rpx 0;
		text-align: center;
	}
	
	.login-box {
		width: 100%;
		max-width: 700rpx;
		padding: 60rpx 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		
		.login-title {
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 60rpx;
			color: #333;
		}
		
		.form {
			.input-group {
				margin-bottom: 40rpx;
				
				input {
					width: 90%;
					height: 100rpx;
					padding: 0 40rpx;
					border: 2rpx solid #eee;
					border-radius: 50rpx;
					font-size: 32rpx;
					background-color: #f9f9f9;
					
					&:focus {
						border-color: #007AFF;
					}
				}
			}
			
			.login-btn {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				background-color: #007AFF;
				color: #fff;
				font-size: 36rpx;
				border-radius: 50rpx;
				margin-top: 40rpx;
				
				&:active {
					opacity: 0.8;
				}
			}
			
			.register-tip {
				text-align: center;
				margin-top: 40rpx;
				font-size: 28rpx;
				color: #666;
				
				.register-link {
					color: #007AFF;
					margin-left: 10rpx;
				}
			}
		}
	}
}
</style> 