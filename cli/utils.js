/* eslint-disable no-console */
const chalk = require('chalk');
const yeoman = require('yeoman-environment');

const SUB_GENERATORS = require('./commands');

const CLI_NAME = 'wasm-app';
const GENERATOR_NAME = 'generator-wasm-app';

const debug = msg => {
    if (this.debugEnabled) {
        console.log(`${chalk.blue('DEBUG!')}  ${msg}`);
    }
};

const info = msg => console.info(msg);

const log = msg => console.log(msg);

const error = (msg, trace) => {
    console.error(`${chalk.red.bold('ERROR!')} ${chalk.red(msg)}`);
    if (trace) {
        console.log(trace);
    }
    process.exit(1);
};

const init = program => {
    program.option('-d, --debug', 'enable debugger');

    const argv = program.normalize(process.argv);
    /* eslint-disable */
    this.debugEnabled = program.debug = argv.includes('-d') || argv.includes('--debug'); // Need this early

    if (this.debugEnabled) {
        info('Debug logging is on');
    }
};

const logger = {
  init,
  debug,
  info,
  log,
  error
};

const getCommand = cmd => `${CLI_NAME}:${cmd}`;

const done = () => {
  logger.info(chalk.green.bold('Hooray!!! Application generated'));
};

const createYeomanEnv = () => {
  const env = yeoman.createEnv();
  /* Register yeoman generators */
  Object.keys(SUB_GENERATORS).forEach(generator => {
    env.register(
      require.resolve(`../generators/${generator}`),
      `${CLI_NAME}:${generator}`
    );
  });
  return env;
};

module.exports = {
  CLI_NAME,
  GENERATOR_NAME,
  toString,
  logger,
  getCommand,
  done,
  createYeomanEnv
};
