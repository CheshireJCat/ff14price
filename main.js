const apiHost = "https://cafemaker.wakingsands.com";

const tags = ["G12", "G10", "休闲", "第四期重建用的", "第四期重建用的最高级", "第四期重建用的特供"]

const dcs = {
  LuXingNiao: "陆行鸟跨服",
  HongYuHai: "红玉海",
  ShenYiZhiDi: "神意之地",
  LaNuoXiYa: "拉诺西亚",
  HuanYingQunDao: "幻影群岛",
  MengYaChi: "萌芽池",
  YuZhouHeYin: "宇宙和音",
  WoXianXiRan: "沃仙曦染",
  ChenXiWangZuo: "晨曦王座",
  MoGuLi: "莫古力跨服",
  BaiYinXiang: "白银乡",
  BaiJinHuanXiang: "白金幻象",
  ShenQuanHen: "神拳痕",
  ChaoFengTing: "潮风亭",
  LvRenZhanQiao: "旅人栈桥",
  FuXiaoZhiJian: "拂晓之间",
  Longchaoshendian: "龙巢神殿",
  MengYuBaoJing: "梦羽宝镜",
  MaoXiaoPang: "猫小胖跨服",
  ZiShuiZhanQiao: "紫水浅桥",
  YanXia: "延夏",
  JingYuZhuangYuan: "静语庄园",
  MoDuNa: "摩杜纳",
  HaiMaoChaWu: "海猫茶屋",
  RouFengHaiWan: "柔风海湾",
  HuPoYuan: "琥珀园",
};

const price_default = {
  average: 0,
  currentAverage: 0,
  max: 0,
  min: 0,
}

const searchPriceRes_default = {
  all: price_default,
  hq: price_default,
  nq: price_default,
  listings: [],
  history: []
}

Vue.component('price-table', {
  props: ["data", "time-text", "dc", "name-text"],
  filters: {
    fmtCoin
  },
  template: `
    <el-table :data="data" stripe style="width: 100%">
      <el-table-column label="HQ">
        <template slot-scope="scope">
          <span>{{ scope.row.hq ? "√" : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pricePerUnit" label="单价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pricePerUnit | fmtCoin }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="timestamp" :label="timeText" align="center">
      </el-table-column>
      <el-table-column prop="total" label="数量" align="center">
      </el-table-column>
      <el-table-column prop="total" label="总价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total | fmtCoin }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" :label="nameText" align="center">
      </el-table-column>
      <el-table-column prop="worldName" label="区服" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.worldName ? dcs[scope.row.worldName] : dcs[dc]
            }}</span>
        </template>
      </el-table-column>
    </el-table>
  `
})

Vue.component('price-show', {
  props: ["data", "title"],
  computed: {
    maxPrice() {
      return Math.max(...Object.values(this.data));
    }
  },
  methods: {
    calP(value) {
      return (value * 100 / this.maxPrice).toFixed(2);
    },
    name(key) {
      switch (key) {
        case "average": return "总平均值";
        case "currentAverage": return "最近平均值";
        case "max": return "最高价";
        case "min": return "最低价";
      }
    },
  },
  template: `
  <el-col :span="8"><div class="grid-content bg-purple">
    {{title}}
    <template v-for="(item, key) in data" :key="key">
      <div>{{name(key)}}：{{item}}</div>
      <el-progress  :show-text="false" :percentage="calP(item)">{{key}}</el-progress>
    </template>
  </div></el-col>
  `
})

Vue.component('build4', {
  props: ["dc"],
  data() {
    return {
      host: apiHost,
      name: "第四期重建用的",
      data: [],
      loading: false
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      searchItemByName("第四期重建用的").then(items => {
        this.loading = true;
        Promise.all(items.map(item => {
          return getPrice(item.ID, this.dc, item)
        })).then(res => {
          this.loading = false;
          console.log(res);
          this.data = res.map(({ info: { ID, Name, Icon, Url }, all: { average, currentAverage, max, min }, listings, history }) => {
            return { ID, Name, Icon, Url, average, currentAverage, max, min, listings, history }
          });
        }).catch(reason => {
          this.loading = false;
          console.log('reason:', reason);
        })
      });
    }
  },
  filters: {
    fmtCoin
  },
  template: `
  <el-main>
    <el-header v-if="!loading">
      <el-button icon="el-icon-refresh" @click="search">刷新</el-button>
    </el-header>
    <el-table :data="data" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-image :src="host + scope.row.Icon" style="vertical-align: middle">
          </el-image>
          <a :href="host + scope.row.Url">
            <span class="search-res-info" style="color:#606266"> {{ scope.row.Name }} </span>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="average" label="平均价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.average | fmtCoin }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="currentAverage" label="最近平均价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.currentAverage | fmtCoin }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="max" label="最高价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.max | fmtCoin }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="min" label="最低价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.min | fmtCoin }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  `
})

init();

function init() {
  new Vue({
    el: "#app",
    data() {
      return {
        activeIndex: "1",
        host: apiHost,
        dcs,
        tags,
        dc: "HuanYingQunDao",
        favIds: [],
        // 搜索
        searchResult: [],
        searchItemName: "",
        // 搜索价格结果
        loading_searchPrice: false,
        searchPriceItem: {
          id: 0,
          name: "",
          icon: "",
          url: "",
        },
        searchPriceRes: searchPriceRes_default
      }
    },
    filters: {
      fmtCoin
    },
    mounted() {
      document.getElementById("app").style.display = "block";
    },
    methods: {
      handleDcChange(dc) {
        if (this.searchPriceItem && this.searchPriceItem.id) {
          this.getItemPrice(this.searchPriceItem.id);
        }
      },
      searchTag(item) {
        this.searchItemName = item;
        Vue.nextTick(() => {
          this.$refs.searchInput.focus();
        })
      },
      handleTabChange({ name }) {
        console.log(name)
      },
      searchItem(queryString, callback) {
        if (!queryString) return callback([]);
        // callback([
        //   {
        //     ID: 2930,
        //     Icon: "/i/040000/040637.png",
        //     Name: "渔人休闲帽",
        //     Url: "/Item/2930",
        //   },
        // ]);
        // return;
        queryString = nameAbbr(queryString);
        searchItemByName(queryString).then((res) => {
          if (res.length == 1 && res[0].Name == queryString) {
            callback([]);
            this.searchPrice(res[0]);
          } else {
            callback(res);
          }
        });
      },
      searchPrice({ ID = 0, Url = "", Icon = "", Name = "" }) {
        this.searchPriceItem = {
          id: ID,
          icon: Icon,
          name: Name,
          url: Url,
        };
        this.getItemPrice(ID);
      },
      getItemPrice(id) {
        this.loading_searchPrice = true;
        getPrice(id, this.dc)
          .catch(() => {
            this.searchPriceRes = searchPriceRes_default;
            this.loading_searchPrice = false;
          })
          .then((res) => {
            this.searchPriceRes = res;
            this.loading_searchPrice = false;
          });
      },
      searchNames(names) {
        Promise.all(names.map(item => searchItemByName(item))).then((res) => {
          console.log(res);
        }).catch(reason => {
          console.log(reason)
        });
      },
      collectItem(id) {
        id = parseInt(id);
        if (isNaN(id) || id == 0) return;
        let index = this.favIds.indexOf(id);
        if (index < 0) {
          this.favIds.push(id);
        } else {
          this.favIds.splice(index, 1);
        }
      },
    },
  });
}

// 获取价格
function getPrice(itemId, dc = "LuXingNiao", info) {
  if (!itemId) return null;
  return fetchGet(
    `https://universalis.app/api/${dc}/${itemId}`
  ).then(({
    averagePrice = 0,
    averagePriceHQ = 0,
    averagePriceNQ = 0,
    currentAveragePrice = 0,
    currentAveragePriceHQ = 0,
    currentAveragePriceNQ = 0,
    maxPrice = 0,
    maxPriceHQ = 0,
    maxPriceNQ = 0,
    minPrice = 0,
    minPriceHQ = 0,
    minPriceNQ = 0,
    listings = [],
    recentHistory = [],
  }) => {
    return {
      info,
      all: {
        average: averagePrice,
        currentAverage: currentAveragePrice,
        max: maxPrice,
        min: minPrice,
      },
      hq: {
        average: averagePriceHQ,
        currentAverage: currentAveragePriceHQ,
        max: maxPriceHQ,
        min: minPriceHQ,
      },
      nq: {
        average: averagePriceNQ,
        currentAverage: currentAveragePriceNQ,
        max: maxPriceNQ,
        min: minPriceNQ,
      },
      listings: listings.map(({ hq,
        lastReviewTime,
        pricePerUnit,
        quantity,
        retainerName,
        total,
        worldName
      }) => {
        return {
          hq,
          pricePerUnit,
          timestamp: fmtTime(lastReviewTime),
          quantity,
          total,
          username: retainerName,
          worldName
        }
      }),
      history: recentHistory.map(({
        buyerName,
        hq,
        pricePerUnit,
        quantity,
        timestamp,
        total,
        worldName
      }) => {
        return {
          hq,
          pricePerUnit,
          timestamp: fmtTime(timestamp),
          quantity,
          total,
          username: buyerName,
          worldName,
        }
      }),
    }
  })
}

// 通过名称搜索物品
function searchItemByName(name) {
  if (!name) return null;
  let url = apiHost + "/search";
  let params = {
    indexes: "Item",
    filters: "ItemSearchCategory.ID>=1",
    string: name,
    columns: "ID,Icon,Name,Url",
    limit: 100,
    sort_field: "LevelItem",
    sort_order: "desc",
  };
  return fetchGet(url + "?" + cmbGetParams(params)).then(function ({
    Results = [],
  }) {
    return Results;
  });
}

function searchItemByIds(ids) {
  let url = apiHost + "/item";
  let params = {
    ids: Array.isArray(ids) ? ids.join(",") : ids,
  };
  return fetchGet(url + "?" + cmbGetParams(params)).then(function ({
    Results = [],
  }) {
    return Results;
  });
}

function fetchGet(url) {
  return fetch(url).then(function (response) {
    return response.json();
  });
}

function cmbGetParams(params) {
  return Object.keys(params)
    .map((key) => {
      return `${key}=${params[key]}`;
    })
    .join("&");
}


function nameAbbr(name) {
  if (name == "G12") {
    return "陈旧的缠尾蛟革地图"
  } else if (name == "G10") {
    return "陈旧的瞪羚革地图"
  } else {
    return name;
  }
}


function fmtTime(value, isSeconds = true, format = "MM-dd hh:mm:ss") {
  let time = new Date(isSeconds ? value * 1000 : value);
  var o = {
    "M+": time.getMonth() + 1, //month
    "d+": time.getDate(), //day
    "h+": time.getHours(), //hour
    "m+": time.getMinutes(), //minute
    "s+": time.getSeconds(), //second
    "q+": Math.floor((time.getMonth() + 3) / 3), //quarter
    S: time.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (time.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
}

function fmtCoin(value) {
  return value.toLocaleString("en-US");
}
