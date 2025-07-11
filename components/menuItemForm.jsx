// components/MenuItemForm.jsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'

export default function MenuItemForm({ initialData }) {

  const router = useRouter()
  const isEditing = Boolean(initialData)
  
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(
    initialData?.description || ''
  )
  const [image, setImage] = useState(initialData?.image || '')
  const [price, setPrice] = useState(initialData?.price || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = {
      name,
      description,
      image,
      price: parseFloat(price),
    }

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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {isEditing ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
