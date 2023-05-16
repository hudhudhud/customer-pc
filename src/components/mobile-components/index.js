//通过动态获取文件夹下文件来引入需要的模块


// require.context模块导出（返回）一个（require）函数，这个函数可以接收一个参数：request 函数–这里的 request 应该是指在 require() 语句中的表达式

let modules = {}

// directory: 要查找的文件路径
// useSubdirectories: 是否查找子目录
// regExp: 要匹配文件的正则
let requireFun = require.context('.', true, /^\.\/(page-|form-|other-).+\.vue$/)
// 导出的方法有 3 个属性： resolve, keys, id。
// resolve 是一个函数，它返回请求被解析后得到的模块 id。
// keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
// id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到

//['./MyInput.vue','./MySelect.vue']
requireFun.keys().forEach((file)=>{
    let componetName = file.replace(/(\.\/(page-components|form-components|other-components)\/|\.vue)/g, ''); // 'MyInput'
   modules[componetName] = requireFun(file).default || requireFun(file)
})

export default modules

//https://cn.vuejs.org/v2/guide/components-registration.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C