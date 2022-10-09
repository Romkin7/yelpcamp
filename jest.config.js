/** @type {import('jest').Config} */
const config = {
    verbose: true,
    globalSetup: '<rootDir>/models/tests/globalSetup.js',
    globalTeardown: '<rootDir>/models/tests/globalTeardown.js',
    setupFilesAfterEnv: ['<rootDir>/models/tests/setupFile.js'],
};

module.exports = config;
