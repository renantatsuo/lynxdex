class MediaFetcher: NSObject, LynxMediaResourceFetcher {
    func shouldRedirectUrl(_ request: LynxResourceRequest) -> String {
        var url = request.url
        
        if (!url.starts(with: "/static") ) {
            return url
        }
        
        url.removeFirst()
        
        let size = url.count
        let file = String(url[..<String.Index.init(utf16Offset: size-4, in: url)])
        let type = String(url[String.Index.init(utf16Offset: size-3, in: url)...])
        
        if let filePath = Bundle.main.path(forResource: file, ofType: type) {
            return "file://" + filePath
        } else {
            return url
        }
    }
}
