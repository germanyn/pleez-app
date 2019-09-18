module.exports = {
  client: {
    includes: [__dirname+'/src/graphql/**/*.graphql'],
    service: {
      name: "pleez-app",
      localSchemaFile: [
        "./src/graphql/my_schema1.graphql",
        "./src/graphql/my_schema2.graphql"
      ]
    }
  }
}