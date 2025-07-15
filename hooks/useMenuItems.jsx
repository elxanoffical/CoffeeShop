'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function useMenuItems(initialData = []) {
  const supabase = createClientComponentClient()
  const [menuItems, setMenuItems] = useState(initialData)
  const [loading, setLoading] = useState(initialData.length === 0)

  const fetchMenuItems = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch error:', error)
    } else {
      setMenuItems(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (initialData.length === 0) {
      fetchMenuItems()
    }
  }, [])

  const deleteMenuItem = async (id) => {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)

    if (error) throw error
    await fetchMenuItems()
  }

  const createMenuItem = async (item) => {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([item])
      .single()

    if (error) throw error
    await fetchMenuItems()
    return data
  }

  const updateMenuItem = async (id, updates) => {
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .single()

    if (error) throw error
    await fetchMenuItems()
    return data
  }

  return {
    menuItems,
    loading,
    fetchMenuItems,
    deleteMenuItem,
    createMenuItem,
    updateMenuItem,
  }
}
