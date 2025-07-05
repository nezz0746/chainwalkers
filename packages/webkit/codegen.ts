import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "./src/graphql.ts": {
      schema:
        "https://api.studio.thegraph.com/query/958/cww-opt/version/latest",
      documents: "./documents/chainwalkerworld.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {},
    },
  },
};

export default config;
