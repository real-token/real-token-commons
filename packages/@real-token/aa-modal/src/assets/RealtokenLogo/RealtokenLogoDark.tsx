import { Flex, FlexProps } from "@mantine/core";
import { Logo } from "./Logo";

export const RealtokenLogoDark = ({ ...props }: FlexProps) => {
    return(
        <Flex align={'center'} gap={'sm'} {...props}>
            {/* <img src={realtokenLogo} style={{ height: '52px', width: '52px' }}/> */}
            <Logo />
            <svg width="136" height="37" viewBox="0 0 136 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.984 36.5V2.9H15.528C18.536 2.9 21.128 3.396 23.304 4.388C25.48 5.348 27.16 6.74 28.344 8.564C29.528 10.388 30.12 12.564 30.12 15.092C30.12 17.588 29.528 19.748 28.344 21.572C27.16 23.364 25.48 24.74 23.304 25.7C21.128 26.66 18.536 27.14 15.528 27.14H5.304L8.76 23.732V36.5H0.984ZM22.344 36.5L13.944 24.308H22.248L30.744 36.5H22.344ZM8.76 24.596L5.304 20.948H15.096C17.496 20.948 19.288 20.436 20.472 19.412C21.656 18.356 22.248 16.916 22.248 15.092C22.248 13.236 21.656 11.796 20.472 10.772C19.288 9.748 17.496 9.236 15.096 9.236H5.304L8.76 5.54V24.596ZM48.5689 36.884C45.6249 36.884 43.0329 36.308 40.7929 35.156C38.5849 34.004 36.8729 32.436 35.6569 30.452C34.4409 28.436 33.8329 26.148 33.8329 23.588C33.8329 20.996 34.4249 18.708 35.6089 16.724C36.8249 14.708 38.4729 13.14 40.5529 12.02C42.6329 10.868 44.9849 10.292 47.6089 10.292C50.1369 10.292 52.4089 10.836 54.4249 11.924C56.4729 12.98 58.0889 14.516 59.2729 16.532C60.4569 18.516 61.0489 20.9 61.0489 23.684C61.0489 23.972 61.0329 24.308 61.0009 24.692C60.9689 25.044 60.9369 25.38 60.9049 25.7H39.9289V21.332H56.9689L54.0889 22.628C54.0889 21.284 53.8169 20.116 53.2729 19.124C52.7289 18.132 51.9769 17.364 51.0169 16.82C50.0569 16.244 48.9369 15.956 47.6569 15.956C46.3769 15.956 45.2409 16.244 44.2489 16.82C43.2889 17.364 42.5369 18.148 41.9929 19.172C41.4489 20.164 41.1769 21.348 41.1769 22.724V23.876C41.1769 25.284 41.4809 26.532 42.0889 27.62C42.7289 28.676 43.6089 29.492 44.7289 30.068C45.8809 30.612 47.2249 30.884 48.7609 30.884C50.1369 30.884 51.3369 30.676 52.3609 30.26C53.4169 29.844 54.3769 29.22 55.2409 28.388L59.2249 32.708C58.0409 34.052 56.5529 35.092 54.7609 35.828C52.9689 36.532 50.9049 36.884 48.5689 36.884ZM81.171 36.5V31.46L80.691 30.356V21.332C80.691 19.732 80.195 18.484 79.203 17.588C78.243 16.692 76.755 16.244 74.739 16.244C73.363 16.244 72.003 16.468 70.659 16.916C69.347 17.332 68.227 17.908 67.299 18.644L64.611 13.412C66.019 12.42 67.715 11.652 69.699 11.108C71.683 10.564 73.699 10.292 75.747 10.292C79.683 10.292 82.739 11.22 84.915 13.076C87.091 14.932 88.179 17.828 88.179 21.764V36.5H81.171ZM73.299 36.884C71.283 36.884 69.555 36.548 68.115 35.876C66.675 35.172 65.571 34.228 64.803 33.044C64.035 31.86 63.651 30.532 63.651 29.06C63.651 27.524 64.019 26.18 64.755 25.028C65.523 23.876 66.723 22.98 68.355 22.34C69.987 21.668 72.115 21.332 74.739 21.332H81.603V25.7H75.555C73.795 25.7 72.579 25.988 71.907 26.564C71.267 27.14 70.947 27.86 70.947 28.724C70.947 29.684 71.315 30.452 72.051 31.028C72.819 31.572 73.859 31.844 75.171 31.844C76.419 31.844 77.539 31.556 78.531 30.98C79.523 30.372 80.243 29.492 80.691 28.34L81.843 31.796C81.299 33.46 80.307 34.724 78.867 35.588C77.427 36.452 75.571 36.884 73.299 36.884ZM94.956 36.5V0.883998H102.444V36.5H94.956Z" fill="white"/>
                <path d="M116.882 36.5V9.236H106.13V2.9H135.41V9.236H124.658V36.5H116.882Z" fill="#F9B637"/>
            </svg>
        </Flex>
    )
}

