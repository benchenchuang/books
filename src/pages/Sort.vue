<template>
  <div>
    <div class="sort_head">
      <div class="sort_box">
        <span class="sort_item" @click="changeItem(1)">类型 <span class="item_down">&#155</span></span>
        <span class="sort_item" @click="changeItem(2)">时间 <span class="item_down">&#155</span></span>
        <span class="sort_item" @click="changeItem(3)">地点 <span class="item_down">&#155</span></span>
      </div>
    </div>
    <!-- type -->
    <sort-block @getItem="getType" v-show="thisIndex==1" :active="type" :data="typeData"></sort-block> 
    <!-- date -->
    <sort-block @getItem="getDay" v-show="thisIndex==2" :active="date_type" :data="dayData"></sort-block> 
    <!-- loc -->
    <sort-block @getItem="getLoc" v-show="thisIndex==3" :active="loc" :data="locData"></sort-block> 

    <sort-item :data="getData"></sort-item>

    <div class="no-data" v-if="!getData.length && !isLoading">加载数据中...</div>
    <div class="no-data" v-if="!getData.length && isLoading">暂无数据</div>

  </div>
</template>
<script>
import * as api from '../api/index'
import SortBlock from '../components/sort_block';
import SortItem from '../components/sort_item';
export default {
  components:{
    SortBlock,
    SortItem
  },
  data(){
    return{
      thisIndex:0,
      typeData:[
        {id:'all',name:"全部"},
        {id:'music',name:"音乐"},
        {id:'film', name:"电影"},
        {id:'drama',name:'戏剧'},
        {id:'commonweal',name:"公益 "},
        {id:'salon',name:'讲座'},
        {id:'exhibition',name:"展览"},
        {id:'party',name:"聚会"},
        {id:'sports',name:"运动"},
        {id:'travel',name:"旅行"},
        {id:'others',name:"其他"}
      ],
      dayData:[
        {id:'future',name:"全部"},
        {id:'week',name:"近期"},
        {id:'weekend',name:"周末"},
        {id:'today',name:"今天"},
        {id:'tomorrow',name:"明天"}
      ],
      locData:[],
      type:'',
      date_type:'future',
      loc:'',
      getData:[],
      isLoading:false
    }
  },
  created(){
    var getQuery=this.$route.query;
    this.loc=getQuery.city;
    var timer=setInterval(()=>{
      if(this.loc){
        this.getItems();
        clearInterval(timer)
      }
    },200)
    this.type=getQuery.type;
    document.title="筛选分类";
  },
  methods:{
    changeItem(e){
      this.thisIndex=this.thisIndex==e?0:e;
    },
    getType(e){
        this.getData=[];
        this.type=e;
        this.thisIndex=0;
        this.getItems();
    },
    getDay(e) {
        this.getData=[];
        this.date_type=e;
        this.thisIndex=0;
        this.getItems();
    },
    getLoc(e) {
        this.getData=[];
        this.loc=e;
        this.thisIndex=0;
        this.getItems();
    },
    getItems(){
      this.isLoading=false;
      var id=this.loc;
      var type=this.type;
      var dateType=this.date_type;
      api.getActives({loc:id,date_type:dateType,type:type,count:100}).then(res=>{
        if(this.locData.length<2){
          this.locData=res.districts;
          this.locData.unshift({id:this.$route.query.city,name:'全部'})
        }
        this.getData=res.events;
        this.isLoading=true;
      })
    },
  }
}
</script>
<style>
  .sort_head,
  .sort_box{
    width: 100%;
    height: 14vw;
    line-height: 14vw;
  }
  .sort_box{
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    display: -webkit-box;
    display:-webkit-flex;
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    box-sizing: border-box;
  }
  .sort_box .sort_item{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
  .sort_item .item_down{
    display:inline-block;
    margin-left: 3px;
    vertical-align: -2px;
    font-size: 18px;
    color: #999;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
</style>

