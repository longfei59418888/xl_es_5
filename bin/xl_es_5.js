#!/usr/bin/env node

var path = require('path');
var argv = require('yargs').argv
var program = require('commander')
var shell = require('shelljs')
const {exec} = require('child_process')
var babel = require('../lib/babel.js')
const chalk = require('chalk')
// 如果存在本地的命令，执行本地的
try {
    var localWebpack = require.resolve(path.join(process.cwd(), "node_modules", "xl_es_5", "bin", "xl_es_5.js"));
    if (__filename !== localWebpack) {
        return require(localWebpack);
    }
} catch (e) {
}


let package = JSON.parse(shell.cat(path.join(__dirname, '../package.json')))


program
    .version(package.version)
    .usage('[cmd] [options]')
    .option('-o', '输出目录')
    .option('-c', '压缩')
    .option('-m', '混淆')
program
    .command('start <file>')
    .description('上传某一个文件，或者所有文件')
    .action((file, options) => {
        let input = path.join(process.cwd(),file)
        let output = input.replace(/.(js|jsx)$/,'.min.$1')
        let backPath = input.replace(/.(js|jsx)$/,'.back.$1')
        let {o = output, c = true, m = false} = argv
        if(!path) {
            console.log(chalk.red('输入编码文件'))
            return
        }
        babel(input,backPath,()=>{
            exec(`uglifyjs ${backPath} -o ${o} -c -m `,{},(error,stdout,stderr)=>{
                if(error){
                    console.log(chalk.red(`exec error':${error}`))
                    return
                }
                shell.rm('-rf', backPath);
                console.log(chalk.blue(`exec : ${chalk.yellow('成功')}`))
            })
        })


    })
program.parse(process.argv)
