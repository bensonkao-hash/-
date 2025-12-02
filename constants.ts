import { ChecklistItem, DayPlan } from "./types";

export const TRIP_START_DATE = new Date('2026-03-18T00:00:00');
export const TRIP_END_DATE = new Date('2026-03-22T23:59:59');

export const INITIAL_ITINERARY: DayPlan[] = [
  {
    date: '2026-03-18',
    dayLabel: '第一天：抵達與明洞探索',
    items: [
      { id: '1-1', time: '14:00', activity: '抵達仁川機場 (ICN)', location: '仁川機場 T1/T2', category: 'travel', note: '領取 WiFi 機/SIM 卡 & T-Money 交通卡' },
      { id: '1-2', time: '16:00', activity: '飯店 Check-in', location: '首爾市中心', category: 'other' },
      { id: '1-3', time: '18:00', activity: '明洞街頭美食與購物', location: '明洞商圈', category: 'food', note: '必吃：糖餅、雞蛋糕、草莓大福' },
      { id: '1-4', time: '20:00', activity: '南山首爾塔夜景', location: '南山公園', category: 'sightseeing', note: '可搭乘南山纜車上山' }
    ]
  },
  {
    date: '2026-03-19',
    dayLabel: '第二天：傳統文化巡禮',
    items: [
      { id: '2-1', time: '09:00', activity: '韓服體驗', location: '景福宮周邊', category: 'sightseeing', note: '穿著韓服可免費進入景福宮' },
      { id: '2-2', time: '10:00', activity: '景福宮與光化門', location: '光化門', category: 'sightseeing', note: '記得觀看守門將換崗儀式' },
      { id: '2-3', time: '12:30', activity: '土俗村蔘雞湯', location: '景福宮站', category: 'food', note: '人氣排隊美食' },
      { id: '2-4', time: '14:30', activity: '北村韓屋村', location: '北村', category: 'sightseeing', note: '請保持安靜，尊重當地居民' },
      { id: '2-5', time: '18:00', activity: '仁寺洞傳統茶屋', location: '仁寺洞', category: 'shopping', note: '購買傳統工藝品的好地方' }
    ]
  },
  {
    date: '2026-03-20',
    dayLabel: '第三天：弘大青春活力',
    items: [
      { id: '3-1', time: '10:00', activity: '弘大商圈購物', location: '弘大入口站', category: 'shopping', note: '各式服飾、美妝店林立' },
      { id: '3-2', time: '13:00', activity: '午餐：春川辣炒雞排', location: '弘大', category: 'food' },
      { id: '3-3', time: '15:00', activity: '延南洞咖啡廳巡禮', location: '延南洞', category: 'food', note: '在京義線林蔭道散步' },
      { id: '3-4', time: '19:00', activity: '韓式烤肉晚餐', location: '新村/弘大', category: 'food', note: '搭配燒酒或啤酒' },
      { id: '3-5', time: '21:00', activity: '街頭藝人表演 (Busking)', location: '弘大步行街', category: 'sightseeing' }
    ]
  },
  {
    date: '2026-03-21',
    dayLabel: '第四天：時尚江南與漢江',
    items: [
      { id: '4-1', time: '10:00', activity: '星空圖書館 (Starfield Library)', location: '三成站 COEX Mall', category: 'sightseeing', note: '著名的打卡地標' },
      { id: '4-2', time: '12:00', activity: 'COEX Mall 午餐與購物', location: '江南', category: 'food' },
      { id: '4-3', time: '14:00', activity: '聖水洞 (首爾布魯克林)', location: '聖水洞', category: 'shopping', note: '參觀人氣 Pop-up Store 和文創園區' },
      { id: '4-4', time: '18:00', activity: '漢江公園野餐吃泡麵', location: '汝矣島或盤浦', category: 'food', note: '體驗漢江便利商店煮泡麵' }
    ]
  },
  {
    date: '2026-03-22',
    dayLabel: '第五天：最後採買與返程',
    items: [
      { id: '5-1', time: '09:00', activity: '樂天超市 (Lotte Mart) 採買伴手禮', location: '首爾站', category: 'shopping', note: '海苔、零食、泡麵' },
      { id: '5-2', time: '11:00', activity: '搭乘 AREX 機場快線', location: '首爾站往仁川機場', category: 'travel', note: '直達車約 43 分鐘' },
      { id: '5-3', time: '13:00', activity: '免稅店逛街 & 登機', location: '仁川機場', category: 'travel' }
    ]
  }
];

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  // Essential
  { id: 'e1', text: '護照 (有效期限 6 個月以上)', completed: false, category: 'essential' },
  { id: 'e2', text: '機票 (電子機票/行程單)', completed: false, category: 'essential' },
  { id: 'e3', text: '現金 (韓元/美金/台幣) 與信用卡', completed: false, category: 'essential' },
  { id: 'e4', text: '旅遊平安險/不便險', completed: false, category: 'essential' },
  { id: 'e5', text: '飯店訂房憑證', completed: false, category: 'essential' },
  
  // Tech
  { id: 't1', text: 'eSIM / WiFi 機預約', completed: false, category: 'electronics' },
  { id: 't2', text: '萬用轉接頭 (韓國為雙圓孔 220V)', completed: false, category: 'electronics' },
  { id: 't3', text: '行動電源 (需隨身攜帶上機)', completed: false, category: 'electronics' },
  { id: 't4', text: 'Naver Map App (必裝地圖)', completed: false, category: 'electronics' },
  { id: 't5', text: 'Papago 翻譯 App', completed: false, category: 'electronics' },
  { id: 't6', text: 'Subway Korea 地鐵 App', completed: false, category: 'electronics' },

  // Clothing (March: 5°C - 13°C)
  { id: 'c1', text: '保暖外套 / 風衣 (3月早晚溫差大)', completed: false, category: 'clothing' },
  { id: 'c2', text: '洋蔥式穿搭衣物 (長袖、針織衫)', completed: false, category: 'clothing' },
  { id: 'c3', text: '好走的鞋子 (每日步數很高)', completed: false, category: 'clothing' },
  
  // Toiletries
  { id: 'o1', text: '牙刷/牙膏 (韓國飯店通常不提供)', completed: false, category: 'toiletries' },
  { id: 'o2', text: '個人常備藥品 (感冒、腸胃藥)', completed: false, category: 'toiletries' },
  { id: 'o3', text: '保濕保養品 (韓國氣候乾燥)', completed: false, category: 'toiletries' },
];