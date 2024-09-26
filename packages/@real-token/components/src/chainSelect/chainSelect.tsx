import { FC, forwardRef, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Group,
  SelectProps,
  Text,
  Menu,
  Box,
} from '@mantine/core';

import { FRC } from '../../types/FRC';
import { useActiveChain } from '../../hooks/blockchain/useActiveChain';
import { ALLOWED_CHAINS, CHAINS, ChainsID } from '../../config/constants/chain';
import { IconAlertCircle } from '@tabler/icons';
import { environment } from '../../config/constants/env';
import { GnosisLogo } from '../assets';
import { useRealtokenStore } from '../../providers/store';
import { useWeb3ModalAccount, useSwitchNetwork } from '@web3modal/ethers5/react';

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

export const ChainList = () => {

  const [env, chainConfig, showAllNetworks] = useRealtokenStore((state) => [state.env, state.chainConfig, state.showAllNetworks]);

  const c = chainConfig ?? { allowedChains: ALLOWED_CHAINS, chainsConfig: CHAINS };

  const enabledTestnets = env !== environment.PRODUCTION;

  const data = c.allowedChains
    .filter((chain: ChainsID) => showAllNetworks ? true : enabledTestnets ? c.chainsConfig[chain as ChainsID].isTestnet : !c.chainsConfig[chain as ChainsID].isTestnet)
    .map((chain: ChainsID) => ({
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
  return Logo ? <Logo height={18} /> : <></>;
};

export type ChainMenuItemProps = {
  logo: FC<any>;
  label: string;
  value: string;
};

function ChainMenuItem({ logo, label, value }: ChainMenuItemProps) {
  const { switchNetwork } = useSwitchNetwork();
  const { chainId } = useWeb3ModalAccount();

  return (
    <Menu.Item
      key={label}
      onClick={() => switchNetwork(Number(value))}
      leftSection={<ChainIcon logo={logo} />}
      color={chainId === Number(value) ? 'brand' : ''}>
      {label}
    </Menu.Item>
  );
};

export function ChainSelectedIcon() {
  const c = useRealtokenStore((state) => state.chainConfig);
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

type MessageNetworkProps = {
  classeName: string,
} & Partial<SelectProps>;
export function MessageNetwork({ classeName }: MessageNetworkProps) {
  const { t } = useTranslation('common', { keyPrefix: 'header' });

  const c = useRealtokenStore((state) => state.chainConfig);

  const { address } = useWeb3ModalAccount();
  const { switchNetwork } = useSwitchNetwork();

  const activeChain = useActiveChain(c);
  const [chain, setChain] = useState(activeChain);

  const defaultChainId = c?.defaultChainId ?? ChainsID.Ethereum;
  const defaulChainName = c.chainsConfig[defaultChainId]?.chainName ?? "";

  useEffect(() => {
    setChain(activeChain)
  }, [activeChain]);

  return (
    <>
    {!chain && address ? (
      <Box className={classeName}>
        <IconAlertCircle size={20} aria-label={'Network'} style={{ marginRight: '8px' }} />
        <div>
          {t('notAllowedNetwork')}
          <span onClick={() => switchNetwork(defaultChainId)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {t('switchNetwork', { networkName: defaulChainName })}
          </span>
        </div>
      </Box>
      ): undefined}
    </>
  );

};
