"use client"

interface Page {
  id: string
  thumbnail: string
  name: string
}

interface PreviewAreaProps {
  pages: Page[]
  onDeletePage: (pageId: string) => void
  onReorderPages: (dragIndex: number, hoverIndex: number) => void
}

export default function PreviewArea({ pages, onDeletePage, onReorderPages }: PreviewAreaProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Preview Area
          {pages.length > 0 && <span className="ml-2 text-sm text-gray-500">({pages.length} pages)</span>}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4">
        {pages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg font-medium mb-2">No documents scanned</p>
            <p className="text-sm text-center">Start scanning to see your documents here</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {pages.map((page, index) => (
              <div
                key={page.id}
                className="group relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
                <div className="aspect-[3/4] bg-white">
                  <img
                    src={page.thumbnail || "/placeholder.svg"}
                    alt={page.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Page Info */}
                <div className="p-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{page.name}</p>
                  <p className="text-xs text-gray-500">Page {index + 1}</p>
                </div>

                {/* Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onDeletePage(page.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-lg transition-colors"
                    title="Delete page"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                {/* Page Number Badge */}
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
