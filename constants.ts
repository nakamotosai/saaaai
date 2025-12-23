import { Project } from './types';
import heroBackground from './assets/hero.jpg';
import project1 from './assets/1.png';
import project2 from './assets/2.png';
import project3 from './assets/3.png';
import project4 from './assets/4.png';
import project5 from './assets/5.png';
import photoA from './assets/a.png';
import photoB from './assets/b.png';
import photoC from './assets/c.png';
import photoD from './assets/d.png';
import photoE from './assets/e.png';
import photoF from './assets/f.png';
import photoG from './assets/g.png';
import photoH from './assets/h.png';

// --- 全局图片资源配置 (SITE IMAGES) ---
// 可以在这里修改网站的背景图、装饰纹理等
export const SITE_IMAGES = {
  // 网站主背景图 (Tokyo Urban Night)
  mainBackground: heroBackground,

};

export const PHOTO_WALL = [
  { id: 1, front: photoA, back: photoE },
  { id: 2, front: photoB, back: photoF },
  { id: 3, front: photoC, back: photoG },
  { id: 4, front: photoD, back: photoH },
];

// --- 个人信息配置 (PROFILE) ---
export const PROFILE = {
  name: "中本蔡",
  role: "上海人在东京",
  bio: "从零开始的AI编程生活",
  yearsInJapan: "自2017年",
  officialAccount: "假装在东京", // 公众号名称
  officialAccountUrl: "https://mp.weixin.qq.com/s/aBGdpk2tCOny1RPp4S58PQ", // 公众号链接 (如果有)
  avatarIcon: "User", // 图标名称 (仅供参考，修改需改代码)
};

// --- 网站基础配置 (SITE META) ---
export const SITE_META = {
  domainName: "saaaai.com",
  logoTitle: "saaa",
  logoHighlight: "ai",
  email: "sai@saaaai.com",
  copyrightYear: new Date().getFullYear(),
};

// --- 关于我板块配置 (ABOUT SECTION) ---
export const ABOUT = {
  titleStart: "Shanghai >",
  titleEnd: "Tokyo",
  description: "我是老蔡，生活在东京的80后上海奶爸。\n写过上百万字的文章，但不会写一行代码，刚接触AI不久。\n在代码与文字之间，记录移民日本后的心得体会。",
  flightPath: {
    start: "SHANGHAI",
    end: "TOKYO"
  },
  tags: {
    profileTitle: "Profile",
    profileList: [
      "80后 / 创业者",
      "上海出身 / 现居东京",
      "一儿一女 / 定居8年+"
    ],
    interestsTitle: "Interests",
    interestList: ['AI', '写作', '摄影', '美食', '旅游', '交友']
  },
  ctaButton: "联系本人",
  wechatId: "a16z88"
};

// --- 作品列表 (PROJECTS) ---
// 修改这里的图片链接 (image) 即可更新滚动卡片的图片
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "从日本看中国",
    category: "日本媒体视角下的中国新闻",
    image: project1,
    description: "原汁原味、实时抓取",
    url: "https://cn.saaaai.com/"
  },
  {
    id: 2,
    title: "中日说",
    category: "说中文出日文的AI输入助手",
    image: project2,
    description: "毫秒级语音识别，快到没边",
    url: "https://input.saaaai.com/"
  },
  {
    id: 3,
    title: "假装在东京",
    category: "移民日本以来200多篇心得记录",
    image: project3,
    description: "一路走来，感谢各位支持",
    url: "https://mp.weixin.qq.com/s/aBGdpk2tCOny1RPp4S58PQ"
  },
  {
    id: 4,
    title: "心流日语",
    category: "基于SRS原理极速背日语单词",
    image: project4,
    description: "（早期开发阶段，敬请期待）",
    url: "https://jp.saaaai.com/"
  },
  {
    id: 5,
    title: "毒舌戒烟",
    category: "一个想骂醒你的AI戒烟助手",
    image: project5,
    description: "（早期开发阶段，敬请期待）",
    url: "https://quit.saaaai.com/"
  }
];

// --- 社交媒体链接 (SOCIAL) ---
export const SOCIAL_LINKS = [
  { platform: "Twitter / X", url: "#" },
  { platform: "WeChat: a16z88", url: "#" },
  { platform: "GitHub", url: "https://github.com/nakamotosai/" }
];

// --- 导航栏链接 (NAV) ---
export const NAV_LINKS = [
  { label: "我的项目", id: "projects" },
  { label: "关于我", id: "about" },
  { label: "联系我", id: "contact" }
];