// components/MenuItemForm.jsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'

export default function MenuItemForm({ initialData }) {
  const router    = useRouter()
  const isEditing = Boolean(initialData)

  const [name, setName]           = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [price, setPrice]         = useState(initialData?.price || '')
  const [loading, setLoading]     = useState(false)

  // Yeni state upload üçün
  const [file, setFile]           = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0] ?? null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = initialData?.image || null

    // Əgər yeni file seçilibsə, onu bucket-a yüklə
    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `menu_items/${fileName}`

      // bucket adı: 'images' → öz bucket adınla əvəz et
      const { error: uploadError } = await supabase
        .storage
        .from('images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        setLoading(false)
        return
      }

      // Public URL əldə et
      const { data } = supabase
        .storage
        .from('images')
        .getPublicUrl(filePath)

      imageUrl = data.publicUrl
    }

    const payload = { name, description, image: imageUrl, price: parseFloat(price) }

    if (isEditing) {
      await supabase
        .from('menu_items')
        .update(payload)
        .eq('id', initialData.id)
    } else {
      await supabase.from('menu_items').insert([payload])
    }

    setLoading(false)
    router.push('/admin/menu_items')
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
            text-sm 
            text-gray-700 
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-[var(--coffee-brown)] file:text-[var(--coffee-cream)]
            hover:file:bg-[var(--coffee-dark)]
          "
        />
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
