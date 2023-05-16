// 页面属性【右面板】
export const pageConf = {
  initFunc:"",//初始化时执行，如需带入员工域账号等信息需要在此
  backgroundColor:'#F5F5F5',
  showTabBar:true,
}

import title from "./title";
import imgList from "./imgList";
import imgTextNav from "./imgTextNav";
import searchBar from "./searchBar";
import swiper from "./swiper";
import datasourceList from "./datasourceList";
import articleList from "./articleList";
import videoList from "./videoList";
import quesList from "./quesList";
import favorList from "./favorList";

export const pageConfigMap = {
  [title.__config__.type]:title,
  [imgList.__config__.type]:imgList,
  [imgTextNav.__config__.type]:imgTextNav,
  [swiper.__config__.type]:swiper,
  [searchBar.__config__.type]:searchBar,
  [datasourceList.__config__.type]:datasourceList,
  [articleList.__config__.type]:articleList,
  [videoList.__config__.type]:videoList,
  [quesList.__config__.type]:quesList,
  [favorList.__config__.type]:favorList
}

//基础组件
export const baseComponents = [
  title,
  imgList,
  imgTextNav,
  swiper,
  searchBar,
  datasourceList,
]

//功能组件
export const businessComponents = [
  articleList,
  videoList,
  quesList,
  favorList
]

//所有组件
export const pageComponents =  Object.values(pageConfigMap)