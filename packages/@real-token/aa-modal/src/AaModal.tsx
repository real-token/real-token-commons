import { FC, useEffect, useState } from "react";
import { ContextModalProps } from "@mantine/modals";
import { Flex, Text, Button, LoadingOverlay } from "@mantine/core";
import { RealtokenLogoLight } from "./assets/RealtokenLogo/RealtokenLogoLight";
import { RealtokenLogoDark } from "./assets/RealtokenLogo/RealtokenLogoDark";
import { ModalButton } from "./Buttons/ModalButton";
import { IconArrowLeft, IconBrandGoogle, IconWallet } from "@tabler/icons-react";
import classes from './AaModal.module.css';
import { LoginConfig, ProviderProps, useAA } from "@real-token/aa-core";
import { Providers } from "./Providers";
import { ExternalButton } from "./Buttons/ExternalButton/ExternalButton";
import { MetamaskLogo } from "./assets/Metamask/MetamaskLogo";
import { WalletConnectLogo } from "./assets/WalletConnectLogo/WalletConnect";
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { resources } from './locales';
import { useTranslation } from "react-i18next";
import { initReactI18next } from 'react-i18next';
import { LanguageSwitcher } from "./Buttons/LanguageSwitcher";

i18next
    .use(LngDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'es', 'fr'],
        debug: process.env.NODE_ENV === 'development',
        detection: {
            order: ['navigator', 'cookie', 'localStorage' ]
        },
        resources
    });

export const AaModal: FC<ContextModalProps<{ aa: ProviderProps }>> = ({ innerProps, context: { closeModal }, id }) => {

    const { t } = useTranslation('main');

    const { loginReady, login, loginConfig, walletAddress } = useAA();

    useEffect(() => {
        if(walletAddress && walletAddress !== '') closeModal(id);
    },[walletAddress])

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
                            <Text fz={16}>{t('button.back')}</Text>
                        </Button>
                    </Flex>
                    <LoadingOverlay visible={!loginReady} />
                    <RealtokenLogoLight
                        py={'md'}
                        justify={'center'}
                        darkHidden
                    />
                    <RealtokenLogoDark 
                        py={'md'}
                        justify={'center'}
                        lightHidden
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
                        label="WalletConnect (V2)"
                        onClick={() => login('wallet-connect-v2')}
                    >
                        <WalletConnectLogo 
                            // width={56}
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
            <Flex justify={'end'} pos={'absolute'} top={'1rem'} right={'2rem'}>
                <LanguageSwitcher />
            </Flex>
            <RealtokenLogoLight
                py={'md'}
                justify={'center'}
                darkHidden
            />
            <RealtokenLogoDark 
                py={'md'}
                justify={'center'}
                lightHidden
            />
            <Flex direction={"column"} px={'xl'} gap={'xs'}>
                <Text fz={36} fw={600} className={classes.text}>{t('signin.title')}</Text>
                <Text fz={16} fw={500} className={classes.text}>{t('signin.subtitle')}</Text>
                <Flex direction={'column'} gap={'sm'} w={'100%'}>
                    <ModalButton
                        leftSection={<IconBrandGoogle />}
                        onClick={() => login('auth', { loginProvider: 'google' }) }
                        variant={'outline'}
                    >
                        <Text fw={600}>{t('providers.continueWithGoogle')}</Text>
                    </ModalButton>
                    <Providers loginConfig={loginConfig as LoginConfig}/>
                </Flex>
                <Text fz={12} c={'dimmed'}>{t('privacyPolicy')}</Text>
            </Flex>
            <Flex gap={'xs'} align={'center'} w={'100%'} px={'20%'}>
                <div className={classes.line} />
                <Text fz={16} c={'dimmed'}>{t('providers.or')}</Text>
                <div className={classes.line} />
            </Flex>
            <Flex direction={'column'} gap={'sm'} w={'100%'} px={'10%'} justify={'center'}>
                <Button
                    size={'xs'}
                    color={'#FAAE1D'}
                    leftSection={<IconWallet size={18} />}
                    onClick={() => setConnectExternalWallet(true)}
                >
                    {t('providers.connectExternalWallet')}
                </Button>
                <Button
                    size={'xs'}
                    color={"#156CAB"}
                >
                    {t('help')}
                </Button>
            </Flex>
        </Flex>
    )
}