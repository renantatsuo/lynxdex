import { useEffect, useState } from "@lynx-js/react";
import { SafeAreaView } from "~/components/SafeAreaView/SafeAreaView.jsx";
import "./App.css";

type Theme = "light" | "dark";

export function App() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(lynx.__globalProps.theme.toLocaleLowerCase() as Theme);
  }, [lynx.__globalProps.theme]);

  return (
    <view className={`app-${theme}`}>
      <SafeAreaView>
        <text>{JSON.stringify(lynx.__globalProps, null, 2)}</text>
      </SafeAreaView>
    </view>
  );
}
