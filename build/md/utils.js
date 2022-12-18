const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');
const unescapeHTML = function (str) {
    return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
const compilerTemplate = function(params) {
    // 剔除模板中script内容
    params = unescapeHTML(params)
    const html = params.replace(/<script>[\s\S]*<\/script>/g,'')
    const match = params.match(/<script>([\s\S]*)<\/script>/)
    const script = match?(match[2]||''):''
    return {html,script}
}
const compilerVue = function(template){
    const options = {
        source: `<div>${template.html}</div>`,
        filename: 'inline-demo',
        compiler
    }
    const compiled = compileTemplate(options)
    // const exportObj = template.script.replace(/export\s+default/,'')
    // let demoComponentContent = compiled.code + ''
    let demoComponentContent = `
        ${compiled.code}
    `;

    let script = template.script.trim();
    if (script) {
        script = script.replace(/export\s+default/, 'const democomponentExport =');
    } else {
        script = 'const democomponentExport = {}';
    }
    demoComponentContent = `(function() {
        ${demoComponentContent}
        ${script}
        return {
        render,
        staticRenderFns,
        ...democomponentExport
        }
    })()`;
    return demoComponentContent

}

module.exports = {
    compilerTemplate,
    compilerVue
}