'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MenuItemForm({ initialData }) {
  const router = useRouter()
  const isEditing = Boolean(initialData)

  const [name, setName]           = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [price, setPrice]         = useState(initialData?.price || '')
  const [category, setCategory]   = useState(initialData?.category || 'hot')
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl]   = useState(initialData?.image || '')
  const [error, setError]         = useState('')


  const handleFileChange = (e) => {
    setImageFile(e.target.files[0] ?? null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const fileName = `${Date.now()}`

    let finalImageUrl = imageUrl
    if (imageFile) {
      const formData = new FormData()
      formData.append('file', imageFile)

      formData.append('fileName', fileName)

      // upload route-da image yükləyir
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const uploadData = await uploadRes.json()
      
      if (!uploadRes.ok) {
        setError(uploadData.error || 'Upload xətası')
        return
      }
      finalImageUrl = uploadData.publicUrl
    }

    const payload = {
      name,
      description,
      price: parseFloat(price),
      category,
      image: finalImageUrl,
      
    }

    const url    = isEditing
      ? `/api/menu_items/${initialData.id}`
      : '/api/menu_items'
    const method = isEditing ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Yadda saxlanmadı')
      return
    }

    // uğurlu olduqda siyahıya dön
    router.push('/admin/menu_items')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 bg-white rounded shadow">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border p-2"
        >
          <option value="hot">Hot Drinks</option>
          <option value="cold">Cold Drinks</option>
        </select>
      </div>

      <div>
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--coffee-brown)] text-[var(--coffee-cream)] p-2 rounded hover:bg-[var(--coffee-dark)]"
      >
        {isEditing ? 'Update Item' : 'Create Item'}
      </button>
    </form>
  )
}
