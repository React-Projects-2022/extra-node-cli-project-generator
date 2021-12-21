#!/usr/bin/env node

// Los imports
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');

const render = require('./utils/templates').render;

// Obtener las opciones de los templates

const TEMPLATE_OPTIONS = fs.readdirSync(path.join(__dirname, 'templates'));

// console.log(TEMPLATE_OPTIONS);

const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: 'What type of project do you want to generate??',
        choices: TEMPLATE_OPTIONS
    },
    {
        name: 'proyecto',
        type: 'input',
        message: 'What is the name of the project?',
        validate: function(input) {
            if(/^([a-z@]{1}[a-z\-\.\\\/0-9]{0,213})+$/.test(input)) {
                return true;
            }
            return 'The project name can only be 214 characters long and has to start in lowercase or with an at sign.';
        }
    }
];

// console.log(QUESTIONS);
const DIR_ACTUAL = process.cwd();
inquirer.prompt(QUESTIONS).then(answers => {
    const template = answers['template'];
    const proyecto = answers['proyecto'];

    const templatePath = path.join(__dirname, 'templates', template);
    const pathTarget = path.join(DIR_ACTUAL, proyecto);
    if (!createProject(pathTarget)) return;

    createDirectoriesFilesContent(templatePath, proyecto);

    postProccess(templatePath, pathTarget);
});

const createProject = (projectPath) => {
    // Comprobar que no existe el directorio
    if(fs.existsSync(projectPath)) {
        console.log(chalk.red('You cannot create the project because it already exists, try another'));
        return false;
    }
    fs.mkdirSync(projectPath);
    return true;
}

const createDirectoriesFilesContent = (templatePath, projectName) => {
    const listFileDirectories = fs.readdirSync(templatePath);

    listFileDirectories.forEach( item => {
        const originalPath = path.join(templatePath, item);

        const stats = fs.statSync(originalPath);

        const writePath = path.join(DIR_ACTUAL, projectName, item);

        if (stats.isFile() ) {
            let contents = fs.readFileSync(originalPath, 'utf-8');
            contents = render(contents, {projectName});
            fs.writeFileSync(writePath, contents, 'utf-8');
            // Información adicional
            const CREATE = chalk.green('CREATE ');
            const size = stats['size'];
            console.log(`${CREATE} ${originalPath} (${size} bytes)`);
        } else if (stats.isDirectory() ) {
            fs.mkdirSync(writePath);
            createDirectoriesFilesContent(path.join(templatePath, item), path.join(projectName, item));
        }
    })
}

const postProccess = (templatePath, targetPath) => {
    const isNode = fs.existsSync(path.join(templatePath, 'package.json'));
    
    if (isNode) {
        shell.cd(targetPath);
        console.log(chalk.green(`Dependencies installed in: ${targetPath}`));
        const result = shell.exec('npm install');
        if (result.code != 0) {
            return false;
        }
    }
}