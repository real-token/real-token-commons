import { FC, forwardRef, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Group,
  SelectProps,
  Text,
  Menu,
  Box,
} from '@mantine/core';
import { useWeb3React } from '@web3-react/core';

import { FRC } from '../../types/FRC';
import { useActiveChain } from '../../hooks/blockchain/useActiveChain';
import { ALLOWED_CHAINS, CHAINS, ChainsID } from '../../config/constants/chain';
import { IconAlertCircle } from '@tabler/icons-react';
import { Chain, ChainSelectConfig } from '../../types';
import { useRootStore } from '../../providers/RealtProvider';
import { environment } from '../../config/constants/env';
import { GnosisLogo } from '../../assets';

type ChainSelectItemsProps = {
  label: string;
  logo: FC<any>;
};

const ChainSelectItems: FRC<ChainSelectItemsProps, HTMLDivElement> = forwardRef(
  ({ label, logo, ...props }, ref) => {
    const Logo = logo;
    return (
      <Group {...props} ref={ref} gap={'xs'}>
        {Logo ? <Logo width={18} /> : <></>}
        <Text>{label}</Text>
      </Group>
    );
  }
);
ChainSelectItems.displayName = 'ChainSelectItems';

type ChainListProps<T> = {
  chains?: ChainSelectConfig<T> | undefined
};

export function ChainList<T extends Partial<Chain>>({ chains }: ChainListProps<T>) {

  const c = chains ?? { allowedChains: ALLOWED_CHAINS, chainsConfig: CHAINS };

  const [env, showAllNetworks] = useRootStore((state) => [state.env,state.showAllNetworks]);
  const enabledTestnets = env !== environment.PRODUCTION;

  const data = c.allowedChains
    .filter((chain) => showAllNetworks ? true : enabledTestnets ? c.chainsConfig[chain as ChainsID].isTestnet : !c.chainsConfig[chain as ChainsID].isTestnet)
    .map<ChainMenuItemProps>((chain) => ({
      value: chain.toString(),
      label: c.chainsConfig[chain as ChainsID].chainName ?? "",
      logo: c.chainsConfig[chain as ChainsID].logo ?? GnosisLogo,
    }));

  return (
    <>
    {data.map(({ logo, label, value }) => (
        <ChainMenuItem value={value} label={label ? label : ""} logo={logo} key={`chain-${value}`}/>
    ))}
    </>
  );
};

interface ChainIconProps {
  logo: FC<any> | undefined;
}
function ChainIcon({ logo }: ChainIconProps) {
  const Logo = logo;
  return Logo ? <Logo width={18} /> : <></>;
};

export type ChainMenuItemProps = {
  logo: FC<any>;
  label: string;
  value: string;
};

function ChainMenuItem({ logo, label, value }: ChainMenuItemProps) {
  const { chainId, connector } = useWeb3React();

  const switchChain = useCallback(
    async () => {
      const desiredChainId = Number(value);
      if (desiredChainId === chainId) return;

      await connector.activate(desiredChainId);
    },
    [chainId, connector]
  );

  return (
    <Menu.Item
      key={label}
      onClick={switchChain}
      leftSection={<ChainIcon logo={logo} />}
      color={chainId === Number(value) ? 'brand' : ''}>
      {label}
    </Menu.Item>
  );
};

interface ChainSelectedIconProps<T> {
  chains?: ChainSelectConfig<T> | undefined
}
export function ChainSelectedIcon<T extends Partial<Chain>>({ chains }: ChainSelectedIconProps<T>) {
  const c = chains ?? { allowedChains: ALLOWED_CHAINS, chainsConfig: CHAINS } as ChainSelectConfig<T>;
  const activeChain = useActiveChain(c);
  const [chain, setChain] = useState(activeChain);

  useEffect(() => {
    setChain(activeChain)
  }, [activeChain]);

  return (
    <>
      {chain ? <ChainIcon logo={chain.logo} /> : <IconAlertCircle size={20} aria-label={'Network'} />}
    </>
  );
};

type MessageNetworkProps<T> = {
  classeName: string,
  chains?: ChainSelectConfig<T> | undefined
} & Partial<SelectProps>;

export function MessageNetwork<T extends Partial<Chain>>({ chains, classeName }: MessageNetworkProps<T>) {
  const { t } = useTranslation('common', { keyPrefix: 'header' });
  const { connector, account } = useWeb3React();
  const c = chains ?? { allowedChains: ALLOWED_CHAINS, chainsConfig: CHAINS } as ChainSelectConfig<T>;
  const activeChain = useActiveChain<T>(c);
  const [chain, setChain] = useState(activeChain);

  const defaultChainId = chains?.defaultChainId ?? ChainsID.Ethereum;
  const defaulChainName = c.chainsConfig[defaultChainId]?.chainName ?? "";

  useEffect(() => {
    setChain(activeChain)
  }, [activeChain]);

  const switchChain = useCallback(
    async () => {
      const desiredChainId = defaultChainId;
      await connector.activate(desiredChainId);
    },
    [connector]
  );

  return (
    <>
    {!chain && account ? (
      <Box className={classeName}>
        <IconAlertCircle size={20} aria-label={'Network'} style={{ marginRight: '8px' }} />
        <div>
          {t('notAllowedNetwork')}
          <span onClick={switchChain} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {t('switchNetwork', { networkName: defaulChainName })}
          </span>
        </div>
      </Box>
      ): undefined}
    </>
  );

};
