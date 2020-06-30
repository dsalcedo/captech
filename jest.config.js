module.exports = {
    verbose: true,
    moduleFileExtensions: [
        "js",
        "json",
        // tell Jest to handle `*.vue` files
        "vue"
    ],
    moduleDirectories: ["node_modules", "resources/js/components"],
    transform: {
        // process `*.vue` files with `vue-jest`
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/node_modules/babel-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "resources/js/components/*.{js,vue}",
        "!**/node_modules/**"
    ],
    coverageReporters: [
        "json",
        "html",
        "text-summary"
    ],
};
