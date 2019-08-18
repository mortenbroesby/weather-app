const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname, "../../"),
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "vue",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
    "^.+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$": "jest-transform-stub",
  },
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
    },
  },
  testPathIgnorePatterns: [
    "<rootDir>/test/e2e",
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  snapshotSerializers: ["jest-serializer-vue"],
  coverageDirectory: "<rootDir>/test/unit/coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,vue}",
    "!src/main.ts",
    "!src/router/index.ts",
    "!src/**/*.d.ts",
    "!src/**/*.{test|spec}.ts",
    "!**/node_modules/**",
  ],
  reporters: [
    "default",
    ["jest-junit", {
      output: "./test/unit/reports/junit.xml",
    }],
  ],
};
