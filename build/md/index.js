// markdown-loader
const md = require( './config.js')
const { compilerTemplate, compilerVue } = require('./utils')


module.exports = function (source,...args) {
    let content = md.render(source),_id=0,componentString=''
    // 正则[\s\S]*匹配所有字符（包括换行符）
    content = content.replace(/<!--code([\s\S]*)code-->/g,(match,$1)=>{
        let commonjs,template,comp
        // 抽离html和script
        template = compilerTemplate($1)
        // vue-loader转换模板字符串成为commonjs模块
        commonjs = compilerVue(template)
        // 生成模块的name注册为当前组件的子组件
        componentString+=`components_demo${_id}:${commonjs},`
        comp = `<components_demo${_id}></components_demo${_id}>`
        _id++
        return comp
    })
    return `
    <template>
        <section class="content unique_doc">${content}</section>
    </template>
    <script>
        export default {
            name: 'unique_doc',
            components: {
                ${componentString}
            }
        }
    </script>
    `
}
