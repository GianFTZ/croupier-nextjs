'use client'
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LayoutDashboard, Users, Building2, Database, Settings, UserCog, LogOut, MessageSquareText } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "@/components/ui/loading"

const icons = {
  main: new Map<string, React.ReactNode>([
    ["/dashboard", <LayoutDashboard />],
  ]),
  utils: new Map<string, React.ReactNode>([
    ["/clients", <Users />],
    ["/organizations", <Building2 />],
    ["/datasources", <Database />],
    ["/messages", <MessageSquareText />],
  ]),
  settings: new Map<string, React.ReactNode>([
    ["", <ThemeToggle />],
    ["/5", <Settings />],
    ["/6", <UserCog />],
    ["/7", <LogOut />]
  ])
}

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLeaving, setIsLeaving] = useState(false)
  const [nextPath, setNextPath] = useState("")
  const [loading, setLoading] = useState(false)

  const handleNavigation = (path: string) => {
    if (path !== pathname) {
      setIsLeaving(true)
      setNextPath(path)
      setLoading(true)
    }
  }

  useEffect(() => {
    if (isLeaving) {
      const timeout = setTimeout(() => {
        router.push(nextPath)
        setIsLeaving(false)
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [isLeaving, nextPath, router])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <div className="flex min-h-screen w-full flex-row">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[111px] flex-col items-center justify-between border-r bg-background sm:flex">
        <div className="flex items-center justify-center mt-6 mb-8">
          <Image src={"/Type=Logo.svg"} width={30} height={30} alt="logo" />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center flex-grow transition-all duration-500 ease-in-out">
          {/* Main Icons */}
          {Array.from(icons.main.entries()).map(([path, icon]) => (
            <div
              key={path}
              onClick={() => handleNavigation(path)} // Manuseia a navegação manualmente
              className={`flex items-center justify-center w-16 h-16 rounded-lg cursor-pointer ${pathname === path
                ? 'bg-zinc-50 border-2 border-zinc-100 hover:bg-zinc-100 text-purple-600 hover:text-purple-500 dark:bg-slate-950 dark:border-slate-900 transition-all duration-200 ease-in-out'
                : 'text-black hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-100/5 transition-all duration-200 ease-in-out'
                }`}
            >
              {icon}
            </div>
          ))}

          <Separator className="my-4" />

          {/* Utils Icons */}
          {Array.from(icons.utils.entries()).map(([path, icon]) => (
            <div
              key={path}
              onClick={() => handleNavigation(path)}
              className={`flex items-center justify-center w-16 h-16 rounded-lg cursor-pointer ${pathname === path
                ? 'bg-zinc-50 border-2 border-zinc-100 hover:bg-zinc-100 text-purple-600 hover:text-purple-500 dark:bg-slate-950 dark:border-slate-900 transition-all duration-200 ease-in-out'
                : 'text-black hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-slate-800/20 transition-all duration-200 ease-in-out'
                }`}
            >
              {icon}
            </div>
          ))}

          <Separator className="my-4" />

          {/* Settings Icons */}
          {Array.from(icons.settings.entries()).map(([path, icon]) => (
            <div
              key={path}
              onClick={() => handleNavigation(path)}
              className={`flex items-center justify-center w-16 h-16 rounded-lg cursor-pointer ${pathname === path
                ? 'bg-zinc-50 border-2 border-zinc-100 hover:bg-zinc-100 text-purple-600 hover:text-purple-500 dark:bg-slate-950 dark:border-slate-900 transition-all duration-200 ease-in-out'
                : 'text-black hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-slate-800/20 transition-all duration-200 ease-in-out'
                }`}
            >
              {icon}
            </div>
          ))}
        </div>
      </aside>

      <div className="flex flex-col sm:py-16 sm:px-44 w-full overflow-y-hidden">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Loading />
            </motion.div>
          ) : (
            !isLeaving && (
              <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
