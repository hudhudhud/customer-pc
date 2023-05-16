<template>
    <section>
        <el-form>
            <div v-for="(item, index) in attArray" :key="index" class="reg-item" style="padding: 0 12px 12px 12px;">
                <span class="close-btn" @click="attArray.splice(index, 1)">
                    <i class="el-icon-close" />
                </span>
                <el-form-item label="属性名称" style="margin-bottom: 0;">
                    <el-input v-model="item.name" placeholder="请输入属性名称" />
                </el-form-item>
                <el-form-item label="属性值" style="margin-bottom:0">
                    <el-input v-model="item.value" placeholder="请输入属性值" />
                </el-form-item>
            </div>
            <div style="margin-left: 20px">
              <el-button icon="el-icon-circle-plus-outline" type="text" @click="addAttr">
                添加属性
              </el-button>
            </div>
        </el-form>
    </section>
</template>
<script>
export default {
    props: ["value", "propDef"],
    watch: {
        attArray (val) {
            this.$emit("input", val)
        },
        value :{
            handler(val) {
                this.attArray = val || []
            },
            immediate:true
        }
    },
    data(){
        return {
            attArray:[],
        }
    },
    methods:{
        addAttr(){
            if(!Array.isArray(this.attArray)){
                this.attArray=[]
            }
            this.attArray.push({
                name: '',
                value: ''
            })
        },
    }
}
</script>
<style scoped>

</style>