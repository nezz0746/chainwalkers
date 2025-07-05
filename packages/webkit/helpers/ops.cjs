const {
  getIntrospectionQuery,
  parse,
  buildClientSchema,
  print,
} = require("graphql");
const { buildOperationNodeForField } = require("@graphql-tools/utils");
const axios = require("axios").default;
const fs = require("fs/promises");

async function getSchemaFromUrl(url) {
  const response = await axios
    .post(url, { query: getIntrospectionQuery({}).toString() })
    .catch((e) => console.log(e));

  return buildClientSchema(response.data.data);
}

const pullSchema = async function ({
  schemaUrl,
  fileName,
  operations,
  depthLimit,
  removeLastArg,
}) {
  const schema = await getSchemaFromUrl(schemaUrl);

  const operationsDictionary = {
    query: { ...(schema.getQueryType()?.getFields() || {}) },
  };

  let documentString = "";
  for (const operationKind in operationsDictionary) {
    for (const operationName in operationsDictionary[operationKind]) {
      if (operations && !operations.includes(operationName)) {
        continue;
      }

      // Removing subgraphError argument from the query
      if (removeLastArg) {
        operationsDictionary[operationKind][operationName].args.pop();
      }

      // List of queries to remove
      const exclude = ["_meta"];

      if (exclude.includes(operationName)) {
        continue;
      }

      const operationAST = buildOperationNodeForField({
        schema,
        kind: operationKind,
        field: operationName,
        depthLimit: depthLimit || 4,
      });

      // Hardcoding naming fixes
      operationAST.name.value = operationAST.name.value.replace("_query", "");

      // Ensure all variables used in the selection set are defined
      const usedVariables = new Set();
      const collectVariables = (selectionSet) => {
        if (!selectionSet || !selectionSet.selections) return;
        selectionSet.selections.forEach((selection) => {
          if (selection.arguments) {
            selection.arguments.forEach((arg) => {
              if (arg.value.kind === "Variable") {
                usedVariables.add(arg.value.name.value);
              }
            });
          }
          if (selection.selectionSet) {
            collectVariables(selection.selectionSet);
          }
        });
      };
      collectVariables(operationAST.selectionSet);

      operationAST.variableDefinitions =
        operationAST.variableDefinitions.filter((v) =>
          usedVariables.has(v.variable.name.value)
        );

      documentString += print(operationAST);
    }
  }

  await fs.writeFile(
    `./documents/${fileName}.graphql`,
    documentString,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  return documentString;
};

const main = async function () {
  const urls = [
    {
      schemaUrl:
        "https://api.studio.thegraph.com/query/958/cww-opt/version/latest",
      fileName: "chainwalkerworld",
      depthLimit: 3,
    },
  ];

  let documentString = "";

  for (const url of urls) {
    documentString += await pullSchema(url);
  }

  return parse(documentString);
};

main();
