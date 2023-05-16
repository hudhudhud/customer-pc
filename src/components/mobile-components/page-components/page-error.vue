<template>
    <section>
    {{itemDef.type}}  error components
    </section>
</template>
<script>
export default {
    name:'error',
    props:['itemDef']
}
</script>

<style scoped>
section{
    color:red;
    height:30px;
    line-height:30px;
}
</style>