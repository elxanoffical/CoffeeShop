// hooks/useMenuItems.js
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMenuItems = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else setMenuItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMenuItems()
  }, [])

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

  const deleteMenuItem = async (id) => {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)
    if (error) throw error
    await fetchMenuItems()
  }

  return {
    menuItems,
    loading,
    fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  }
}
