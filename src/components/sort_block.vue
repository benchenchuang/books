<template>
  <div>
    <div class="sort_block">
        <div class="sort_view">
            <span v-for="item in data" :class="{active:active==item.id}" :key="item.name" @click="sendItem(item.id)" class="item">{{item.name}}</span>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    props:['data','active'],
    methods:{
        sendItem(event){
            this.$emit('getItem',event)
        }
    }
}
</script>
<style>
  .sort_block{
    position: fixed;
    width: 100%;
    left: 0;
    top:14vw;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.4); 
  }
  .sort_view{
    padding: 20px;
    background: #fff;
    overflow: hidden;
  }
  .sort_view .item{
    float: left;
    margin: 5px 10px;
    font-size: 13px;
    color: #666;
    height: 30px;
    line-height: 30px;
    padding: 0 16px;
    border:1px solid #e4e4e4;
    border-radius: 18px;
    box-sizing: border-box;
  }
  .item.active{
      color: #fff;
      background: #00b934;
      border-color: #00b934;
  }
</style>


