import {
  _SubgraphErrorPolicy_,
  Biome_OrderBy,
  getSdk as chainWalkerWorldSdk,
  OrderDirection,
  World_OrderBy,
} from "@cww/webkit/graphql";
import { GraphQLClient } from "graphql-request";
import { base, optimism } from "viem/chains";

const API_KEY = "9e5d68d46c8f27b3b1128cd2ad21e5db";

const urls: Record<number, string> = {
  [base.id]:
    "https://subgraph.satsuma-prod.com/541dfde21f82/nezzars-personnal--22386/cww-base/api",
  [optimism.id]:
    "https://subgraph.satsuma-prod.com/541dfde21f82/nezzars-personnal--22386/cww-opt/api",
};

export class GameApi {
  private clients: Record<number, GraphQLClient>;

  constructor() {
    this.clients = Object.fromEntries(
      Object.entries(urls).map(([chainId, url]) => [
        chainId,
        new GraphQLClient(url, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ])
    );
  }

  worlds() {
    return Promise.all(
      Object.entries(this.clients).map(([chainId, client]) =>
        chainWalkerWorldSdk(client)
          .worlds({
            first: 1,
            worlds_biomes_orderBy: Biome_OrderBy.GrowthRate,
            worlds_biomes_orderDirection: OrderDirection.Desc,
            subgraphError: _SubgraphErrorPolicy_.Allow,
          })
          .then((res) =>
            res.worlds.map((w) => ({
              ...w,
              chainId: Number(chainId),
            }))
          )
      )
    ).then((worlds) => {
      console.log({ worlds });
      return worlds.flatMap((w) => w);
    });
  }
}
