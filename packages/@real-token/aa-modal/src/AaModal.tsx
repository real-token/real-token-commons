import { FC, useState } from "react";
import { ContextModalProps } from "@mantine/modals";
import { Flex, Text, Button, LoadingOverlay } from "@mantine/core";
import { RealtokenLogo } from "./RealtokenLogo";
import { ModalButton } from "./Buttons/ModalButton";
import { IconArrowLeft, IconBrandGoogle, IconWallet } from "@tabler/icons-react";
import classes from './AaModal.module.css';
import { useAA } from "@real-token/aa-core";
import { Providers } from "./Providers";
import { ExternalButton } from "./Buttons/ExternalButton/ExternalButton";
import { MetamaskLogo } from "./assets/Metamask/MetamaskLogo";
import { CoinbaseWalletLogo } from "./assets/CoinbaseWalletLogo/CoinbaseWalletLogo";

export const AaModal: FC<ContextModalProps> = ({ context, id, innerProps }) => {

    const { login, loginReady } = useAA();

    const [connectExternalWallet, setConnectExternalWallet] = useState(false);

    if(connectExternalWallet) {
        return (
            <Flex direction={"column"} gap={'md'} py={'xl'}>
                <Flex direction={'column'} gap={'xs'}>
                    <Flex w={'100%'} justify={'start'}>
                        <Button
                            onClick={() => setConnectExternalWallet(false)}
                            variant={'transparent'}
                            leftSection={<IconArrowLeft size={24} />}
                        >
                            <Text fz={16}>{'Back'}</Text>
                        </Button>
                    </Flex>
                    <LoadingOverlay visible={!loginReady} />
                    <RealtokenLogo
                        py={'md'}
                        justify={'center'}
                    />
                </Flex>
                <Flex gap={'lg'} justify={'center'}>
                    <ExternalButton 
                        label="Metamask"
                        onClick={() => login('metamask') }
                    >
                        <MetamaskLogo 
                            width={56}
                            height={56}
                        />
                    </ExternalButton>
                    <ExternalButton 
                        label="Coinbase Wallet"
                        onClick={() => login('coinbase')}
                    >
                        <CoinbaseWalletLogo 
                            width={56}
                            height={56}
                        />
                    </ExternalButton>
                </Flex>
            </Flex>
        )
    }
    return(
        <Flex direction={"column"} gap={'md'} py={'xl'}>
            <LoadingOverlay visible={!loginReady} />
            <RealtokenLogo
                py={'md'}
                justify={'center'}
            />
            <Flex direction={"column"} px={'xl'} gap={'xs'}>
                <Text fz={36} fw={600} className={classes.text}>{'Sign in'}</Text>
                <Text fz={16} fw={500} className={classes.text}>{'Your Realtoken wallet with one click'}</Text>
                <Flex direction={'column'} gap={'sm'} w={'100%'}>
                    <ModalButton
                        leftSection={<IconBrandGoogle />}
                        onClick={() => login('auth', { loginProvider: 'google' }) }
                    >
                        <Text fw={600}>{'Continue with google'}</Text>
                    </ModalButton>
                    <Providers />
                </Flex>
                <Text fz={12} c={'dimmed'}>{'We do not share any data related to your social logins.'}</Text>
            </Flex>
            <Flex gap={'xs'} align={'center'} w={'100%'} px={'20%'}>
                <div className={classes.line} />
                <Text fz={16} c={'dimmed'}>{'or'}</Text>
                <div className={classes.line} />
            </Flex>
            <Flex gap={'md'} w={'100%'} px={'10%'} justify={'center'}>
                <Button
                    size={'xs'}
                    color={'#FAAE1D'}
                    leftSection={<IconWallet size={18} />}
                    onClick={() => setConnectExternalWallet(true)}
                >
                    {'Connect external wallet'}
                </Button>
                <Button
                    size={'xs'}
                    color={"#156CAB"}
                >
                    {'I need help'}
                </Button>
            </Flex>
        </Flex>
    )
}