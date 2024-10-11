"use client"

import * as React from "react"
import { MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HTMLAttributes } from "react"

interface ThemeToggleProps extends HTMLAttributes<HTMLDivElement> { }

export const ThemeToggle = ({ ...props }: ThemeToggleProps) => {
  const { setTheme } = useTheme()

  return (
    <div {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon" className="text-black dark:text-zinc-300">
            <Sun className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonStar className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Tema Claro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Tema Escuro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            Tema do Sistema
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
