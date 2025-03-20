package dev.renan.lynxdex

import android.content.Context
import android.graphics.BitmapFactory
import com.lynx.tasm.resourceprovider.LynxResourceRequest
import com.lynx.tasm.resourceprovider.media.LynxMediaResourceFetcher
import com.lynx.tasm.resourceprovider.media.OptionalBool
import java.io.File
import java.io.IOException

class MediaFetcher(): LynxMediaResourceFetcher() {
    override fun shouldRedirectUrl(request: LynxResourceRequest): String {
        val url = request.url

        if (!url.startsWith("/static") ) {
            return url
        }

        return "asset://$url"
    }

    override fun isLocalResource(url: String?): OptionalBool {
        return if (url != null) {
            if (url.startsWith("/static") ) {
                OptionalBool.TRUE
            } else {
                OptionalBool.FALSE
            }
        } else {
            OptionalBool.UNDEFINED
        }
    }
}