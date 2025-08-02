export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-600">© 2025 JSE Imaging Solutions. All rights reserved.</div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span className="text-xs text-gray-500">Version 2.0</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
