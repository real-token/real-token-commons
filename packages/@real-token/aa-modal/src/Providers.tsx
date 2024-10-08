import { IconBrandApple, IconBrandDiscord, IconBrandFacebook, IconBrandGoogle, IconBrandTwitch, IconBrandTwitter, IconMinus, IconPlus } from "@tabler/icons-react";
import { useAA, LoginConfig } from "@real-token/aa-core";
import { ReactNode, useState } from "react";
import { ActionIcon, Flex, SimpleGrid, Text } from "@mantine/core";
import { ProviderButton } from "./Buttons/ProviderButton";
import classes from './Buttons/Buttons.module.css';

type LoginProvider = keyof LoginConfig;

const loginProvidersToLogo: Map<LoginProvider, ReactNode> = new Map([
    ['google', <IconBrandGoogle />],
    ['facebook', <IconBrandFacebook />],
    ['twitch', <IconBrandTwitch />],
    ['discord', <IconBrandDiscord />],
    ['twitter', <IconBrandTwitter />],
    ['apple', <IconBrandApple />],
]);

const MAX_PROVIDERS_SHOWN = 4;

export const Providers = () => {

    const { loginConfig } = useAA();
    const providers = Object.keys(loginConfig as LoginConfig).filter((provider) => provider !== 'google');

    const [showAll, setShowAll] = useState(false);

    if(providers.length === 0) return null;
    return (
        <SimpleGrid cols={MAX_PROVIDERS_SHOWN > providers.length ? providers.length : MAX_PROVIDERS_SHOWN}>
            {providers.slice(0, showAll ? providers.length : MAX_PROVIDERS_SHOWN-1).map((provider) => (
                <ProviderButton key={provider} provider={provider as LoginProvider}>
                    {loginProvidersToLogo.get(provider as LoginProvider)}
                </ProviderButton>
            ))}
            {providers.length > MAX_PROVIDERS_SHOWN ? (
                <ActionIcon
                    classNames={{
                        root: classes.root
                    }}
                    style={{
                        width: '100%',
                    }}
                    onClick={() => setShowAll(!showAll)}
                >
                    <Flex align={'center'} justify={'center'} gap={4}>
                        {showAll ? <IconMinus size={12}/> : <IconPlus size={12}/>}
                        <Text>{(providers.length - MAX_PROVIDERS_SHOWN)+1}</Text>
                    </Flex>
                </ActionIcon>
            ): null}
        </SimpleGrid>
    )
}