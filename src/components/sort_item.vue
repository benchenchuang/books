<template>
  <div>
      <div class="sort_item" v-for="(item,index) in data" :key="index">
          <router-link :to="{name:'Content',params:{id:item.id}}">
            <div class="item_img"><img :src="item.image_hlarge"></div>
                <div class="item_content">
                <p class="label">{{item.category_name}}</p>
                <h2 class="title">{{item.title}}</h2>
                <div class="desc">
                    <p class="list"><span>时间：</span>{{item.time_str}}</p>
                    <p class="list"><span>地点：</span>{{item.address}}</p>
                    <p class="list"><span>费用：</span>{{item.price_range}}</p>
                </div>
            </div>
          </router-link>
          
      </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props:['data']
}
Vue.filter('Formatdate', function (value) {
    var show_day=new Array('周日','周一','周二','周三','周四','周五','周六'); 
    var time = new Date(value);
    return time.getFullYear()+'.'+(time.getMonth()+1)+'.'+time.getDate()+' '+show_day[time.getDay()];
});
</script>
<style scoped>
.sort_item{
    padding: 20px;
    overflow: hidden;
    border-bottom: 1px solid #e4e4e4;
}
.item_img{
    float: left;
    width: 35%;
    height: 40vw;
}
.item_content{
    margin-left: 35%;
    padding-left: 15px;
    box-sizing: border-box;
}
.item_content .label{
    font-size: 12px;
    color: #999;
}
.item_content .title{
    margin: 5px 0 15px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.desc .list{
    font-size: 13px;
    color: #666;
}
.list span{
    font-weight: 700;
}
</style>


