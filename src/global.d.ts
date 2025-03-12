declare module "@lynx-js/types" {
  interface GlobalProps {
    safeAreaInsets?: {
      top: number;
      bottom: number;
    };
    screenHeight: number;
    screenWidth: number;
    isNotchScreen: boolean;
    theme: "Light" | "Dark";
    platform: "iOS" | "Android";
    frontendTheme: "light" | "dark";
  }
}

declare global {
  namespace React {
    interface InputHTMLAttributes {
      bindinput: (event: any) => void;
    }
  }
}

export {};
