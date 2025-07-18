// app/admin/menu_items/new/page.jsx
import MenuItemForm from '@/components/menuItemForm'

export default function NewMenuItemPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Menu Item</h1>
      <MenuItemForm />
    </div>
  )
}
