import UIKit

class ViewController: UIViewController {

    private var lynxView: LynxView = LynxView()

    override func viewSafeAreaInsetsDidChange() {
        super.viewSafeAreaInsetsDidChange()

        let safeAreaInsets = self.view.window?.safeAreaInsets

        let globalProps: [String: Any] = [
            "safeAreaInsets": [
                "top": safeAreaInsets?.top,
                "bottom": safeAreaInsets?.bottom
            ]
        ]

        lynxView.updateGlobalProps(with: globalProps)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.

        lynxView = LynxView { builder in
            builder.config = LynxConfig(provider: LynxProvider())
            builder.screenSize = self.view.frame.size
            builder.fontScale = 1.0
        }

        lynxView.preferredLayoutWidth = self.view.frame.size.width
        lynxView.preferredLayoutHeight = self.view.frame.size.height
        lynxView.layoutWidthMode = .exact
        lynxView.layoutHeightMode = .exact

        self.view.addSubview(lynxView)

        lynxView.loadTemplate(fromURL: "main.lynx", initData: nil)

        var theme = "light"
        if UIScreen.main.traitCollection.userInterfaceStyle == UIUserInterfaceStyle.dark {
            theme = "dark"
        }
        let globalProps: [String: Any] = [
            "theme": theme
        ]
        lynxView.updateGlobalProps(with: globalProps)
    }

}
