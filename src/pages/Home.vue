<template>
  <div class="hello">
    <swiper class="swiper-container" id="topNav" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(tab,index) in tabs" :class="{active:thisIndex==index}" :data-id="tab.id" :key="tab.name"><span>{{tab.name}}</span></swiper-slide>
    </swiper>
<!-- Swiper -->
    <swiper class="swiper-container gallery-top" :options="slideSwiper" ref="mySlide">
        <swiper-slide>
            <home-item :city="thisCityId" :data="music" :type="'music'" :title="'音乐剧'"></home-item>
            <home-item :city="thisCityId" :data="drama" :type="'drama'" :title="'戏剧'"></home-item>
            <home-item :city="thisCityId" :data="exhibition" :type="'exhibition'" :title="'展览'"></home-item>
            <home-item :city="thisCityId" :data="film" :type="'film'" :title="'电影'"></home-item>
            <home-item :city="thisCityId" :data="salon" :type="'salon'" :title="'讲座'"></home-item>
            <div class="no-data" v-if="isLoading">加载数据中...</div>
            <div class="no-data" v-if="!isLoading && !music.total">暂无数据...</div>
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
      thisCityId:'',
      isLoading:true,
      tabs:[],
      music:[],
      drama:[],
      exhibition:[],
      salon:[],
      film:[],
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
  watch:{
     thisIndex:{
         thisCityId(){
             return this.tabs[thisIndex].id;
         }
     } 
  },
  mounted(){
      this.getAllCitys();
      var timer=setInterval(()=>{
        var tab=this.tabs.length;
        if(tab){
            var firstId=this.tabs[0].id;
            this.thisCityId=firstId;
            this.getActives(firstId)
            clearInterval(timer);
        }
      },100)
      document.title="豆瓣同城";
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
      getAllCitys(){
         api.getCitys({count:100}).then(res=>{
            var getTabs=res.locs;
            var isLive=false;
            var thisCity;
            var index;
            getTabs.forEach((item,index)=>{
                if(item.name==city){
                    thisCity=item;
                    index=index;
                    isLive=true;
                    getTabs.splice(index,1);
                    return;
                }
            })
            if(isLive){
                getTabs.unshift(thisCity);
            }
            this.tabs=getTabs.slice(0,20);
          }) 

      },
      getActives(id){
        this.getItems(id,'music').then(res=>{
            this.music=res;
        })
        this.getItems(id,'drama').then(res=>{
            this.drama=res;
        })
        this.getItems(id,'exhibition').then(res=>{
            this.exhibition=res;
        })
        this.getItems(id,'salon').then(res=>{
            this.salon=res;
        })
        this.getItems(id,'film').then(res=>{
            this.film=res;
        });
        setTimeout(()=>{
            this.isLoading=false;
        },300)
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
          this.getActives(cityId);
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
        border-bottom:1px solid #f0f0f0;
        background: #fff;
    }
    #topNav .swiper-slide {
      width: 20%!important;
      padding: 5px;
      letter-spacing:2px;
      text-align:center;
      box-sizing: border-box;
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
