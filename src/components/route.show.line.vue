<template>

  <div class="view" :class="viewName" >

    <div class="view-header">
      <div class="view-header-wrap">
        <div class="view-header-button" @click="$router.push('/')">返回</div>
        <div class="view-title" style="">
            {{lineName}} / {{currentBuses.length}} 
        </div>
      </div>
    </div>
    <div class="view-body" >

      <div class="view-current-stations" v-show="list &&list.length>0">
        <div class="cell-wrap" @click="list.reverse()">
          <div class="cell">{{from}}</div>
          <div class="cell"><icon width="16" height="16"/></div> 
          <div class="cell">{{to}}</div> 
          </div>    
      </div> 
      <ol class="view-list">
        <li v-for="(item,index) in list"><span>{{index > 9 ? index + 1 : `0${index + 1}`}}</span>{{item.Name}}

          <div class="current-bus">

            <div v-for="bus in currentBuses" v-show="item.Name===bus.CurrentStation" :id="item.Name"
                 :class="bus.CurrentStation">{{bus.BusNumber}}
            </div>
          </div>
        </li>
      </ol>
    </div>

  </div>

</template>
<style scoped lang="stylus">
  .view-header
    .view-title
      font-size 16px
      text-align center
  .view-header-button 
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    font-size: 14px;
    padding-left: 16px;

  .view-current-line
    padding-top 88px
  .view-header
    z-index: 9

  .view-title
    height: 44px
    line-height 44px
    background #fff
    border-bottom 1px #ddd solid

  .icon-exchange
    font-size: 16px
    svg
      font-size: 12px

  .view-current-stations
    position fixed
    top 44px
    left 0
    right 0
    z-index 9
    .cell-wrap
      display flex    
      align-items center
      background #fff
      max-width 480px 
      margin auto
      width 100%
      border-bottom 1px #ddd solid
      .cell
        display flex
        height 44px
        line-height 44px
        
        font-size 14px
        align-items center
        justify-content center
        &:nth-of-type(1)
          flex .4
        &:nth-of-type(2)
          flex .2  
        &:nth-last-of-type(1)
          flex .4  


  .view-list
    margin: 0
    padding: 0
    li
      display: block
      height: 32px
      line-height 32px
      font-size: 14px
      position: relative
      padding-left: 32px
      span
        display: block
        width: 24px
        height: 24px
        text-align: center
        position: absolute
        left: 0
        top: 4px
        bottom: 4px
        font-size: 10px
        background #f00
        line-height 24px;
        border-radius 50%
        color #fff

      &:not(:nth-last-of-type(1)):after
        display: block
        height: 1px
        background #ddd
        position: absolute
        bottom: 0
        left 32px
        right 0
        content: ''

  .current-bus
    display: inline-block
    vertical-align: top
    div
      display: inline-block
      vertical-align: top
      color #f00

</style>
<script>
  import * as api from '../api'
  import icon from './icon.exchange.vue'
  export default{

    name: 'view',
    components: {icon},
    data(){
      return {
        viewName: 'view-current-line',
        from: '',
        to: '',
        list: [],
        lineName: this.$route.query.name,
        currentBuses: []
      }
    },
    beforeRouteEnter(to, from, next){
      let id = to.query.id, dir = to.query.dir;
      next(vm => {
        api.getLineById(id).then(res => {
          if (res.flag = 1002) {
            let data = res.data;
            vm.list = data;

          }
        })
      })
    },
    watch: {
      list(list){

        this.from = list[0].Name;
        this.to = list[list.length - 1].Name

      },
      from(from){
        console.log(from, this.lineName)
        if (from) {
          api.getLineRunning(this.lineName, from)
            .then(res => {
              console.log(res);
              this.currentBuses = res.data;
            })
        }
      }
    }
  }
</script>
