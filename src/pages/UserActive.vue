<template>
  <div>
    <user-item :data="createData" :title="'用户创建的活动'"></user-item>
    <user-item :data="joinData" :title="'用户参加的活动'"></user-item>
    <user-item :data="wishedData" :title="'用户感兴趣的活动'"></user-item>
  </div>
</template>
<script>
import * as api from '../api/index'
import UserItem from '../components/user_item'
export default {
  components:{
    UserItem
  },
  data(){
    return {
      id:'',
      createData:[],
      joinData:[],
      wishedData:[]
    }
  },
  created(){
      var id=this.$route.params.id;
      this.getCreate(id);
      this.getJoin(id);
      this.getWished(id,'ongoing');
  },
  methods:{
    getCreate(id){
      api.getUserCreate(id).then(res=>{
        this.createData=res
      })
    },
    getJoin(id){
      api.getUserJoin(id).then(res=>{
        this.joinData=res
      })
    },
    getWished(id,status){
      api.getUserWished(id,{status:status}).then(res=>{
        this.wishedData=res
      })
    }
  }
}
</script>
<style>
@import '../assets/swiper.min.css';
</style>


