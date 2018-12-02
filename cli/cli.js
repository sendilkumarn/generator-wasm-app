#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const { logger, createYeomanEnv, getCommand, done } = require('./utils');
const pkg = require('../package.json');

const version = pkg.version;

const env = createYeomanEnv();

const runYoCommand = cmd => {
    const command = getCommand(cmd);
    try {
        logger.info(chalk.green(' Running WebAssembly generator 🚗 '));
        env.run(command, done);
    } catch (e) {
        logger.error(e.message, e);
    }
};

program
    .version(version)
    .usage('[command] [options]')
    .allowUnknownOption();

program.parse(process.argv);

runYoCommand('app');
