<template>
  <div class="view view-default">
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
        <!-- {{data}} -->
        <li v-for="item in data" @click="getId(item)" class="view-list-item">
          <div class="cell">{{item.LineNumber}}</div>
          <div class="cell">{{item.FromStation}}  - {{item.ToStation}}</div>
        </li>
      </ol>
    </div>
  </div>
</template>
<style lang="stylus">
  @import '../stylus/search.styl'
</style>
<script>

  import Storage from '../api/localstorage'
  const storage = new Storage();
  let history = storage.get('history');
  if (history === null) {
    history = {}
  }

  export default {
    data() {
      return {
        viewName: 'view-default',
        lineId: '',
        data: [],
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        for (let key in history) {
          vm.data.push(history[key])
        }
        vm.data.reverse();
      })
    },
    watch: {
      lineId(id) {
        setTimeout(() => {
          this.$api({
            type: 'search',
            name: id,
          }).then(res => {
            if (res.flag === 1002) {
              this.data = res.data
            }

          });
        }, 300)
      }
    },
    methods: {
      getId(item) {
        let lineNumber = (item.LineNumber.split('路'))[0];

        let store = {
          FromStation: item.FromStation,
          ToStation: item.ToStation,
          LineNumber: item.LineNumber,
          Id: item.Id,
          Name: item.Name,
          lineId: lineNumber
        };
        //记录搜索历史
        this.$set(history, [store.Id], store);
        storage.set({history});

        this.$router.push({
          name: 'line',
          params: {id: item.Id},
          query: {
            name: item.Name,
            lineNumber,
          }
        })
      }
    },
  }
</script>
