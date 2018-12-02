const path = require('path');

const defaultApplicationName = () =>
    /^[a-zA-Z0-9_]+$/.test(path.basename(process.cwd()))
        ? path.basename(process.cwd())
        : 'wasm-app';

const askForInformation = [
    {
        type: 'input',
        name: 'appName',
        message: 'Name your application?',
        validate: input => {
            if (!/^([a-zA-Z0-9_-]*)$/.test(input)) {
                return 'Your base name cannot contain special characters or a blank space';
            }
            return true;
        },
        default: defaultApplicationName,
        store: true
    },
    {
        type: 'input',
        name: 'appDesc',
        default: 'Name of your awesome WebAssembly application',
        message: 'Describe your application?',
        store: true
    },
    {
        type: 'list',
        name: 'bundler',
        default: 'Webpack',
        choices: ['Webpack', 'Parcel', 'None'],
        store: true
    }
];

module.exports = {
    askForInformation
};
