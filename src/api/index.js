import Vue from 'vue';
import axios from 'axios';
//获取城市列表
export const getCitys=()=>{return axios.get('/api/loc/list').then(res=>res.data)};
//获取城市活动
export const getActives=(params)=>{return axios.get('/api/event/list',{params:params}).then(res=>res.data)}