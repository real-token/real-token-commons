import { ActionIcon, ActionIconProps } from '@mantine/core';
import classes from './Buttons.module.css';
import { useAA } from '@real-token/aa-core';

export const ProviderButton = ({ provider, ...props }: ActionIconProps & { provider: string }) => {
    const { login } = useAA();
    return(
        <ActionIcon
            {...props}
            classNames={{
                root: classes.root
            }}
            style={{
                width: '100%',
            }}
            onClick={() => login('auth', { loginProvider: provider })}
            variant={'outline'}
        >
            {props.children}
        </ActionIcon>
    )
}