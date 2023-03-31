import Link from 'next/link'

export function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 dark:text-white hover:bg-slate-100  dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
    >
      {children}
    </Link>
  )
}
