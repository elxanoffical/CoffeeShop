// components/QRCodeMenu.jsx
'use client'
import QRCode from 'react-qr-code'

export default function QRCodeMenu() {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  return (
    <div className="p-4 bg-white shadow rounded mt-8 inline-block">
      <QRCode value={url} size={128} />
      <p className="mt-2 text-center text-sm text-gray-700">
        Scan to view on your phone
      </p>
    </div>
  )
}
