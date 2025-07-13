'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MenuItemForm({ initialData }) {
  const router    = useRouter()
  const isEditing = Boolean(initialData)

  const [name, setName]             = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [price, setPrice]           = useState(initialData?.price || '')
  const [file, setFile]             = useState(null)
  const [loading, setLoading]       = useState(false)
  const [errorMsg, setErrorMsg]     = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0] ?? null)
  }

  // SSR API route ilə storage upload
  const uploadImage = async (file) => {
    const fileName = `menu_items/${Date.now()}.${file.name.split('.').pop()}`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', fileName)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (res.ok) return data.url
    else throw new Error(data.error)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    let imageUrl = initialData?.image || null

    if (file) {
      try {
        imageUrl = await uploadImage(file)
      } catch (err) {
        setErrorMsg("Şəkil yüklənmədi: " + err.message)
        setLoading(false)
        return
      }
    }

    // DB insert SSR API-yə POST
    const payload = {
      name,
      description,
      image: imageUrl,
      price: parseFloat(price)
    }
    const res = await fetch('/api/menu_items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      setLoading(false)
      router.push('/admin/menu_items')
    } else {
      const err = await res.json()
      setErrorMsg(err.error)
      setLoading(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="
        bg-white 
        p-6 
        rounded-lg 
        shadow-md 
        max-w-md 
        mx-auto 
        space-y-6
      "
    >
      {errorMsg && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-[var(--coffee-dark)] mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="
            block w-full 
            border rounded 
            px-3 py-2 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[var(--coffee-brown)]
          "
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-[var(--coffee-dark)] mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            block w-full 
            border rounded 
            px-3 py-2 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[var(--coffee-brown)]
          "
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-[var(--coffee-dark)] mb-1">
          Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="
            block w-full 
            text-sm text-gray-700 
            file:mr-4 file:py-2 file:px-4 
            file:rounded file:border-0 
            file:text-sm file:font-semibold 
            file:bg-[var(--coffee-brown)] file:text-[var(--coffee-cream)] 
            hover:file:bg-[var(--coffee-dark)]
          "
        />
        {file && <span className="ml-2">{file.name}</span>}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-[var(--coffee-dark)] mb-1">
          Price
        </label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="
            block w-full 
            border rounded 
            px-3 py-2 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[var(--coffee-brown)]
          "
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full 
          px-4 py-2 
          bg-[var(--coffee-brown)] 
          text-[var(--coffee-cream)] 
          rounded 
          hover:bg-[var(--coffee-dark)] 
          transition-colors duration-200
        "
      >
        {isEditing ? 'Update Item' : 'Create Item'}
      </button>
    </form>
  )
}
