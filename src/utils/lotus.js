import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
import { BrowserProvider } from "@filecoin-shipyard/lotus-client-provider-browser";
import { testnet } from "@filecoin-shipyard/lotus-client-schema";
import config from 'config'

export const getClient = (options = { nodeOrMiner: "node", nodeNumber: 0 }) => {
  // API endpoint for local Lotus devnet
  const API = "wss://" + config.LOTUS_HOST;

  // Websocket endpoint for local Lotus devnet
  const wsUrl = API + `/rpc/v0`;

  // Creating and returning a Lotus client that can be used anywhere in the app
  const provider = new BrowserProvider(wsUrl, {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiXX0.PCP1OmkyTZViwwl8PSfg71ZoAUEPLlZaeJ93pDxLq80"});
  return new LotusRPC(provider, {
    schema:
      options.nodeOrMiner === "node" ? testnet.fullNode : testnet.storageMiner,
  });
};
