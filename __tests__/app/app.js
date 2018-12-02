'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('wasm:app', () => {
    beforeAll(() => {
        return helpers.run(path.join(__dirname, '../../generators/app')).withPrompts({
            appName: 'wasm-app',
            appDesc: 'sample test app',
            bundler: 'Webpack'
        });
    });

    it('creates files', () => {
        assert.file([
            'package.json',
            'index.html',
            '.gitignore',
            'README.md',
            'webpack.config.js',
            'js/index.js',
            'crate/Cargo.toml',
            'crate/src'
        ]);
    });
});

describe('wasm:app for parcel configuration', () => {
    beforeAll(() => {
        const options = {
            appName: 'wasm-app',
            appDesc: 'sample test app',
            bundler: 'Parcel'
        };

        return helpers
            .run(path.join(__dirname, '../../generators/app'))
            .withPrompts(options);
    });

    it('creates files', () => {
        assert.file([
            'package.json',
            'index.html',
            '.gitignore',
            'README.md',
            'js/index.js',
            'crate/Cargo.toml',
            'crate/src'
        ]);
    });
});
