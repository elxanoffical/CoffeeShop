// components/QRCodeMenu.jsx (və ya .js)
"use client"
import dynamic from "next/dynamic"

const QRCode = dynamic(() => import("react-qr-code"), { ssr: false })

export default function QRCodeMenu() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <QRCode value="http://localhost:3000/menu" size={128} />
    </div>
  )
}
