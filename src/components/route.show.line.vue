<template>

  <div class="view" :class="viewName">

    <div class="view-header">
      <div class="view-header-wrap">
        <div class="view-header-button" @click="$router.push('/')">返回</div>
        <div class="view-header-title" style="">
          {{lineName}} / {{buses.length}}
        </div>
      </div>
    </div>
    <div class="view-body">
      <div class="view-current-stations" v-show="list &&list.length>0">
        <div class="cell-wrap" style="position: relative;" @click="list.reverse()">
          <div class="cell">{{from}}</div>
          <div class="cell">
            <icon width="16" height="16"/>
          </div>
          <div class="cell">{{to}}</div>
          <div class="line-info">
            <div v-for="info in currentLine">{{info}}</div>
          </div>
        </div>
      </div>
      <ol class="view-list">
        <li v-for="(item,index) in list"><span>{{index > 9 ? index + 1 : `0${index + 1}`}}</span>{{item.Name}}
          <div class="current-bus">
            <div v-for="bus in buses" v-show="item.Name===bus.CurrentStation" :id="item.Name"
                 :class="bus.CurrentStation">{{bus.BusNumber}}
            </div>
          </div>
        </li>
      </ol>
    </div>

  </div>

</template>
<style scoped lang="stylus">
  @import "../stylus/vars.styl"

  .line-info
    position: absolute
    top: 44px
    padding: 12px
    right: 0
    background #fff
    border 1px brand-gray solid
    line-height 16px

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
      background brand-default
      max-width 480px
      margin auto
      width 100%
      border-bottom 1px brand-gray solid
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
        background brand-primary
        line-height 24px;
        border-radius 50%
        color brand-default

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
        line: this.$route.query.lineNumber,
        currentLine: {
          first: '',
          last: '',
          price: 0,
          inter: 0
        },
        buses: [],
      }
    },
    beforeRouteEnter(to, from, next){
      let id = to.query.id;
      next(vm => {
        api.getLine(id).then(res => {
          if (res.flag = 1002) {
            vm.list = res.data;
          }
        });
      })
    },
    watch: {
      list(list){
        this.from = list[0].Name;
        this.to = list[list.length - 1].Name
      },
      from(from){
        if (from) {
          api.getRunning(this.lineName, from)
            .then(res => this.buses = res.data);
          api.search(this.line).then(res => {
            let lineData = res.data;
            for (let line of lineData) {
              if (line.FromStation === from) {
                this.currentLine.first = `早班:${line.BeginTime}`
                this.currentLine.last = `晚班:${line.EndTime}`
                this.currentLine.inter = `间隔:${line.Interval}分钟`
                this.currentLine.price = `票价:${line.Price}元`
              }
            }
          })
        }
      }
    },
  }
</script>
