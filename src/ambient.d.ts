declare module 'smart-spinner' {
  function progressIndicator(message: string): void;
  function progressIndicator(result: boolean, message: string): void;

  const create: (message: string, spinnerList?: Array<string>) => typeof progressIndicator;
  export {
    create
  }
}

declare module 'cli-spinners';
declare module 'humanize-duration';