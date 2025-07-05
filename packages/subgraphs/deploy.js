const newVersion = process.argv[2];
const chainId = process.argv[3];

// Check if argument is present, throw error if not
if (!newVersion) {
  throw new Error("New Graph Version is required as an argument");
}

const Mustache = require("mustache");
const fs = require("fs/promises");
const { execSync } = require("child_process");

const main = async () => {
  // Loop over an array and deploy a subgraph for each network
  let networks = [
    {
      startBlock: 32480903,
      contractAddress: "0xf87e378AAb32D9c58970A8A358F7670E9F09b7b8",
      network: "base",
      graphName: "cww-base",
      chainId: 8453,
      deployKey: "1lJ0qXT0uMeXH",
    },
    {
      startBlock: 138076187,
      contractAddress: "0xFB3A3B8D93Dc2724cF54300f2ae027c37d2A71a2",
      network: "optimism",
      graphName: "cww-opt",
      chainId: 10,
      deployKey: "1lJ0qXT0uMeXH",
    },
  ];

  if (chainId) {
    networks = networks.filter(
      (network) => network.chainId === parseInt(chainId)
    );
  }

  for (const network of networks) {
    const confiTemplate = await fs.readFile("template.yaml", "utf8");

    const filledConfig = Mustache.render(confiTemplate, network);

    await fs.writeFile(`subgraph.yaml`, filledConfig);

    const getDeployCommand = () => {
      return `graph deploy ${network.graphName} \
  --version-label ${newVersion} \
  --node https://subgraphs.alchemy.com/api/subgraphs/deploy \
  --deploy-key ${network.deployKey} \
  --ipfs https://ipfs.satsuma.xyz`;
    };
    // Execute the following command: graph deploy --studio <graphName>
    // This command will deploy the subgraph to the graph studio
    execSync(getDeployCommand(), {
      stdio: "inherit",
    });
  }
};

main();
