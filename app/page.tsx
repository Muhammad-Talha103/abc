"use client"

import { useState } from "react"
import Header from "@/components/Header"
import ScanPanel from "@/components/ScanPanel"
import PreviewArea from "@/components/PreviewArea"
import ActionsPanel from "@/components/ActionsPanel"
import StatusConsole from "@/components/StatusConsole"
import Footer from "@/components/Footer"

export default function ScannerApp() {
  const [scannedPages, setScannedPages] = useState<
    Array<{
      id: string
      thumbnail: string
      name: string
    }>
  >([])
  const [isScanning, setIsScanning] = useState(false)
  const [statusLogs, setStatusLogs] = useState<
    Array<{
      id: string
      message: string
      type: "info" | "success" | "error"
      timestamp: string
    }>
  >([
    {
      id: "1",
      message: "Scanner interface initialized successfully",
      type: "info",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  const addStatusLog = (message: string, type: "info" | "success" | "error" = "info") => {
    const newLog = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    }
    setStatusLogs((prev) => [newLog, ...prev].slice(0, 50)) // Keep last 50 logs
  }

  const clearStatusLogs = () => {
    setStatusLogs([])
    // Add a new log to indicate logs were cleared
    setTimeout(() => {
      addStatusLog("Status console cleared", "info")
    }, 100)
  }

  const handlePreviewScan = () => {
    setIsScanning(true)
    addStatusLog("Starting preview scan...", "info")

    // Simulate scanning process
    setTimeout(() => {
      const newPage = {
        id: Date.now().toString(),
        thumbnail: `/placeholder.svg?height=200&width=150&text=Preview+${scannedPages.length + 1}`,
        name: `Preview ${scannedPages.length + 1}`,
      }
      setScannedPages((prev) => [...prev, newPage])
      setIsScanning(false)
      addStatusLog("Preview scan completed successfully", "success")
    }, 2000)
  }

  const handleStartScan = () => {
    setIsScanning(true)
    addStatusLog("Starting full scan...", "info")

    // Simulate scanning process
    setTimeout(() => {
      const newPage = {
        id: Date.now().toString(),
        thumbnail: `/placeholder.svg?height=200&width=150&text=Scan+${scannedPages.length + 1}`,
        name: `Scan ${scannedPages.length + 1}`,
      }
      setScannedPages((prev) => [...prev, newPage])
      setIsScanning(false)
      addStatusLog("Full scan completed successfully", "success")
    }, 3000)
  }

  const handleStopScan = () => {
    setIsScanning(false)
    addStatusLog("Scan operation stopped by user", "info")
  }

  const handleDeletePage = (pageId: string) => {
    setScannedPages((prev) => prev.filter((page) => page.id !== pageId))
    addStatusLog("Page deleted successfully", "info")
  }

  const handleReorderPages = (dragIndex: number, hoverIndex: number) => {
    const draggedPage = scannedPages[dragIndex]
    const newPages = [...scannedPages]
    newPages.splice(dragIndex, 1)
    newPages.splice(hoverIndex, 0, draggedPage)
    setScannedPages(newPages)
    addStatusLog("Pages reordered successfully", "info")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Left Column - Scan Panel */}
            <div className="lg:col-span-3 space-y-4">
              <ScanPanel
                isScanning={isScanning}
                onPreviewScan={handlePreviewScan}
                onStartScan={handleStartScan}
                onStopScan={handleStopScan}
                onStatusLog={addStatusLog}
              />

              {/* Status Console - Desktop */}
              <div className="lg:block">
                <StatusConsole logs={statusLogs} onClearLogs={clearStatusLogs} />
              </div>
            </div>

            {/* Middle Column - Preview Area */}
            <div className="lg:col-span-5">
              <PreviewArea pages={scannedPages} onDeletePage={handleDeletePage} onReorderPages={handleReorderPages} />
            </div>

            {/* Right Column - Actions Panel */}
            <div className="lg:col-span-4">
              <ActionsPanel pages={scannedPages} onStatusLog={addStatusLog} />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            <ScanPanel
              isScanning={isScanning}
              onPreviewScan={handlePreviewScan}
              onStartScan={handleStartScan}
              onStopScan={handleStopScan}
              onStatusLog={addStatusLog}
            />

            <PreviewArea pages={scannedPages} onDeletePage={handleDeletePage} onReorderPages={handleReorderPages} />

            <ActionsPanel pages={scannedPages} onStatusLog={addStatusLog} />

            {/* Status Console - Mobile */}
            <StatusConsole logs={statusLogs} onClearLogs={clearStatusLogs} />
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Floating Action Buttons */}
      <div className="lg:hidden fixed bottom-20 right-4 flex flex-col gap-2">
        <button
          onClick={handlePreviewScan}
          disabled={isScanning}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Preview Scan"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>

        <button
          onClick={handleStartScan}
          disabled={isScanning}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Start Scan"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
