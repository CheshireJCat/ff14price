const apiHost = "https://cafemaker.wakingsands.com";
const wikiUrl = "https://ff14.huijiwiki.com/wiki/%E7%89%A9%E5%93%81:";

const Event = new Vue();

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
  陆行鸟跨服: "陆行鸟跨服",
  红玉海: "红玉海",
  神意之地: "神意之地",
  拉诺西亚: "拉诺西亚",
  幻影群岛: "幻影群岛",
  萌芽池: "萌芽池",
  宇宙和音: "宇宙和音",
  沃仙曦染: "沃仙曦染",
  晨曦王座: "晨曦王座",
  莫古力跨服: "莫古力跨服",
  白银乡: "白银乡",
  白金幻象: "白金幻象",
  神拳痕: "神拳痕",
  潮风亭: "潮风亭",
  旅人栈桥: "旅人栈桥",
  拂晓之间: "拂晓之间",
  龙巢神殿: "龙巢神殿",
  梦羽宝镜: "梦羽宝镜",
  猫小胖跨服: "猫小胖跨服",
  紫水浅桥: "紫水浅桥",
  延夏: "延夏",
  静语庄园: "静语庄园",
  摩杜纳: "摩杜纳",
  海猫茶屋: "海猫茶屋",
  柔风海湾: "柔风海湾",
  琥珀园: "琥珀园",
};

const price_default = {
  average: 0,
  currentAverage: 0,
  max: 0,
  min: 0,
  worldName: "",
  currentMin: 0,
};

const searchPriceRes_default = {
  ID: 0,
  all: price_default,
  hq: price_default,
  nq: price_default,
  info: {},
  listings: [],
  history: [],
};

Vue.component("price-table", {
  props: ["data", "time-text", "dc", "name-text", "lazy"],
  filters: {
    fmtCoin,
  },
  template: `
    <el-table :data="data" style="width: 100%" :lazy="lazy || false">
      <el-table-column label="HQ" width="30px">
        <template slot-scope="scope">
          <span>{{ scope.row.hq ? "√" : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pricePerUnit" label="单价" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.pricePerUnit | fmtCoin }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="worldName" label="区服" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.worldName ? dcs[scope.row.worldName] : dcs[dc]
            }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="timestamp" :label="timeText" align="center" width="120px">
      </el-table-column>
      <el-table-column prop="quantity" label="数量" align="center">
      </el-table-column>
      <el-table-column prop="total" label="总价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total | fmtCoin }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" :label="nameText" align="center">
      </el-table-column>
    </el-table>
  `,
});
// 各种价格展示
Vue.component("price-show", {
  props: ["data", "title", "dc"],
  computed: {
    maxPrice() {
      return Math.max(
        ...Object.values(this.data).filter((item) => !isNaN(item))
      );
    },
  },
  methods: {
    calP(value) {
      return ((parseInt(value) * 100) / this.maxPrice).toFixed(2);
    },
    name(key) {
      switch (key) {
        case "currentMin":
          return "当前最低价";
        case "average":
          return "最近均价";
        case "currentAverage":
          return "当前均价";
        case "max":
          return "最近最高价";
        case "min":
          return "最近最低价";
        case "worldName":
          return "最低价服务器";
      }
    },
    addTag(name) {
      Event.$emit("addTag", name);
    },
    removeTag(name) {
      Event.$emit("removeTag", name);
    },
  },
  template: `
  <div class="grid-content bg-purple">
    {{title}}
    <template v-for="(item, key) in data" :key="key">
      <div>{{name(key)}}：<span class="price-show-num">{{key != 'worldName' ? item : dcs[item || dc] }}</span></div>
      <el-progress v-if="key != 'worldName'"  :show-text="false" :percentage="calP(item)">{{key}}</el-progress>
    </template>
  </div>
  `,
});
Vue.component("build4_table", {
  props: ["data", "dc", "tags"],
  methods: {
    addTag(name) {
      Event.$emit("addTag", name);
    },
    removeTag(name) {
      Event.$emit("removeTag", name);
    },
  },
  template: `
    <el-table :data="data" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.info" style="width: 100%" style="background:#eee;">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-container style="background: #777777; padding: 5px 8px;">交易板价格</el-container>
                <price-table
                  :data="props.row.price.listings.slice(0,10)"
                  time-text="上报时间"
                  name-text="雇员名"
                  :dc="dc"
                  :lazy="true"
                >
                </price-table>
                <el-container style="background: #777777; padding: 5px 8px;">购买记录</el-container>
                <price-table
                  :data="props.row.price.history.slice(0,10)"
                  time-text="购买时间"
                  name-text="玩家名"
                  :dc="dc"
                  :lazy="true"
                ></price-table>
              </template>
            </el-table-column>
            <el-table-column label="材料名" prop="name"> </el-table-column>
            <el-table-column label="收藏" align="center">
              <template slot-scope="scope">
                <span
                  v-if="!tags.includes(scope.row.name)"
                  class="search-res-star"
                  v-on:click="addTag(scope.row.name)"
                  ><i class="el-icon-star-off"></i> 收藏</span
                >
                <span
                  v-else
                  class="search-res-star"
                  v-on:click="removeTag(scope.row.name)"
                  ><i class="el-icon-star-on"></i> 已收藏</span
                >
              </template>
            </el-table-column>
            <el-table-column label="需要数量" prop="count">
            </el-table-column>
            <el-table-column prop="price" label="价格">
              <template slot-scope="scope">
                <price-show
                  :dc="dc"
                  :data="scope.row.price.all"
                  title=""
                ></price-show>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="职业" prop="proName"> </el-table-column>
      <el-table-column label="名称" prop="name"> </el-table-column>
      <el-table-column label="最低成本价" align="right" prop="cost"> </el-table-column>
      
    </el-table>
  `,
});
// 重建4模块
// config_build4_item
// config_build4_hash_id_item
// config_build4_hash_name_id
// config_build4
Vue.component("build4", {
  props: ["dc", "tags"],
  data() {
    return {
      loading: false,
      data: [],
      dataNormal: [],
      dataHard: [],
    };
  },
  watch: {
    dc: function (newVal, oldVal) {
      this.search();
    },
  },
  mounted() {
    this.search();
  },
  template: `
    <el-row :gutter="20" v-loading="loading">
      <el-col :xs="{span:24,offset:0}" :md="{span:24}">根据当前数据[交易板最低价格]计算</el-col>
      <el-col :xs="{span:24,offset:0}" :md="{span:12}">
        <el-header style="line-height:60px">高难</el-header>
        <build4_table :dc="dc" :data="dataHard" :tags="tags"></build4_table>
      </el-col>
      <el-col :xs="{span:24,offset:0}" :md="{span:12}">
        <el-header style="line-height:60px">80级</el-header>
        <build4_table :dc="dc" :data="dataNormal" :tags="tags"></build4_table>
      </el-col>
    </el-row>
  `,
  methods: {
    search() {
      this.loading = true;
      // 获取所有价格
      this.getItemsPrice(() => {
        let data = config_build4.map(({ proName, normal, hard }) => {
          let res = {
            proName,
            normal: getRes(normal),
            hard: getRes(hard),
          };
          return res;
        });
        this.dataNormal = data
          .map(({ proName, normal }) => {
            return {
              proName,
              ...normal,
            };
          })
          .sort((a, b) => {
            return a.cost - b.cost;
          });
        this.dataHard = data
          .map(({ proName, hard }) => {
            return {
              proName,
              ...hard,
            };
          })
          .sort((a, b) => {
            return a.cost - b.cost;
          });
        this.loading = false;
      });

      function getRes(data) {
        let info = cmbInfo(data.list);
        return {
          name: data.name,
          info: info,
          cost: calCost(info),
        };
      }

      function cmbInfo(data) {
        return data.map((item) => {
          return {
            ...item,
            price: config_build4_hash_id_item[item.id].price,
          };
        });
      }

      function calCost(data) {
        return data.reduce(
          (
            total,
            {
              count,
              price: {
                all: { currentMin },
              },
            }
          ) => {
            return Math.round(total + currentMin * count);
          },
          0
        );
      }
    },
    getItemsPrice(callback) {
      return PromiseLimit(
        config_build4_item.map(({ ID }) => {
          return () => getPrice(ID, this.dc);
        })
      )
        .catch(() => {
          this.loading = true;
        })
        .then((res) => {
          res.forEach((priceItem) => {
            let { ID } = priceItem;
            config_build4_hash_id_item[ID].price = priceItem;
          });
          callback();
        });
    },
  },
});

Vue.component("price-list-by-name", {
  props: ["names", "dc", "host", "tags"],
  data() {
    return {
      loading: false,
      data: [],
    };
  },
  computed: {
    ids() {
      return this.data.map(({ ID }) => {
        return ID;
      });
    },
  },
  watch: {
    dc() {
      this.search();
    },
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      if (this.loading) return;
      this.data = [];
      this.loading = true;
      searchNames(this.names, this.dc)
        .catch(() => {
          this.data = [];
          this.loading = false;
        })
        .then((res) => {
          this.data = res.map(
            ({
              info: { ID, Name, Icon, Url },
              all: { average, currentMin },
              listings,
              history,
            }) => {
              return {
                ID,
                Name,
                Icon,
                Url,
                average,
                currentMin,
                listings: listings.slice(0, 15),
                history: history.slice(0, 15),
              };
            }
          );
          this.loading = false;
        });
    },
    addTag(name) {
      Event.$emit("addTag", name);
    },
    removeTag(name) {
      Event.$emit("removeTag", name);
    },
  },
  template: `
    <el-container v-loading="loading">
      <i class="el-icon-refresh refresh" @click="search"></i>
      <el-table :data="data" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <price-table
              :data="props.row.listings"
              time-text="上报时间"
              name-text="雇员名"
              :dc="dc"
            />
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <el-image :src="host + scope.row.Icon" style="vertical-align: middle">
            </el-image>
            <a :href="wikiUrl + scope.row.Name" target="_blank">
              <span class="search-res-info"> {{ scope.row.Name }} </span>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="average" label="均价" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.average | fmtCoin }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="currentMin" label="最低价" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.currentMin | fmtCoin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收藏" align="center">
          <template slot-scope="scope">
            <span
              v-if="!tags.includes(scope.row.Name)"
              class="search-res-star"
              v-on:click="addTag(scope.row.Name)"
              ><i class="el-icon-star-off"></i> 收藏</span
            >
            <span
              v-else
              class="search-res-star"
              v-on:click="removeTag(scope.row.Name)"
              ><i class="el-icon-star-on"></i> 已收藏</span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  `,
});

init();

function init() {
  new Vue({
    el: "#app",
    data() {
      return {
        activeIndex: "seachPrice",
        host: apiHost,
        dcs,
        tags: [],
        historyTags: ["发型样式：黎明辫","发型样式：2B","发型样式：9s","前沿布料"],
        dc: "LuXingNiao",
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
        searchPriceRes: searchPriceRes_default,
      };
    },
    filters: {
      fmtCoin,
    },
    mounted() {
      document.getElementById("app").style.display = "block";
      this.tags = this.getLocalTags();
      Event.$on("addTag", (name) => {
        this.addTag(name);
      });
      Event.$on("removeTag", (name) => {
        this.removeTag(name);
      });
    },
    unmounted() {
      Event.$off("addTag", (name) => {
        this.addTag(name);
      });
      Event.$off("removeTag", (name) => {
        this.removeTag(name);
      });
    },
    methods: {
      handleDcChange(dc) {
        if (this.activeIndex === "seachPrice") {
          if (this.searchPriceItem && this.searchPriceItem.id) {
            this.getItemPrice(this.searchPriceItem.id);
          }
        }
      },
      searchTag(item) {
        this.searchItemName = item;
        Vue.nextTick(() => {
          this.$refs.searchInput.focus();
        });
      },
      handleTabChange({ name }) {
        console.log(name);
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
      addTag(name) {
        console.log(name);
        if (this.tags.length <= 30) {
          if (!this.tags.includes(name)) {
            this.tags.push(name);
          }
          Vue.nextTick(() => {
            this.setLocalTags(this.tags);
          });
        }
      },
      removeTag(tag) {
        if (this.tags.length == 1) {
          this.tags = ["G12"];
        } else {
          this.tags.splice(this.tags.indexOf(tag), 1);
        }
        Vue.nextTick(() => {
          this.setLocalTags(this.tags);
        });
      },
      addHistoryTag(name) {
        if (!this.historyTags.includes(name)) {
          this.historyTags.push(name);
        }
      },
      removeHistoryTag(tag) {
        if (this.historyTags.length > 0) {
          this.historyTags.splice(this.historyTags.indexOf(tag), 1);
        }
      },
      getLocalTags() {
        if (window.localStorage) {
          let res = window.localStorage.getItem("ff14price-tags");
          if (res) {
            return res.split(",");
          } else {
            return tags;
          }
        }
        return tags;
      },
      setLocalTags(data = []) {
        if (window.localStorage) {
          return window.localStorage.setItem("ff14price-tags", data.join(","));
        }
      },
      searchPrice({ ID = 0, Url = "", Icon = "", Name = "" }) {
        console.log('搜索：',Name)
        Name && this.addHistoryTag(Name);
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
    },
  });
}

function getPerPrice(average = 0, listings = []) {
  let res = average;
  let min = res * 0.2;
  // 平均价的五分之一作为底线
  if (listings.length && min > 0) {
    for (let index = 0; index < 5; index++) {
      const item = listings[index];
      if (item) {
        if (item.pricePerUnit > min) {
          res = item.pricePerUnit;
          break;
        }
      } else {
        break;
      }
    }
  }
  return res.toFixed(0);
}

// 获取价格
function getPrice(itemId, dc = "LuXingNiao", info) {
  if (!itemId) return null;
  return fetchGet(`https://universalis.app/api/${dc}/${itemId}`).then(
    ({
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
        ID: itemId,
        info,
        all: {
          average: averagePrice.toFixed(0),
          currentMin: getPerPrice(averagePrice, listings),
          worldName: listings.length ? listings[0].worldName || "" : "",
        },
        hq: {
          average: averagePriceHQ.toFixed(0),
          max: maxPriceHQ,
          min: minPriceHQ,
        },
        nq: {
          average: averagePriceNQ.toFixed(0),
          max: maxPriceNQ,
          min: minPriceNQ,
        },
        listings: listings.map(
          ({
            hq,
            lastReviewTime,
            pricePerUnit,
            quantity,
            retainerName,
            total,
            worldName,
          }) => {
            return {
              hq,
              pricePerUnit,
              timestamp: fmtTime(lastReviewTime),
              quantity,
              total,
              username: retainerName,
              worldName,
            };
          }
        ),
        history: recentHistory.map(
          ({
            buyerName,
            hq,
            pricePerUnit,
            quantity,
            timestamp,
            total,
            worldName,
          }) => {
            return {
              hq,
              pricePerUnit,
              timestamp: fmtTime(timestamp),
              quantity,
              total,
              username: buyerName,
              worldName,
            };
          }
        ),
      };
    }
  );
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

function searchNames(names, dc) {
  return PromiseLimit(
    names.map((name) => {
      return () => searchItemByName(name).then((res) => {
        if (res.length > 0) {
          if(res.length == 1){
            return getPrice(res[0].ID, dc, res[0]);
          }else{
            for (let index = 0; index < res.length; index++) {
              let item = res[index];
              if(item.Name == name){
                return getPrice(res[index].ID, dc, res[index]);
              }
            }
            return Object.assign({}, searchPriceRes_default);
          }
        } else {
          return Object.assign({}, searchPriceRes_default);
        }
      });
    })
  );
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
    return "陈旧的缠尾蛟革地图";
  } else if (name == "G10") {
    return "陈旧的瞪羚革地图";
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
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
}

function fmtCoin(value) {
  return value.toLocaleString("en-US");
}

// {
//   let waits = [];
//   // 统计要查询的物品id
//   config_build4.forEach((pro) => {
//     [80, "s80"].forEach((key) => {
//       pro[key].list.forEach((item) => {
//         item.id = config_build4_hash_name_id[item.name]
//       });
//     });
//   });
//   JSON.stringify(config_build4)
// }


function PromiseAsync(fns){
  let i = 0,length = fns.length;
  const ret = [];
  function walk(){
    if(i === length){
      return Promise.resolve(ret);
    }
    const item = fns[i];
    i++;
    return item().then((res)=>{
      ret.push(res);
      return walk();
    })
  }
  return walk();
}

function PromiseLimit(funcArray, limit = 3) {
  let i = 0;
  const result = [];
  const running = [];
  const queue = function() {
    if (i === funcArray.length) return Promise.all(running);
    const p = funcArray[i++]();
    result.push(p);
    const e = p.then(() => running.splice(running.indexOf(e), 1));
    running.push(e);
    if (running.length >= limit) {
      return Promise.race(running).then(
        () => queue(),
        e => Promise.reject(e)
      );
    }
    return Promise.resolve().then(() => queue());
  };
  return queue().then(() => Promise.all(result));
}