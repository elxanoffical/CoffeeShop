// components/ui/button.jsx
export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={
        `px-4 py-2 rounded 
         bg-[#4b2e2b] text-[#f3ece0] 
         hover:bg-[#3b1f1e] transition ` +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}
