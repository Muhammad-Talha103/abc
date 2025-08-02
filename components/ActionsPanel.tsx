"use client"

import { useState } from "react"

interface Page {
  id: string
  thumbnail: string
  name: string
}

interface ActionsPanelProps {
  pages: Page[]
  onStatusLog: (message: string, type?: "info" | "success" | "error") => void
}

export default function ActionsPanel({ pages, onStatusLog }: ActionsPanelProps) {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSaveAsPDF = async () => {
    if (pages.length === 0) {
      onStatusLog("No pages to save as PDF", "error")
      return
    }

    setIsProcessing(true)
    onStatusLog("Generating PDF...", "info")

    // Simulate PDF generation
    setTimeout(() => {
      setIsProcessing(false)
      onStatusLog(`PDF generated successfully with ${pages.length} page(s)`, "success")
    }, 2000)
  }

  const handleSaveAsMultiPagePDF = async () => {
    if (pages.length === 0) {
      onStatusLog("No pages to save as multi-page PDF", "error")
      return
    }

    setIsProcessing(true)
    onStatusLog("Generating multi-page PDF...", "info")

    // Simulate multi-page PDF generation
    setTimeout(() => {
      setIsProcessing(false)
      onStatusLog(`Multi-page PDF generated with ${pages.length} page(s)`, "success")
    }, 2500)
  }

  const handlePrint = () => {
    if (pages.length === 0) {
      onStatusLog("No pages to print", "error")
      return
    }

    onStatusLog("Opening print dialog...", "info")
    // Simulate print dialog
    setTimeout(() => {
      window.print()
      onStatusLog("Print dialog opened", "success")
    }, 500)
  }

  const handleSendEmail = async () => {
    if (!emailData.to || !emailData.subject) {
      onStatusLog("Please fill in recipient and subject fields", "error")
      return
    }

    if (pages.length === 0) {
      onStatusLog("No pages to send via email", "error")
      return
    }

    setIsProcessing(true)
    onStatusLog("Sending email...", "info")

    // Simulate email sending
    setTimeout(() => {
      setIsProcessing(false)
      onStatusLog(`Email sent successfully to ${emailData.to}`, "success")
      setEmailData({ to: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <div className="space-y-4">
      {/* PDF Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            PDF Actions
          </h2>
        </div>

        <div className="p-4 space-y-3">
          <button
            onClick={handleSaveAsPDF}
            disabled={isProcessing || pages.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Save as PDF
          </button>

          <button
            onClick={handleSaveAsMultiPagePDF}
            disabled={isProcessing || pages.length === 0}
            className="w-full bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Save as Multi-Page PDF
          </button>

          <button
            onClick={handlePrint}
            disabled={pages.length === 0}
            className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Document
          </button>
        </div>
      </div>

      {/* Email Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Send via Email
          </h2>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
            <input
              type="email"
              value={emailData.to}
              onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
              placeholder="recipient@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              placeholder="Scanned Documents"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={emailData.message}
              onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              placeholder="Please find the attached scanned documents."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleSendEmail}
            disabled={isProcessing || pages.length === 0 || !emailData.to || !emailData.subject}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send PDF via Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
