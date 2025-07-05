import {
  _SubgraphErrorPolicy_,
  getSdk as chainWalkerWorldSdk,
} from "@cww/webkit/graphql";
import { GraphQLClient } from "graphql-request";
import { base, optimism } from "viem/chains";

const urls: Record<number, string> = {
  [base.id]:
    "https://gateway.thegraph.com/api/subgraphs/id/7wySPFUyZtUw75W4vUNy4tgD4PyyrhxAiDuevofxZGcq",
  [optimism.id]:
    "https://gateway.thegraph.com/api/subgraphs/id/7wySPFUyZtUw75W4vUNy4tgD4PyyrhxAiDuevofxZGcq",
};

class GameApi {
  private clients: Record<number, GraphQLClient>;

  constructor() {
    this.clients = Object.fromEntries(
      Object.entries(urls).map(([chainId, url]) => [
        chainId,
        new GraphQLClient(url),
      ])
    );
  }

  listPlayers() {
    return Promise.all(
      Object.entries(this.clients).map(([chainId, client]) =>
        chainWalkerWorldSdk(client)
          .players({
            first: 100,
            subgraphError: _SubgraphErrorPolicy_.Allow,
          })
          .then((res) =>
            res.players.map((p) => ({
              ...p,
              chainId: Number(chainId),
            }))
          )
      )
    );
  }
}
