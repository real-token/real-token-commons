declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

// declare module "i18next" {
//     // Extend CustomTypeOptions
//     interface CustomTypeOptions {
//       resources: {
//         main: typeof main;
//       };
//     }
// }