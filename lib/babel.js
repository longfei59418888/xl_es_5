const chalk = require('chalk')
const path = require('path')
const {exec, spawn} = require('child_process')
module.exports = (input, ouput, bak) => {
    let babelrc = path.join(__dirname, '../.babelrc')
    let babel = path.join(__dirname, '../node_modules/babel-cli/bin/babel.js')
    exec(`${babel} ${input} -o ${ouput} --config-file=${babelrc}`, {}, (error, stdout, stderr) => {
        if (error) {
            console.log(chalk.red(`exec error':${error}`))
            return
        }
        bak()
    })
}
