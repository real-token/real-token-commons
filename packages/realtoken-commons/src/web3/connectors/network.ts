import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';
import { ChainsID, URLS } from '../../config/constants/chain';

export const [network, hooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions: actions,
      urlMap: URLS,
      // defaultChainId: ChainsID,
    })
);
