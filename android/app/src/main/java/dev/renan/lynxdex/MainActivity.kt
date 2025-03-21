package dev.renan.lynxdex

import android.app.Activity
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import androidx.annotation.RequiresApi
import com.lynx.tasm.LynxBooleanOption
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder
import com.lynx.tasm.behavior.Behavior
import com.lynx.tasm.behavior.LynxContext
import com.lynx.tasm.behavior.ui.LynxUI


class MainActivity : Activity() {
    @RequiresApi(Build.VERSION_CODES.P)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val lynxView = buildLynxView()
        val uri = "main.lynx.bundle"
        lynxView.renderTemplateUrl(uri, "")

        lynxView.setOnApplyWindowInsetsListener { _, insets ->
            val safeAreaInsets = HashMap<String, Any>()
            insets.displayCutout?.safeInsetTop?.let { safeAreaInsets.put("top", it) }
            insets.displayCutout?.safeInsetBottom?.let { safeAreaInsets.put("bottom", it) }
            val globalProps = HashMap<String, Any>()
            globalProps["safeAreaInsets"] = safeAreaInsets
            lynxView.updateGlobalProps(globalProps)
            return@setOnApplyWindowInsetsListener insets
        }

        var theme = "light"
        var uiMode = this.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK;
        if (uiMode ==  Configuration.UI_MODE_NIGHT_YES) {
            theme = "dark"
        }
        val globalProps = HashMap<String, Any>()
        globalProps["theme"] = theme;
        lynxView.updateGlobalProps(globalProps)

        setContentView(lynxView)
    }

    private fun buildLynxView(): LynxView {
        val viewBuilder = LynxViewBuilder()
        viewBuilder.addBehaviors(ImageBehavior().create())
        viewBuilder.addBehavior(object : Behavior("input", false) {
            override fun createUI(context: LynxContext): LynxUI<*> {
                return LynxExplorerInput(context)
            }
        })
        viewBuilder.setTemplateProvider(TemplateProvider(this))
        viewBuilder.setEnableGenericResourceFetcher(LynxBooleanOption.TRUE)
        viewBuilder.setMediaResourceFetcher(MediaFetcher())
        return viewBuilder.build(this)
    }
}
