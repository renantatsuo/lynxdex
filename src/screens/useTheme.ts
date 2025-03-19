import { useEffect, useState } from "@lynx-js/react";

type Theme = "light" | "dark";

export const useTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(lynx.__globalProps.theme.toLocaleLowerCase() as Theme);
  }, [lynx.__globalProps.theme]);

  return theme;
};
