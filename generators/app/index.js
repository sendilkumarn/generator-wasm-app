'use strict';

const Generator = require('yeoman-generator');

const { writeFiles } = require('./files');
const { askForInformation } = require('./prompts');

module.exports = class extends Generator {
    async prompting() {
        this.log('Welcome to the WebAssembly application generator');
        this.log('Let us generate application');
        this.props = await this.prompt(askForInformation);
        this.props.lang = 'Rust';
    }

    writing() {
        return writeFiles(this);
    }

    install() {
        this.installDependencies({ bower: false });
    }

    end() {
        this.config.save();
    }
};
