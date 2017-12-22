<template>
  <div>
    <div class="sort_block">
        <div class="sort_view">
            <span v-for="item in list" :key="item.name" @click="getItem(item.name)" class="item">{{item.name}}</span>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            list:[
                {
                    name:'title1'
                },
                {
                    name:'title2'
                }
            ]
        }
    },
    methods:{
        getItem(name){
            this.$emit('sendItem',name)
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
    font-size: 13px;
    color: #666;
    height: 28px;
    line-height: 28px;
    padding: 0 16px;
    border:1px solid #e4e4e4;
    border-radius: 18px;
  }
</style>


