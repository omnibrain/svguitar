const { readFileSync } = require('fs')

// Jest counterpart of the base64 plugin in rollup.config.ts
module.exports = {
  process(sourceText, sourcePath) {
    const base64 = readFileSync(sourcePath).toString('base64')

    return { code: `module.exports = ${JSON.stringify(base64)}` }
  },
}
