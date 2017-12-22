<template>
  <div>
    <div class="sort_head">
      <div class="sort_box">
        <span class="sort_item">类型 <span class="item_down">&#155</span></span>
        <span class="sort_item">时间 <span class="item_down">&#155</span></span>
        <span class="sort_item">地点 <span class="item_down">&#155</span></span>
      </div>
    </div>
    <sort-block @sendItem="incrementTotal1"></sort-block> 

  </div>
</template>
<script>
import SortBlock from '../components/sort_block';
export default {
  components:{
    SortBlock
  },
  data(){
    return{
      type:'',
      date_type:'',
      loc:''
    }
  },
  mounted(){
    console.log(this.$route.query)
  },
  methods:{
    incrementTotal1: function (e) {
        this.total += 1;
        console.log(e);
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

