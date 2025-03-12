import type { ViewProps } from "@lynx-js/types";
import "./SafeAreaView.css";

type SafeAreaViewProps = {
  className?: string;
} & ViewProps;

export const SafeAreaView = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<SafeAreaViewProps>) => {
  const cn = ["safe-area-view", className].filter(Boolean).join(" ");

  if (lynx.__globalProps.safeAreaInsets) {
    const { top, bottom } = lynx.__globalProps.safeAreaInsets;

    return (
      <view
        className={cn}
        style={{ paddingTop: top, paddingBottom: bottom }}
        {...props}
      >
        {children}
      </view>
    );
  }

  return (
    <view className={cn} {...props}>
      {children}
    </view>
  );
};
