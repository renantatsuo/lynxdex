import "./SafeAreaView.css";

type SafeAreaViewProps = {
  className?: string;
};

export const SafeAreaView = ({
  children,
  className,
}: React.PropsWithChildren<SafeAreaViewProps>) => {
  const cn = ["safe-area-view", className].filter(Boolean).join(" ");

  if (lynx.__globalProps.safeAreaInsets) {
    const { top, bottom } = lynx.__globalProps.safeAreaInsets;

    return (
      <view className={cn} style={{ paddingTop: top, paddingBottom: bottom }}>
        {children}
      </view>
    );
  }

  return <view className={cn}>{children}</view>;
};
