<template>
  <div class="view view-current-line">
    <div class="view-header">
      <div class="view-header-wrap">
        <div class="view-header-button" @click="$router.push('/')">返回</div>
        <div class="view-header-title" style="">
          {{lineName}}({{buses.length}}辆正在行驶)
        </div>
      </div>
    </div>
    <div class="view-body">
      <div class="view-current-stations" v-show="list &&list.length>0">
        <div class="cell-wrap" style="position: relative;">
          <div class="cell">{{from}}</div>
          <div class="cell" @click="list.reverse()">
            <icon width="16" height="16"/>
          </div>
          <div class="cell">{{to}}</div>
          <div class="line-info">
            <div v-for="(info,key) in currentLine" :key="key">{{info}}</div>
          </div>
        </div>
      </div>
      <ol class="view-list">
        <li v-for="(item,index) in list" 
            :key="index">
            <span>{{$padding(index + 1)}}</span>
            {{item.Name}}
            <div class="current-bus">
              <div v-for="(bus,index) in buses"
                  :key="index"
                  :id="item.Name"
                  :class="bus.CurrentStation" 
                  v-text="bus.BusNumber"
                  v-if="item.Name===bus.CurrentStation" 
                  ></div>
            </div>
        </li>
        <li>
        </li>
      </ol>
    </div>

  </div>

</template>
<style scoped lang="stylus">@import '../stylus/show.styl';</style>
<script>
import icon from "./icon.exchange.vue";

export default {
  name: "show-view",
  components: { icon },
  data() {
    return {
      from: "",
      to: "",
      list: [],
      lineName: this.$route.query.name,
      line: this.$route.query.lineNumber,
      currentLine: {
        BeginTime: "",
        EndTime: "",
        Price: 0,
        Interval: 0
      },
      buses: [],
      history: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    let id = to.params.id;
    let query = to.query;
    next(vm => {
      vm
        .$api({
          type: "line",
          name: id
        })
        .then(res => {
          if ((res.flag = 1002)) {
            vm.list = res.data;
          }
        });
    });
  },
  watch: {
    list(list) {
      this.from = list[0].Name;
      this.to = list[list.length - 1].Name;
    },
    from(from) {
      if (from) {
        this.getList(from);
        this.$api({
          type: "search",
          name: this.line
        }).then(res => {
          if (res.flag === 1002) {
            let lineData = res.data;
            for (let line of lineData) {
              if (line.FromStation === from) {
                this.currentLine.BeginTime = `早班:${line.BeginTime}`;
                this.currentLine.EndTime = `晚班:${line.EndTime}`;
                this.currentLine.Interval = `间隔:${line.Interval}分钟`;
                this.currentLine.Price = `票价:${line.Price}元`;
              }
            }
          }
        });
      }
    }
  },
  mouted() {
    if (this.from) {
      setTimeout(() => {
        this.getList(this.from);
      }, 1000 * 6);
    }
  },
  methods: {
    getList(from) {
      this.$api({
        type: "current",
        name: this.lineName,
        from: from
      }).then(res => {
        if (res.flag === 1004) {
          this.buses = [];
        } else if (res.flag === 1002) {
          this.buses = res.data;
        }
      });
    }
  }
};
</script>
