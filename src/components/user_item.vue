<template>
  <div class="city_actives" v-if="data.total>0">
        <div class="active_head">
            <span class="active_more">
                全部 {{data.total}}
                <!-- <span style="font-size:20px;">&#155</span> -->
            </span>
            <h2>{{title}}</h2>
        </div>
        <swiper class="active_item" :options="swiperOptionTap">
            <swiper-slide v-for="item in data.events" :key="item.id">
                <router-link :to="{name:'Content',params:{id:item.id}}">
                    <img class="item_pic" :src="item.image_hlarge">
                    <p class="item_title">{{item.title}}</p>
                    <p class="item_date">{{item.time_str}}</p>
                </router-link>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props:['data','title'],
    data(){
        return{
            swiperOptionTap: {
                slidesPerView: 2.95,
                spaceBetween: 15,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    }
}
Vue.filter('Formatdate', function (value) {
    var time = new Date(value);
    return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
});

Vue.filter('Hundred',(value)=>{
    return value>99?'99+':value;
})
</script>
<style>
.active_head{
    padding: 0 20px;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
}
.active_item {
    padding:0 20px 10px;
}
.active_more{
    float: right;
    font-size: 13px;
    color: #999;
}
.item_pic{
    width: 100%;
    height: 32vw;
}
.item_title{
    margin-top: 6px;
    width: 100%;
    font-size: 13px;
    color: #333;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.item_date{
    margin-top: 2px;
    font-size: 12px;
    color: #999;
}
.item_more{
    position: relative;
    width: 100%;
    height: 32vw;
    background: #eee;
    text-align: center;
}
.more_txt{
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    font-size: 13px;
    color: #999;
}
.more_txt span{
    padding-bottom: 2px;
    border-bottom: 1px solid #ccc;
}
</style>


