import React from 'react'
import ReactDOM from 'react-dom/client'
import { Flex } from '@mantine/core';
import App from './App'
import './index.css'
import { 
  ChainSelectConfig, Logo, RealtokenProvider, Website, initLanguage, getConnectors, parseAllowedChain, 
  getWalletConnectV2, metaMask, metaMaskHooks, gnosisHooks, gnosisSafe, getReadOnlyConnector
} from "@realtoken/realt-commons";
import { Web3Providers, MantineProviders, Layout, LanguageInit } from "@realtoken/realt-commons";
import { CUSTOM_ALLOWED_CHAINS, ChainsID, CustomChain } from './constants/chain';
import { resources } from './i18next/locales';
import { NavMenu } from './components/NavMenu';
import '@mantine/core/styles.css';

export const i18n = initLanguage(resources);

const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CUSTOM_ALLOWED_CHAINS,
  defaultChainId: ChainsID.Gnosis
}

const newWebsite: Website = {
  name: "RealT-commons example",
  comingSoon: false,
  url: "https://localhost:3000",
  logo: Logo
}

const showAllNetworks = true;
const env = import.meta.env.MODE;
console.log('ENV: ', env)
const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2(customChains, env, 'ff2eff6eb19b6b79a24bbc47c46b6035', showAllNetworks);
const [readOnly, readOnlyHooks] = getReadOnlyConnector(customChains);

const libraryConnectors = getConnectors({
  metamask: [metaMask, metaMaskHooks],
  gnosisSafe: [gnosisSafe, gnosisHooks],
  walletConnectV2: [walletConnectV2, walletConnectV2Hooks],
  readOnly: [readOnly, readOnlyHooks]
});

console.log('libraryConnectors: ', libraryConnectors)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RealtokenProvider 
      value={{
        env: env,
        showAllNetworks: showAllNetworks,
        chainConfig: customChains,
      }}
    >
      <Web3Providers libraryConnectors={libraryConnectors}>
        <MantineProviders>
            <LanguageInit i={i18n} />
            <Layout 
              newWebsite={newWebsite} 
              headerNav={<NavMenu/>}
              footerCustomLinks={
                <Flex>
                  <div>{'test'}</div>
                </Flex>
              }
            >
              <App />
            </Layout>
        </MantineProviders>
      </Web3Providers>
    </RealtokenProvider>
  </React.StrictMode>,
)