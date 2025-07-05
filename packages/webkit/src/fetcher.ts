import { request, Variables } from "graphql-request";

const endpoint =
  "hhttps://api.studio.thegraph.com/query/958/cww-opt/version/latest";

export const fetcher = <TData, TVariables extends Variables>(
  query: string,
  variables?: TVariables
): (() => Promise<TData>) => {
  // @ts-expect-error - TODO: fix this
  return async () => request<TData, TVariables>(endpoint, query, variables);
};
