// components/QRCodeMenu.jsx
'use client'
import QRCode from 'react-qr-code'

export default function QRCodeMenu() {
  const url = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="
      bg-white 
      p-4 
      rounded-lg 
      shadow-md 
      mt-12 
      inline-block
    ">
      <QRCode value={url} size={128} />
      <p className="mt-2 text-center text-sm text-gray-700">
        Scan to view on your phone
      </p>
    </div>
  )
}
