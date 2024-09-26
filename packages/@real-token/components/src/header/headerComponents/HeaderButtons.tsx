import { Group } from "@mantine/core";
import { WalletMenu, SettingsMenu } from "../../menus";
import { NetworkMenu } from "../../menus/NetworkMenu";
import { ConnectButton } from "../ConnectButton/ConnectButton";
import { useWeb3ModalAccount } from '@reown/appkit/react'

export function HeaderButtons() {
    const { isConnected } = useWeb3ModalAccount();
  
    return (
      <Group gap={10}>
        <NetworkMenu />
        {isConnected ? <WalletMenu /> : <ConnectButton />}
        <SettingsMenu />
      </Group>
    );
};