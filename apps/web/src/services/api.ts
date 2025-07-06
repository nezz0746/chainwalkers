import {
  _SubgraphErrorPolicy_,
  Biome_OrderBy,
  getSdk as chainWalkerWorldSdk,
  OrderDirection,
} from "@cww/webkit/graphql";
import { GraphQLClient } from "graphql-request";
import { Address } from "viem";
import { base, optimism } from "viem/chains";

const API_KEY = "9e5d68d46c8f27b3b1128cd2ad21e5db";

const urls: Record<number, string> = {
  [base.id]:
    "https://api.studio.thegraph.com/query/958/cww-base/version/latest",
  [optimism.id]:
    "https://api.studio.thegraph.com/query/958/cww-opt/version/latest",
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

  async me(address?: Address) {
    if (!address) {
      return Promise.resolve(undefined);
    }
    return Promise.all(
      Object.entries(this.clients).map(([chainId, client]) =>
        chainWalkerWorldSdk(client)
          .player({
            id: address.toLowerCase(),
            subgraphError: _SubgraphErrorPolicy_.Allow,
          })
          .then((res) => {
            console.log({ res });
            return res.player;
          })
      )
    ).then((res) => {
      return res.flatMap((r) => r).filter(Boolean)[0];
    });
  }

  async worlds() {
    return Promise.all(
      Object.entries(this.clients).map(([chainId, client]) =>
        chainWalkerWorldSdk(client)
          .worlds({
            first: 1,
            worlds_biomes_orderBy: Biome_OrderBy.Index,
            worlds_biomes_orderDirection: OrderDirection.Asc,
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
