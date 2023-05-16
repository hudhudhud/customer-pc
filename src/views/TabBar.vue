<template>
	<van-tabbar v-if="pageConf.tabBarSetting" v-model="activeNav" class="bottom-nav" :fixed="false"  @change="tabChange"
		:inactive-color="pageConf.tabBarSetting.color"
		:active-color="pageConf.tabBarSetting.selectedColor">
		<van-tabbar-item :name="item.name" icon="item.icon" v-for="(item,i) of pageConf.tabBarSetting.list" :key="i">
			<span>{{item.text}}</span>
			<template #icon="props">
				<img v-if="item.iconPath.startsWith('http')" :src="props.active ? item.selectedIconPath : item.iconPath" />
				<i v-else :class="props.active ? item.selectedIconPath : item.iconPath" />
			</template>
		</van-tabbar-item>
	</van-tabbar>
	<van-tabbar v-else v-model="activeNav" class="bottom-nav" :fixed="false"  active-color="#1989fa" inactive-color="#7d7e80">
		<van-tabbar-item name="home">
			<span>首页</span>
			<template #icon="props">
				<i class="el-icon-s-home" />
			</template>
		</van-tabbar-item>
		<van-tabbar-item name="mine">
			<span>我的</span>
			<template #icon="props">
				<i class="el-icon-s-custom" />
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem ,Toast } from 'vant';
export default {
	components:{
		[Tabbar.name]:Tabbar,
		[TabbarItem.name]:TabbarItem
	},
	props:['pageConf'],
	data(){
		return {
			activeNav:'home'
		}
	},
	methods:{
		tabChange(active){
			console.log(active)
			let item = this.pageConf.tabBarSetting.list.find(it=>it.name==active)
            let onClick = item.onClick;
            if (!onClick || !onClick.type || onClick.type==='none') {
              return;
            }
            // if (onClick.type == 'msg') {
            //     Toast(onClick.action)
            // }
			// else{
				this.$message.warning({ message:'请在手机上测试！', duration:5000 });
			// }
		}
	}
}
</script>
