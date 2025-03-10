import "./SafeAreaView.css";

export const SafeAreaView = ({ children }: React.PropsWithChildren) => {
  if (lynx.__globalProps.safeAreaInsets) {
    const { top, bottom } = lynx.__globalProps.safeAreaInsets;

    return (
      <view style={{ paddingTop: top, paddingBottom: bottom }}>{children}</view>
    );
  }

  return <view className="safe-area-view">{children}</view>;
};
