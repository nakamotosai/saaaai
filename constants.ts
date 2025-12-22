import { Project } from './types';
import heroBackground from './assets/hero.jpg';
import project1 from './assets/1.png';
import project2 from './assets/2.png';
import project3 from './assets/3.png';
import project4 from './assets/4.png';
import project5 from './assets/5.png';

// --- 全局图片资源配置 (SITE IMAGES) ---
// 可以在这里修改网站的背景图、装饰纹理等
export const SITE_IMAGES = {
  // 网站主背景图 (Tokyo Urban Night)
  mainBackground: heroBackground,

  // 关于我们卡片的背景纹理 (Subtle Texture)
  aboutCardTexture: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2940&auto=format&fit=crop"
};

// --- 个人信息配置 (PROFILE) ---
export const PROFILE = {
  name: "中本蔡",
  role: "上海人 / 现居东京",
  bio: "探索AI与生活的边界",
  yearsInJapan: "8年+",
  officialAccount: "假装在东京", // 公众号名称
  officialAccountUrl: "#", // 公众号链接 (如果有)
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
  titleStart: "Shanghai",
  titleEnd: "Tokyo",
  description: "我是生活在东京的上海人，80后，拥有一儿一女的幸福奶爸。\n热爱探索AI技术的边界，也享受写作带来的思考。在代码与文字之间，记录移民日本后的心得体会。",
  flightPath: {
    start: "SHANGHAI",
    end: "TOKYO"
  },
  tags: {
    profileTitle: "Profile",
    profileList: [
      "80后 / 创业者",
      "上海出身 / 现居东京",
      "一儿一女"
    ],
    interestsTitle: "Interests",
    interestList: ['AI', '写作', '摄影', '美食', '旅游', '交友']
  },
  ctaButton: "LETS TALK",
  wechatId: "a16z88"
};

// --- 作品列表 (PROJECTS) ---
// 修改这里的图片链接 (image) 即可更新滚动卡片的图片
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "从日本看中国",
    category: "NEWS AGGREGATOR",
    image: project1,
    description: "日媒发布的中国新闻聚合站",
    url: "https://cn.saaaai.com/"
  },
  {
    id: 2,
    title: "中日说",
    category: "AI VOICE TOOL",
    image: project2,
    description: "极速AI语音输入助手",
    // url: "#" 
  },
  {
    id: 3,
    title: "假装在东京",
    category: "BLOG & INSIGHTS",
    image: project3,
    description: "移民日本以来的200多篇心得体会",
    // url: "#"
  },
  {
    id: 4,
    title: "fluxJP心流日语",
    category: "EDUCATION",
    image: project4,
    description: "科学方法极速背日语",
    url: "https://jp.saaaai.com/"
  },
  {
    id: 5,
    title: "毒舌戒烟",
    category: "AI ASSISTANT",
    image: project5,
    description: "一个想骂醒你的戒烟助手",
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
  { label: "PROJECTS", id: "projects" },
  { label: "ABOUT", id: "about" },
  { label: "CONTACT", id: "contact" }
];