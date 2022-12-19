module.exports = md => {
    const defaultRender = md.renderer.rules.fence;
    md.renderer.rules.fence = (tokens, idx, options, env, self) =>{
        const token = tokens[idx];
        // 判断 fence 是否在 ::: demo 中
        const prevToken = tokens[idx - 1]
        const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);
        if (token.info === 'html' && isInDemoContainer) {
            return md.utils.escapeHtml(token.content)
        } else {
            return defaultRender(tokens, idx, options, env, self);
        }

    }
    return md
}