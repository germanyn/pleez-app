module.exports = {
  client: {
    service: "pleez-app",
    includes: [
      "./client/src/**/*.tsx?",
      "./client/src/**/*.gql",
    ],
    excludes: [
      "node_modules",
      "**/__tests__/**",
      "*.test.tsx?"
    ]
  }
};