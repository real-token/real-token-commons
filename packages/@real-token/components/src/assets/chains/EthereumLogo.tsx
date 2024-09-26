import React from "react"
import { SVG } from "../../types/assets/svg"

export const EthereumLogo = ({ height }: SVG) => {
    // #343434
    // #8C8C8C
    // #3C3C3B
    // #8C8C8C
    // #141414
    // #393939 
    return(
        <svg height={height ?? undefined} clipRule="evenodd" fillRule="evenodd" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" version="1.1" viewBox="0 0 784.37 1277.4"
            xmlns="http://www.w3.org/2000/svg">
            <g fillRule="nonzero">
                <polygon points="392.07 0 383.5 29.11 383.5 873.74 392.07 882.29 784.13 650.54" fill="#d9930d"/>
                <polygon points="392.07 0 -0 650.54 392.07 882.29 392.07 472.33" fill="#f2ac26"/>
                <polygon points="392.07 956.52 387.24 962.41 387.24 1263.3 392.07 1277.4 784.37 724.89" fill="#d9930d"/>
                <polygon points="392.07 1277.4 392.07 956.52 -0 724.89" fill="#f2ac26"/>
                <polygon points="392.07 882.29 784.13 650.54 392.07 472.33" fill="#7a5103"/>
                <polygon points="0 650.54 392.07 882.29 392.07 472.33" fill="#a97206"/>
            </g>
        </svg>
    )
}