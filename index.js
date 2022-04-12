#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

const { loadAuth, loadMenu } = require('./docs/functions.js');


(async() => {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync('B.F. PARTY AUTH', { horizontalLayout: 'full' })
        )
    );
    await loadAuth()

    clear();

    await loadMenu()
})()