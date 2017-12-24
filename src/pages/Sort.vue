<template>
  <div>
    <div class="sort_head">
      <div class="sort_box">
        <span class="sort_item" :class="{active:thisIndex==1}" @click="changeItem(1)">{{type.name}} <span class="item_down">&#155</span></span>
        <span class="sort_item" :class="{active:thisIndex==2}" @click="changeItem(2)">{{date_type.name}} <span class="item_down">&#155</span></span>
        <span class="sort_item" :class="{active:thisIndex==3}" @click="changeItem(3)">{{loc.name}} <span class="item_down">&#155</span></span>
      </div>
    </div>
    <!-- type -->
    <sort-block @getItem="getType" v-show="thisIndex==1" :active="type.id" :data="typeData"></sort-block> 
    <!-- date -->
    <sort-block @getItem="getDay" v-show="thisIndex==2" :active="date_type.id" :data="dayData"></sort-block> 
    <!-- loc -->
    <sort-block @getItem="getLoc" v-show="thisIndex==3" :active="loc.id" :data="locData"></sort-block> 

    <sort-item :data="getData"></sort-item>

    <div class="no-data" v-if="!getData.length && !isLoading">加载数据中...</div>
    <div class="no-data" v-if="!getData.length && isLoading">暂无数据</div>

  </div>
</template>
<script>
import Vue from 'vue'
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
      type:{},
      date_type:{id:'future',name:'全部'},
      loc:{},
      getData:[],
      isLoading:false
    }
  },
  created(){
    var getQuery=this.$route.query;
    this.loc={id:getQuery.city};
    this.sortItem(getQuery.type);
    this.getItems();
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
        console.log(e)
    },
    getDay(e) {
        this.getData=[];
        this.date_type=e;
        this.thisIndex=0;
        this.getItems();
        console.log(e)
    },
    getLoc(e) {
        this.getData=[];
        this.loc=e;
        this.thisIndex=0;
        this.getItems();
        console.log(e)
    },
    sortItem(id){
      switch(id){
        case 'all':
        this.type={
          id:'id',
          name:'全部'
        };
        break;
        case 'music':
        this.type={
          id:'id',
          name:'音乐'
        };
        break;
        case 'drama':
        this.type={
          id:'id',
          name:'戏剧'
        };
        break;
        case 'exhibition':
        this.type={
          id:'id',
          name:'展览'
        };
        break;
        case 'salon':
        this.type={
          id:'id',
          name:'讲座'
        };
        break;
        case 'party':
        this.type={
          id:'id',
          name:'聚会'
        };
        break;
        case 'sports':
        this.type={
          id:'id',
          name:'运动'
        };
        break;
        case 'travel':
        this.type={
          id:'id',
          name:'旅行'
        };
        break;
        case 'commonweal':
        this.type={
          id:'id',
          name:'公益'
        };
        break;
        case 'film':
        this.type={
          id:'id',
          name:'电影'
        };
        break;
        default:
        this.type={
          id:'',
          name:'类型'
        };

      }
    },
    getItems(){
      this.isLoading=false;
      var id=this.loc.id;
      var type=this.type.id;
      var dateType=this.date_type.id;
      api.getActives({loc:id,date_type:dateType,type:type,count:100}).then(res=>{
        if(this.locData.length<2){
          this.locData=res.districts;
          this.locData.unshift({id:this.$route.query.city,name:'全部'});
          this.locData.forEach(item=>{
            if(item.id==this.loc.id){
              this.loc=item;
            }
          })
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
  .sort_item.active{
    color: #00b934
  }
</style>

