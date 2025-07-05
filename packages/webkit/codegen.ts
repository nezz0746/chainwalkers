import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "./src/graphql.ts": {
      schema:
        "https://subgraph.satsuma-prod.com/541dfde21f82/nezzars-personnal--22386/cww-base/api",
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
