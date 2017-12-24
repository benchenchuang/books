import Vue from 'vue';
import axios from 'axios';
const api='https://api.douban.com/v2'
//获取城市列表
export const getCitys=(params)=>{return axios.get(`${api}/loc/list`,{params:params}).then(res=>res.data)};
//获取城市活动
export const getActives=(params)=>{return axios.get(`${api}/event/list`,{params:params}).then(res=>res.data)}
//获取活动详情
export const getContent=(id,params)=>{return axios.get(`${api}/event/${id}`,{params:params}).then(res=>res.data)};
//获取活动参加的用户
export const getActiveJoin=(id,params)=>{return axios.get(`${api}/event/${id}/participants`,{params:params}).then(res=>res.data)};
//获取活动感兴趣的用户
export const getActiveWishers=(id,params)=>{return axios.get(`${api}/event/${id}/wishers`,{params:params}).then(res=>res.data)};
//获取用户创建的活动
export const getUserCreate=(id,params)=>{return axios.get(`${api}/event/user_created/${id}`,{params:params}).then(res=>res.data)}
//获取用户参加的活动
export const getUserJoin=(id,params)=>{return axios.get(`${api}/event/user_participated/${id}`,{params:params}).then(res=>res.data)}
//获取用户感兴趣的活动
export const getUserWished=(id,params)=>{return axios.get(`${api}/event/user_wished/${id}`,{params:params}).then(res=>res.data)}