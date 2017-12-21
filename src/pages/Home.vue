<template>
  <div class="hello">
    <swiper class="swiper-container" id="topNav" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(tab,index) in tabs" :class="{active:thisIndex==index}" :data-id="tab.id" :key="tab.name"><span>{{tab.name}}</span></swiper-slide>
    </swiper>
<!-- Swiper -->
    <swiper class="swiper-container gallery-top" :options="slideSwiper" ref="mySlide">
        <swiper-slide>
            <home-item :data="music" :title="'音乐剧'"></home-item>
        </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import * as api from '../api/index'
import Vue from 'vue'
import HomeItem from '../components/home_item'
export default {
  name: 'hello',
  components:{
      HomeItem
  },
  data () {
    return {
      thisIndex:0,
      tabs:[],
      music:[],
      drama:[],
      exhibition:[],
      salon:[],
      swiperOption: {
          freeMode: true,
          slidesPerView: 'auto',
          onTap: mySwiper => {
            this.thisIndex=mySwiper.clickedIndex
            this.slideShow(mySwiper.clickedIndex,'active');
            // this.slide.slideTo(mySwiper.clickedIndex, 1000, false)
            // this.swiperTab.slideTo(mySwiper.clickedIndex, 1000, false)
          }
        },
      slideSwiper:{
        speed:500,
        freeMode: false,
        onSlideChangeStart: mySwiper => {
          this.thisIndex=mySwiper.realIndex
            this.slideShow(mySwiper.realIndex,'active');
            // this.swiperTab.slideTo(mySwiper.realIndex, 1000, false)
        }
      },
      
    }
  },
  mounted(){
      this.getCitys()
      var timer=setInterval(()=>{
        var tab=this.tabs.length;
        if(tab){
            var firstId=this.tabs[0].id;
            this.getItems(firstId,'music').then(res=>{
                this.music=res;
            })
            clearInterval(timer);
        }
      },100)
  },
  computed: {
      swiperTab() {
        return this.$refs.mySwiper.swiper
      },
      slide(){
        return this.$refs.mySlide.swiper
      }
    },
  methods:{
      getCitys(){
          api.getCitys().then(res=>{
              this.tabs=res.locs;
          })
      },
      getActives(){
          
      },
      getItems(id,type){
          return api.getActives({loc:id,day_type:'week',type:type,count:9}).then(res=>res)
      },
      slideShow(tabIndex,active){
        var selfTab=this.swiperTab;
        var swiperWidth = selfTab.container[0].clientWidth 
        var maxTranslate = selfTab.maxTranslate(); 
        var maxWidth = -maxTranslate + swiperWidth / 2 
        var slideLeft = selfTab.slides[tabIndex].offsetLeft
        var slideWidth = selfTab.slides[tabIndex].clientWidth
        var slideCenter = slideLeft + slideWidth / 2
        this.slide.slideTo(tabIndex, 500, false);
          // 被点击slide的中心点
          selfTab.setWrapperTransition(300)
          if (slideCenter < swiperWidth / 2) {
              selfTab.setWrapperTranslate(0)
          } else if (slideCenter > maxWidth) {
             selfTab.setWrapperTranslate(maxTranslate)
          } else {
              var nowTlanslate = slideCenter - swiperWidth / 2
              selfTab.setWrapperTranslate(-nowTlanslate)
          }
          this.thisIndex=tabIndex
          var cityId=this.tabs[tabIndex].id;
          this.getItems(cityId,'music')
            // 音乐 10/music
            // 戏剧 11/drama
            // 展览 12/exhibition
            // 讲座 13/salon
            // 聚会 14/party
            // 运动 15/sports
            // 旅行 16/travel
            // 公益 17/commonweal
            // 电影 18/film
        //   console.log(cityId);
      }
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/swiper.min.css';
    html, body {
        position: relative;
        height: 100%;
    }
    body {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        margin: 0;
        padding: 0;
    }
    .gallery-top.swiper-container {
        width: 100%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .gallery-top {
        height: 80%;
        width: 100%;
    }
    .gallery-thumbs {
        height: 20%;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }
    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }
    #topNav {
        width: 100%;
        overflow: hidden;
        font: 14px/32px hiragino sans gb, microsoft yahei, simsun;
        border-bottom:1px solid #f8f8f8;
        background: #fff;
    }
    #topNav .swiper-slide {
      width: 60px!important;
      padding: 5px;
      letter-spacing:2px;
      text-align:center;
    }
    #topNav .swiper-slide span{
        transition:all .3s ease;
        display:block;
    }
    #topNav .active span{
        transform:scale(1.1);
        color:#FF2D2D;
    }
    
</style>
