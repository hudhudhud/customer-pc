<template>
  <div>
    <div class="bgeditor-type">
      <ImageUploader @success="uploadSuccess"></ImageUploader>
    </div>
    <div class="bgeditor-type">
      <el-input v-model="val"></el-input>
    </div>
  </div>
</template>

<script>
import ImageUploader from "./ImageUploader"

export default {
  props: ["value", "propDef"],
  components: {ImageUploader},
  data () {
    return {
      val: this.value
    }
  },
  watch: {
    value (val) {
      this.val = val
    },
    val (val) {
      this.$emit("input", val)
    }
  },
  methods: {
    uploadSuccess (res) {
      this.val = res
    }
  }
}
</script>

<style scoped>
.bgeditor-type {
  margin-bottom: 5px;
}
</style>
