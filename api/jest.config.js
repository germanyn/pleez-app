module.exports = {
  "roots": [
    // TODO descomentar quando colocar o front
    // "<rootDir>/src",
    "<rootDir>/src",
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  "transform": {
    "^.+\\.ts$": "ts-jest"
  }
}