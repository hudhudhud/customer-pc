<template>
<section>
	<p style="margin-bottom:30px;">导航设置<el-button size="mini" type="text" style="float:right;" @click="reset">重置</el-button></p>
	<el-form  label-width="80px" size="mini">
		<el-form-item label="导航颜色" label-width="130px">
			<el-color-picker v-model="setting.color"></el-color-picker>
		</el-form-item>
		<el-form-item label="导航选中颜色" label-width="130px">
			<el-color-picker v-model="setting.selectedColor"></el-color-picker>
		</el-form-item>
		<draggable 
			:list="setting.list"
			:animation="340"
			group="navGroup"
			handle=".tab-bar-item">
		<div v-for="(item, index) in setting.list" :key="index" class="tab-bar-item">
			<span class="close-btn" @click="setting.list.splice(index, 1)">
				<i class="el-icon-close" />
			</span>
			<i class="option-drag fa fa-bars" style="position: absolute;top: 5px;left: 5px;color:#999;" title="移动" />
			<el-form-item label="显示文本">
				<el-input v-model="item.text" />
			</el-form-item>
			<!-- <el-form-item label="导航名称（唯一）" class="no-line-height">
				<el-input v-model="item.name" :readonly="item.name=='home'||item.name=='mine'"/>
			</el-form-item> -->
			<el-form-item label="导航图标">
				<div class="icons-dialog-editor">
					<div class="show-icon"><i :class="item.iconPath" :style="`color:${setting.color}`"></i></div>
					<el-button style="border:none;" @click="openIconsDialog(item,'iconPath')">
						选择图标
					</el-button>
				</div>
				<!-- <el-input v-model="item.iconPath" /> -->
				<!-- <ImageUploader @success="uploadSuccess($event,item,'iconPath')"></ImageUploader> -->
			</el-form-item>
			<el-form-item label="导航选中图标">
				<div class="icons-dialog-editor">
					<div class="show-icon"><i :class="item.selectedIconPath?item.selectedIconPath:''" :style="`color:${setting.selectedColor}`"></i></div>
					<el-button style="border:none;" @click="openIconsDialog(item,'selectedIconPath')">
						选择图标
					</el-button>
				</div>
				<!-- <el-input v-model="item.selectedIconPath" /> -->
				<!-- <ImageUploader @success="uploadSuccess($event,item,'selectedIconPath')"></ImageUploader> -->
			</el-form-item>
			<el-form-item label="绑定栏目" v-if="item.name=='mine'">
				<el-select v-model="item.itemId" size="mini" key="items">
					<el-option :value="it.id+''" :label="it.name" v-for="(it,i) of itemList" :key="i"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="数据类型" v-if="item.name=='mine'">
				<el-checkbox-group v-model="item.dataType">
						<el-checkbox v-for="(opt,i) of options" :label="opt.value" :key="i">{{opt.label}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="默认选中">
				<el-switch v-model="item.defaultAction" @change="onChangeAction($event, item)" />
			</el-form-item>
			<el-form-item label="点击事件" v-if="item.name!='home'&&item.name!='mine'">
				<ActionEditor v-model="item.onClick"/>
			</el-form-item>
			<!-- <el-form-item label="点击事件">
				<ActionEditor v-model="item.onClick"/>
			</el-form-item> -->
		</div>
		</draggable>
		<div style="margin-left: 20px">
			<el-button icon="el-icon-circle-plus-outline" type="text" @click="add">添加项</el-button>
		</div>
	</el-form>
	<icons-dialog :visible.sync="iconsVisible" :current="currentItem[currentKey]" @select="setIcon" :colorEnable="false" />
</section>
</template>
<script>
import ImageUploader from "./ImageUploader"
import IconsDialog from '../IconsDialog'
import ActionEditor from './ActionEditor'
import draggable from 'vuedraggable'
export default {
  props: ["value", "propDef"],
  components: {ImageUploader,IconsDialog,ActionEditor,draggable},
  data () {
    return {
			setting:{},
			iconsVisible:false,
			currentItem:{},
			currentKey:'',
			options: [{label: '文章', value: 'article'}, {label: '视频', value: 'video'}, {label: '问答', value: 'question'}],
			checked: []
    }
  },
  watch: {
    value :{
			handler(val) {
				this.setting = val || this.$api.deepClone(this.propDef.default)
				this.setting.list.forEach((item) => {
					if (item.name == 'mine' && !item.dataType) {
						item.dataType = ['article','video','question']
					}
				})
			},
			immediate:true,
		},
    setting: {
      handler: function (val) {
        this.$emit("input", val)
      },
      deep: true,
			immediate:true,
    }
  },
	computed:{
    itemList(){
      return this.$store.state.itemList
    }
  },
  methods: {
		reset() {
			this.setting = this.$api.deepClone(this.propDef.default)
		},
    add () {
			// let name = this.setting.list.length > 0 ? this.setting.list[this.setting.list.length - 1].name : 0
			// if (typeof name == 'string') {
			// 	name = 1
			// } else {
			// 	name += 1
			// }
			let name = new Date().getTime()
      this.setting.list.push({
        pagePath: "",
        text:"导航",
        iconPath:"el-icon-star-on",
        selectedIconPath:"el-icon-star-on",
        name,
				defaultAction: false,
        onClick:{
          type: "none",
          action: null
        }
      })
    },
		openIconsDialog(item,key){
			this.currentItem = item
			this.currentKey = key
			this.iconsVisible = true
		},
		setIcon(val) {
			this.currentItem[this.currentKey] = val
			if(this.currentKey=="iconPath"){
				this.currentItem['selectedIconPath'] = val
			}
		},
		uploadSuccess (res,item,key) {
			item[key] = res
		},
		onChangeAction(v,item) {
			if (v) {
				this.setting.list.forEach(it => {
					if (it.name != item.name) {
						it.defaultAction = false
					}
				})
			}
		}
	}
}
</script>
<style scoped lang="stylus">
.tab-bar-item{
  padding: 20px 6px 5px 6px;
  background: #f8f8f8;
  position: relative;
  border-radius: 4px;
  .close-btn{
    position: absolute;
    right: 0px;
    top: 0px;
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    z-index: 1;
    cursor: pointer;
    font-size: 12px;
    &:hover{
      background: rgba(210, 23, 23, 0.5)
    }
  }
  & + .tab-bar-item{
    margin-top: 18px;
  }
}
.el-form{
	/deep/.el-form-item--mini.el-form-item{
		margin-bottom:10px;
	}
}

.icons-dialog-editor{
  display:flex;
  align-items:center;  
	.show-icon{
		width:40px;
		height:40px;
		padding: 4px;
		border: 1px solid #e6e6e6;
		display:flex;
		align-items: center;
		justify-content: center;
		box-sizing border-box
	}
}
</style>
