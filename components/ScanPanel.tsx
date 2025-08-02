"use client"

import { useState } from "react"

interface ScanPanelProps {
  isScanning: boolean
  onPreviewScan: () => void
  onStartScan: () => void
  onStopScan: () => void
  onStatusLog: (message: string, type?: "info" | "success" | "error") => void
}

export default function ScanPanel({ isScanning, onPreviewScan, onStartScan, onStopScan, onStatusLog }: ScanPanelProps) {
  const [scannerSource, setScannerSource] = useState("TWAIN Scanner 1")
  const [resolution, setResolution] = useState("300")
  const [colorMode, setColorMode] = useState("Color")
  const [paperSize, setPaperSize] = useState("A4")

  const handleSettingsChange = (setting: string, value: string) => {
    onStatusLog(`${setting} changed to ${value}`, "info")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
          Scan Controls
        </h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Scanner Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scanner Source</label>
          <select
            value={scannerSource}
            onChange={(e) => {
              setScannerSource(e.target.value)
              handleSettingsChange("Scanner source", e.target.value)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="TWAIN Scanner 1">TWAIN Scanner 1</option>
            <option value="TWAIN Scanner 2">TWAIN Scanner 2</option>
            <option value="Network Scanner">Network Scanner</option>
          </select>
        </div>

        {/* Scan Buttons */}
        <div className="space-y-2">
          <button
            onClick={onPreviewScan}
            disabled={isScanning}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            {isScanning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Scanning...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Preview Scan
              </>
            )}
          </button>

          <button
            onClick={onStartScan}
            disabled={isScanning}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Start Scan
          </button>

          <button
            onClick={onStopScan}
            disabled={!isScanning}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
            Stop Scan
          </button>
        </div>

        {/* Scan Options */}
        <div className="space-y-3 pt-2 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">Scan Options</h3>

          {/* Resolution */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Resolution (DPI)</label>
            <select
              value={resolution}
              onChange={(e) => {
                setResolution(e.target.value)
                handleSettingsChange("Resolution", e.target.value + " DPI")
              }}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="100">100 DPI</option>
              <option value="200">200 DPI</option>
              <option value="300">300 DPI</option>
              <option value="600">600 DPI</option>
            </select>
          </div>

          {/* Color Mode */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Color Mode</label>
            <select
              value={colorMode}
              onChange={(e) => {
                setColorMode(e.target.value)
                handleSettingsChange("Color mode", e.target.value)
              }}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Color">Color</option>
              <option value="Grayscale">Grayscale</option>
              <option value="Black & White">Black & White</option>
            </select>
          </div>

          {/* Paper Size */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Paper Size</label>
            <select
              value={paperSize}
              onChange={(e) => {
                setPaperSize(e.target.value)
                handleSettingsChange("Paper size", e.target.value)
              }}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
              <option value="Legal">Legal</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
