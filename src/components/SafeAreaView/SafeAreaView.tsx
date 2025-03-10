import "./SafeAreaView.css";

type SafeAreaViewProps = {
  className?: string;
};

export const SafeAreaView = ({
  children,
  className,
}: React.PropsWithChildren<SafeAreaViewProps>) => {
  if (lynx.__globalProps.safeAreaInsets) {
    const { top, bottom } = lynx.__globalProps.safeAreaInsets;

    return (
      <view style={{ paddingTop: top, paddingBottom: bottom }}>{children}</view>
    );
  }

  const cn = ["safe-area-view", className].filter(Boolean).join(" ");

  return <view className={cn}>{children}</view>;
};
