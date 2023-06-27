import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: '../questify_server/gql_schema.graphql',
  documents: ['src/**/*.ts?(x)'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gen/gql/': {
      preset: 'client'
    }
  }
}
 
export default config