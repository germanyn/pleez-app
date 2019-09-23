module.exports = {
  "roots": [
    // TODO descomentar quando colocar o front
    // "<rootDir>/src",
    "<rootDir>/api/src",
  ],
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'graphql'],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.graphql$": "<rootDir>/api/node_modules/graphql-import-node/jest"
  }
}