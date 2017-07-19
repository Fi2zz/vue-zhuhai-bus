<template>
  <div class="view" :class="viewName">
    <div class="view-header">
      <div class="view-header-wrap">
        <div class="view-header-title">珠海公交巴士查询</div>
      </div>
    </div>
    <div class="view-body">
      <div class="text-input">
        <input class="form-control" type="search" placeholder="请输入路线号，如：8" v-model="lineId"/>
      </div>
      <ol class="view-list">
        <li v-for="item in data" @click="getId(item)" class="view-list-item">
          <div class="cell">{{item.LineNumber}}</div>
          <div class="cell">{{item.FromStation}}  - {{item.ToStation}}</div>
        </li>
      </ol>
    </div>
  </div>
</template>
<style lang="stylus">

  .view-list
    padding 0 8px

  .view-list-item
    border-bottom: 1px #ddd solid
    font-size: 14px
    height: 44px
    line-height 44px
    text-align: left
    display: flex
    justify-content flex-start
    align-items center
    position: relative
    padding 0 8px
    .cell
      display: flex
      flex .9
      &:nth-of-type(1)
        flex .1


</style>
<script>
  import * as api from '../api';
  export default{
    data(){
      return {
        viewName: 'view-default',
        lineId: '',
        data: []
      }
    },
    watch: {
      lineId(id){
        setTimeout(() => {
          let promise = api.search(id);
          promise.then(res => {
            if (res.flag === 1002) {
              this.data = res.data
            }
          });
        }, 300)
      }
    },
    methods: {
      getId(item){
        let id = item.Id;
        let name = item.Name;
        this.$router.push({name: 'view', query: {id, name, lineNumber: this.lineId}})
      }
    },
  }
</script>
