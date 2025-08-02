"use client"

interface StatusLog {
  id: string
  message: string
  type: "info" | "success" | "error"
  timestamp: string
}

interface StatusConsoleProps {
  logs: StatusLog[]
  onClearLogs: () => void
}

export default function StatusConsole({ logs, onClearLogs }: StatusConsoleProps) {
  const getLogIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case "error":
        return (
          <svg className="w-3 h-3 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      default:
        return (
          <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
    }
  }

  const getLogTextColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600"
      case "error":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Status Console
          </h3>
          <button
            onClick={onClearLogs}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            title="Clear logs"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <svg className="w-6 h-6 mx-auto mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-xs">No status messages</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 p-1 rounded hover:bg-gray-50 transition-colors">
                  <div className="mt-0.5">{getLogIcon(log.type)}</div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className={`font-medium ${getLogTextColor(log.type)}`}>{log.timestamp}</span>
                    </div>
                    <p className="text-gray-700 leading-tight break-words">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer with status indicator */}
      <div className="px-3 py-1 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{logs.length} messages</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}
