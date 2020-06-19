#!/usr/bin/env node
// console.log("hello", process.argv);

const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer"); //命令行答询
const handlebars = require("handlebars"); //修改字符
const ora = require("ora"); //命令行中加载状态标识
const chalk = require("chalk"); //命令行输出字符颜色
const logSymbols = require("log-symbols"); //命令行输出符号
const fs = require("fs");
program.version("1.0.0");

const templates = {
  vue: {
    url: "https://github.com:promotion-xu/tsx-component",
    downloadUrl: "https://github.com:promotion-xu/tsx-component#master",
    description: "xuzhen脚手架测试模板a",
  },
  react: {
    url: "https://github.com:promotion-xu/react-app",
    downloadUrl: "https://github.com:promotion-xu/react-app#msater",
    description: "xuzhen脚手架测试模板b",
  },
};

program
  .command("init <template> <project>")
  .description("初始化项目模板")
  .action((templateName, projectName) => {
    console.log(templateName, projectName);
    let { downloadUrl } = templates[templateName];
    const spinner = ora("正在下载模板...").start();
    //第一个参数是github仓库地址，第二个参数是创建的项目目录名，第三个参数是clone
    download(downloadUrl, projectName, { clone: true }, (err) => {
      if (err) {
        spinner.fail("项目模板下载失败");
      } else {
        spinner.succeed("项目模板下载成功");
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "请输入项目名称",
              default: projectName,
            },
            {
              type: "input",
              name: "description",
              message: "请输入项目简介",
              default: "",
            },
            {
              type: "input",
              name: "author",
              message: "请输入作者名称",
              default: "",
            },
          ])
          .then((answers) => {
            //根据命令行答询结果修改package.json文件
            let packsgeContent = fs.readFileSync(
              `${projectName}/package.json`,
              "utf8"
            );
            let packageResult = handlebars.compile(packsgeContent)(answers);
            fs.writeFileSync(`${projectName}/package.json`, packageResult);
            //用chalk和log-symbols改变命令行输出样式
            console.log(
              logSymbols.success,
              chalk.green("模板项目文件准备成功")
            );
          });
      }
    });
  });

program
  .command("list")
  .description("查看所有可用模板")
  .action(() => {
    console.log(`
            a   a模板
            b   b模板
            c   c模板
        `);
  });

program.parse(process.argv);
