// 修改markdown代码块规则
const container = require('markdown-it-container')

module.exports = md => {
    md.use(container, 'code', {
        validate: (params,markup) =>{
            // console.log('匹配code块名称',params,markup);
            return /^code\s*/.test(params.trim())
        },
        render: (tokens, idx, _options, env, slf) => {
            // console.log(tokens, idx, _options, env, slf);
            if (tokens[idx].nesting === 1) {
                const describe = tokens[idx].info.trim().match(/^code\s*(.*)$/)[1] || ''
                const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''; // 获取内部代码块
                return `
                    <code-block>
                        <template v-slot:component><!--code${md.utils.escapeHtml(content)}code--></template>
                        <template v-slot:describe>${md.render(describe)}</template>
                        <template v-slot:code>${md.render(content)}</template>
                `
            }
            return `</code-block>`
        }
    })
    return md
}