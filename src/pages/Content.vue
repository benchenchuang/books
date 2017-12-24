<template>
  <div>
      <div class="content_head">
          <img :src="content.image_hlarge">
      </div>

      <div class="content_title">
         <h2 class="title">{{content.title}}</h2>
         <p class="count">{{content.wisher_count || 0}}人感兴趣/{{content.participant_count || 0}}人参加</p>
      </div>
      <swiper class="active_item" :options="swiperOptionTap">
          <swiper-slide v-for="item in swiers" :key="item.id">
              <router-link :to="{name:'UserActive',params:{id:item.id}}">
                <img class="item_pic" :src="item.avatar">
                <p class="item_title">感兴趣</p>
              </router-link>
          </swiper-slide>

          <swiper-slide v-for="item in join_user" :key="item.id">
            <router-link :to="{name:'UserActive',params:{id:item.id}}">
              <img class="item_pic" :src="item.avatar">
              <p class="item_title">想参加</p>
            </router-link>
          </swiper-slide>
      </swiper>
      <div class="content_controls">
        <a href="javascript:void(0);" @click="getTip('暂未开放登录接口')">感兴趣</a>
        <a href="javascript:void(0);" @click="getTip('暂未开放登录接口')">想参加</a>
        <!-- <router-link :to="{name:'JoinUsers',params:{id:content.id}}">感兴趣用户</router-link> -->
      </div>

      <div class="active_info">
          <div class="info_item"><span class="name">活动时间</span><span class="desc">{{content.time_str}}</span></div>
          <div class="info_item"><span class="name">活动地点</span><span class="inte_more">&#155</span><span class="desc">{{content.address}}</span></div>
          <div class="info_item"><span class="name">售票价格</span><span class="inte_more">&#155</span><span class="desc red">{{content.fee_str}}</span></div>
          <div class="info_item"><span class="name">客服热线</span><a href="tel:10086"><span class="inte_more">&#155</span><span class="desc">10086</span></a></div>
      </div> 

      <div class="detail_block">
        <h3 class="title">活动详情</h3>
        <div class="detail_desc" :style="half_height" v-html="content.content"></div>
        <a class="detail_more red" @click='showContent' v-if="half_height.height" href="javascript:void(0);">查看更多</a>
      </div>
      <div class="tip" v-if="tip"><p>{{tip}}</p></div>
  </div>
</template>
<script>
require('../assets/jquery-2.1.1.min.js');
import * as api from '../api/index'
export default {
  data(){
    return{
      tip:'',
      content:[],
      join_user:[],
      swiers:[],
      half_height:{height:'',overflow:'hidden'},
      swiperOptionTap: {
          slidesPerView: 6,
          spaceBetween: 10,
          freeMode: true,
          pagination: {
              el: '.swiper-pagination',
              clickable: true
          }
      }
    }
  },
  created(){
    var thisId=this.$route.params.id;
    this.getContent(thisId);
    this.getJoinUser(thisId);
    this.getActiveWishers(thisId);
    setTimeout(()=>{
      this.half_height.height=$('.detail_desc').height()/2+'px' || '80px';
    },300)
  },
  methods:{
    getTip(msg){
      this.tip=msg;
      setTimeout(()=>{
        this.tip="";
      },1500)
    },
    showContent(){
      this.half_height.height='';
    },
    getContent(id){
      api.getContent(id).then(res=>{
        this.content=res;
      })
    },
    getJoinUser(id){
      api.getActiveJoin(id).then(res=>{
        this.join_user=res.users;
      })
    },
    getActiveWishers(id){
      api.getActiveWishers(id).then(res=>{
        this.swiers=res.users
      })
    }
  }
}
</script>
<style scoped>
@import '../assets/swiper.min.css';
  .tip{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 40%;
    text-align: center;
    padding: 20px 10px;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.6);
    border-radius: 6px;
  }
  .tip p{
    font-size: 14px;
    color: #fff;
  }
  .content_head{
    padding: 20px 0;
    text-align: center;
    background: #eee;
  }
  .content_head img{
    width: 50%;
    margin: 0 auto;
  }
  .content_title{
    margin: 15px 0;
    padding: 0 20px;
    font-size: 12px;
    color: #999;
  }
  .content_title .title{
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }
  .content_controls{
    display: flex;
    display:-webkit-box;
    display:-webkit-flex;
  }
  .content_controls a{
    flex: 1;
    margin: 0 20px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #faa114;
    border:1px solid #faa114;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .active_info{
    padding: 20px;
  }
  .active_info .info_item{
    padding: 15px 0;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    color:#999;
    border-bottom: 1px solid #e4e4e4;
  }
  .info_item .name{
    float: left;
    color: #333;
  }
  .info_item .desc{
    display: block;
    margin:0 10px 0 80px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info_item a span{
    color: #999;
  }
  .inte_more{
    float: right;
    font-size: 20px;
    margin-top: -2px;
  }
  .detail_block{
    padding:0 20px 20px;
  }
  .detail_block .title{
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
  }
  .detail_desc{
    font-size: 13px;
    color: #333;
  }
  .detail_more{
    display: block;
    text-align: right;
    margin: 10px 0;
  }
  .red{
    color: #FF2D2D;
  }
  .active_item{
    padding:0 20px 20px;
  }
  .active_item .item_title{
    line-height: 2;
    font-size: 12px;
    color: #999;
    text-align: center;
  }
  .item_pic{
    height: auto;
  }

</style>


