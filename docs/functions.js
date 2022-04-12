const inquirer = require('inquirer')
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const fs = require('fs');

const rawdata = fs.readFileSync('./docs/text.json');
const text = JSON.parse(rawdata);

async function loadHeader(add = '') {
    console.log(
        chalk.yellow(
            figlet.textSync('B.F. PARTY ' + add, { horizontalLayout: 'full' })
        )
    );
}

async function loadAuth() {
    const questions = [{
            name: 'username',
            type: 'input',
            message: 'Enter your username:',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username';
                }
            }
        },
        {
            name: 'password',
            type: 'input',
            message: 'Enter your passphrase:',
            validate: function(value) {
                // nanopass floor 100 eth
                if (value == 'nanopass floor 100 eth') {
                    return true;
                } else {
                    return 'Please enter correct phrase';
                }
            }
        }
    ]
    return inquirer.prompt(questions)
}

async function getBack() {
    inquirer.prompt({
        type: 'input',
        name: 'back',
        message: 'Type Enter to get back to the menu'
    }).then(
        r => {
            clear()
            loadMenu()
        }
    )
}

async function loadMenu() {
    loadHeader('MENU')
    const menuList = {
        type: 'list',
        name: 'choice',
        message: 'Menu:',
        choices: ['What is BF Party?', 'FAQ', 'Links', 'Team', 'Check yourself'],
    };

    inquirer.prompt(menuList).then(ans => {
        if (ans.choice == 'What is BF Party?') {
            clear()
            loadHeader('WHAT IS')
            console.log(text['whatIs'])
            getBack()
        } else if (ans.choice == 'FAQ') {
            clear()
            loadHeader('FAQ')
            console.log(text['faq'])
            getBack()
        } else if (ans.choice == 'Links') {
            clear()
            loadHeader('LINKS')
            console.log(text['links'])
            getBack()
        } else if (ans.choice == 'Team') {
            clear()
            loadHeader('TEAM')
            console.log(text['team'])
            getBack()
        } else if (ans.choice == 'Check yourself') {
            question1()
        }
    })
}

async function question1(addition = '') {
    clear()
    loadHeader('TRIVIA')

    const questions = {
        type: 'list',
        name: 'first',
        message: 'Can you earn money while playing?' + addition,
        choices: ['No, I buy NFT for nothing', 'Yes, but I need to stake NFT and play', 'Yes, game is P2E', 'TBA'],
    }
    inquirer.prompt(questions).then(ans => {
        if (ans.first == questions.choices[2]) {
            question2()
        } else {
            question1(' (try again)')
        }
    })
}

async function question2(addition = '') {
    clear()
    loadHeader('TRIVIA')
    const questions = {
        type: 'list',
        name: 'first',
        message: 'Which metaverse this game belongs too?' + addition,
        choices: ['Llamaverse', 'Sandbox', 'Project Gojira', 'Nanopass'],
    }
    inquirer.prompt(questions).then(ans => {
        if (ans.first == questions.choices[3]) {
            question3()
        } else {
            question2(' (try again)')
        }
    })
}

async function question3(addition = '') {
    clear()
    loadHeader('TRIVIA')
    const questions = {
        type: 'list',
        name: 'first',
        message: 'Can I test the game right now?' + addition,
        choices: ['Yes, demonstration is available on the website', 'No, the funds from mint will go to start the developement', 'No, only holders have an access to the game', 'Yes, but you need to be whitelisted before'],
    }
    inquirer.prompt(questions).then(ans => {
        if (ans.first == questions.choices[0]) {
            question4()
        } else {
            question3(' (try again)')
        }
    })
}

async function question4(addition = '') {
    clear()
    loadHeader('TRIVIA')
    const questions = {
        type: 'list',
        name: 'first',
        message: 'Can I use nanopass somehow?' + addition,
        choices: ['No, it is completely useless', 'Yes, it gives me instant whitelist in BF Party', 'Yes, I can buy WL for fragments from staking', 'Yes, it offers me a free mint'],
    }
    inquirer.prompt(questions).then(ans => {
        if (ans.first == questions.choices[2]) {
            clear()
            loadHeader('TRIVIA')
            console.log('Congrats! You are insane party fan!\n')
            getBack()

        } else {
            question4(' (try again)')
        }
    })
}

module.exports = { loadAuth, loadMenu }