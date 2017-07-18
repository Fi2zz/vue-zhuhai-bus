<template>

  <div class="view" :class="viewName">
    <div class="view-header">
      <div class="view-header-wrap" style="text-align: center;font-size: 16px;">

        珠海公交巴士查询

      </div>
    </div>
    <div class="view-body">

      <div class="view-form-control input-group">
        <input class="form-control" type="text" v-model="lineId"
               placeholder="请输入路线号，如：8"
        >
        <!--<span class="input-group-addon">搜索</span>-->
      </div>
      <div>
        <div v-for="item in data"
             @click="getId(item)"
             class="bus-line"
        >

          <div class="cell">
            {{item.LineNumber}}

          </div>
          <div class="cell">
            {{item.FromStation}}  -
            {{item.ToStation}}
          </div>

        </div>

      </div>
    </div>
  </div>

</template>
<style lang="stylus">


  .bus-line
    border-bottom: 1px #ddd solid
    font-size: 14px
    height: 44px
    line-height 44px
    text-align: left
    display: flex
    justify-content flex-start
    align-items center
    position: relative

    &:after
      display: block
      content ''
      border 6px #ddd solid
      width: 44px
      height: 44px
      transform rotate(45deg) scale(.3, .3)
      position: absolute
      top: -4px
      right: -16px
      border-left: none
      border-bottom: none
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
        viewName: 'view-realtime',
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
        let dir = item.Direction;
        let name = item.Name;
        this.$router.push({name: 'view', query: {id, dir, name}})

      }
    },

  }
</script>
