<template>
    <section>
        <el-form>
            <div v-for="(item, index) in eventArray" :key="index" class="reg-item" >
                <span class="close-btn" @click="eventArray.splice(index, 1)">
                    <i class="el-icon-close" />
                </span>
                <el-form-item label="事件名称">
                    <el-input v-model="item.name" placeholder="请输入事件名称" />
                </el-form-item>
                <el-form-item label="事件函数名称" style="margin-bottom:0">
                    <el-input v-model="item.value" placeholder="请输入事件函数名称" />
                </el-form-item>
            </div>
            <div style="margin-left: 20px">
              <el-button icon="el-icon-circle-plus-outline" type="text" @click="addEvent">
                添加事件
              </el-button>
            </div>
        </el-form>
    </section>
</template>
<script>
export default {
    props: ["value", "propDef"],
    watch: {
        eventArray (val) {
            this.$emit("input", val)
        },
        value :{
            handler(val) {
                this.eventArray = val || []
            },
            immediate:true
        }
    },
    data(){
        return {
            eventArray:[],
        }
    },
    methods:{
        addEvent(){
            if(!Array.isArray(this.eventArray)){
                this.eventArray=[]
            }
            this.eventArray.push({
                name: '',
                value: ''
            })
        },
    }
}
</script>
<style scoped>

</style>