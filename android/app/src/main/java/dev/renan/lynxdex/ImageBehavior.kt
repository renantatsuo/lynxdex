package dev.renan.lynxdex

import com.lynx.tasm.behavior.Behavior
import com.lynx.tasm.behavior.BehaviorBundle
import com.lynx.tasm.behavior.LynxContext
import com.lynx.tasm.behavior.shadow.ShadowNode
import com.lynx.tasm.behavior.ui.LynxFlattenUI
import com.lynx.tasm.behavior.ui.LynxUI
import com.lynx.tasm.behavior.ui.image.FlattenUIImage
import com.lynx.tasm.behavior.ui.image.InlineImageShadowNode
import com.lynx.tasm.behavior.ui.image.UIImage
import com.lynx.tasm.image.AutoSizeImage

class ImageBehavior : BehaviorBundle {
    override fun create(): MutableList<Behavior> {
        val bc: MutableList<Behavior> = ArrayList()
        bc.add(object : Behavior("image", true, true) {
            override fun createUI(context: LynxContext): LynxUI<*> {
                return UIImage(context)
            }

            override fun createFlattenUI(context: LynxContext): LynxFlattenUI {
                return FlattenUIImage(context)
            }

            override fun createShadowNode(): ShadowNode {
                return AutoSizeImage()
            }
        })

        bc.add(object : Behavior("inline-image", false, false) {
            override fun createShadowNode(): ShadowNode {
                return InlineImageShadowNode()
            }
        })

        return bc
    }
}