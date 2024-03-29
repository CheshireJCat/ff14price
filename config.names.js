// 富婆衣
const richTags = [
  '法外执行者',
  '校园',
  '开心',
  '前沿',
  '小牛皮',
  '南洋海滨',
  '达尔马斯卡',
  '都市',
  '叛逆',
  '夏季靛蓝',
  '雨兜',
  '雨衣',
  '雨靴',
  '私语呢绒',
  '花花公子',
  '风尚',
  '阿拉米格长外衣',
  '冒险者毛衣',
  '拉札罕秋意衬衫',
  '萨维奈秋意',
  '萨维奈',
  '奥黛',
  '道士',
  '法兰绒',
  '翼手龙革皮靴',
  '羊绒毛边帽',
  '蛟蜥革毛边靴',
  '新世界',
  '星绢布长袍',
  '幸存者',
  '月火',
  '远征',
  '风绢',
  '恐龙革礼鞋',
  '高贵',
  '鹰猎人',
  '部队',
  '朴素长裙',
  '艺术眼镜',
  '弦月',
  '豹纹',
  '金边墨镜',
  '春意',
  '水手',
  '平纹',
  '轻钢',
  '冰河',
  '高地'
];
// 收藏列表
const tags = [
  "G14",
  "G13",
  "G10",
  "休闲",
  "发型样式：黎明辫",
];
const rebuild4 = {
  name: "四期重建奖励",
  data: [
    "休闲外套装备箱",
    "翠绿隔离墙",
    "演技教材·吃饭团",
    "演技教材·扫地",
    "大壳蟹角笛",
    "田园圆点阳伞",
  ],
};
const rebuid = {
  name: "往期重建",
  data: [
    "巫菲提角笛",
    "硕山羊角笛",
    "白化黑羊号角",
    "手艺工作服",
    "手艺背心",
    "手艺围裙装",
    "手艺皮鞋",
    "发型样式：传奇",
    "发型样式：斜刘海",
    "发型样式：圣翼",
    "演技教材·背靠",
    "演技教材·看书",
    "小刻耳柏洛斯",
  ],
};
const dye = {
  name: "染剂",
  data: [
    "无瑕白染剂",
    "煤玉黑染剂",
    "龙骑蓝染剂",
    "樱桃粉染剂",
    "宝石红染剂",
    "炮铜黑染剂",
    "珍珠白染剂",
  ],
};
const stones = {
  name: "魔晶石",
  data: (() => {
    let stones = [
      "达识",
      "博识",
      "器识",
      "巨匠",
      "名匠",
      "魔匠",
      "武略",
      "神眼",
      "雄略",
    ];
    stones = stones
      .map((item) => item + "魔晶石柒型")
      .concat(stones.map((item) => item + "魔晶石捌型"));
    return stones;
  })(),
};
const maps = {
  name: '挖宝图',
  data: [
    '鞣革制的隐藏地图',
    '陈旧的鞣革地图',
    '陈旧的山羊革地图',
    '陈旧的巨蟾蜍革地图',
    '陈旧的野猪革地图',
    '陈旧的毒蜥蜴革地图',
    '陈旧的古鸟革地图',
    '陈旧的飞龙革地图',
    '陈旧的巨龙革地图',
    '陈旧的迦迦纳怪鸟革地图',
    '陈旧的瞪羚革地图',
    '陈旧的绿飘龙革地图',
    '陈旧的缠尾蛟革地图',
    '陈旧的赛加羚羊革地图',
    '陈旧的金毗罗鳄革地图'
  ]
};
// 常用查询
const tabTags = [
  // rebuild4,
  // rebuild,
  // stones,
  dye,
  maps
];