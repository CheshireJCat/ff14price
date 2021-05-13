const apiHost = "https://cafemaker.wakingsands.com";
const dcs = {
  LuXingNiao: "陆行鸟",
  HongYuHai: "红玉海",
  ShenYiZhiDi: "神意之地",
  LaNuoXiYa: "拉诺西亚",
  HuanYingQunDao: "幻影群岛",
  MengYaChi: "萌芽池",
  YuZhouHeYin: "宇宙和音",
  WoXianXiRan: "沃仙曦染",
  ChenXiWangZuo: "晨曦王座",
  MoGuLi: "莫古力",
  BaiYinXiang: "白银乡",
  BaiJinHuanXiang: "白金幻象",
  ShenQuanHen: "神拳痕",
  ChaoFengTing: "潮风亭",
  LvRenZhanQiao: "旅人栈桥",
  FuXiaoZhiJian: "拂晓之间",
  Longchaoshendian: "龙巢神殿",
  MengYuBaoJing: "梦羽宝镜",
  MaoXiaoPang: "猫小胖",
  ZiShuiZhanQiao: "紫水浅桥",
  YanXia: "延夏",
  JingYuZhuangYuan: "静语庄园",
  MoDuNa: "摩杜纳",
  HaiMaoChaWu: "海猫茶屋",
  RouFengHaiWan: "柔风海湾",
  HuPoYuan: "琥珀园",
};

init();

function init() {
  new Vue({
    el: "#app",
    data() {
      return {
        activeIndex: "1",
        host: apiHost,
        dcs,
        dc: "HuanYingQunDao",
        favIds: [33144],
        // 搜索
        searchResult: [],
        searchItemName: "",
        // 搜索价格结果
        loading_searchPrice: false,
        searchPriceItem: null,
        searchPriceRes: [],
      };
    },
    mounted() {
      document.getElementById("app").style.display = "block";
    },
    methods: {
      handleChangeTab(index) {
        console.log(index);
        this.activeIndex = index;
      },
      handleDcChange(dc) {
        if (this.searchPriceItem && this.searchPriceItem.id) {
          this.getItemPrice(this.searchPriceItem.id);
        }
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
        searchItemByName(queryString).then((res) => {
          console.log(res);
          callback(res);
          this.searchItemName = queryString;
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
            this.searchPriceRes = [];
            this.loading_searchPrice = false;
          })
          .then(({ entries = [] }) => {
            this.searchPriceRes = entries;
            this.loading_searchPrice = false;
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
      fmtCoin(value) {
        return value.toLocaleString("en-US");
      },
      fmtTime(value, isSeconds = true) {
        let time = new Date(isSeconds ? value * 1000 : value);
        let format = "MM-dd hh:mm:ss";
        // let format = "yyyy-MM-dd hh:mm:ss";
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
      },
    },
  });
}

// 获取价格
function getPrice(itemId, dc = "LuXingNiao", size = 10) {
  if (!itemId) return null;
  return fetchGet(
    `https://universalis.app/api/history/${dc}/${itemId}?entries=${size}`
  );
}

// 通过名称搜索物品
function searchItemByName(name) {
  if (!name) return null;
  let url = apiHost + "/search";
  let params = {
    indexes: "item",
    filters: "ItemSearchCategory.ID>=1",
    string: name,
    columns: "ID,Icon,Name,Url",
    limit: 50,
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
      console.log(key);
      return `${key}=${params[key]}`;
    })
    .join("&");
}
