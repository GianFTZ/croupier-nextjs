'use client'
import { CreateAgentsSheet } from "@/components/agents/create-agent-sheet"
import { DataTable } from "@/components/table"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Eye, Clipboard, Trash2 } from "lucide-react"
import Header from "@/components/Header"
import { AD } from "@/domain/entities/ad"
import { CreateAdsSheet } from "@/components/ads/create-ads-sheet"
import { AdDataTable } from "@/components/ad-table"

const columns: ColumnDef<AD>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="rounded-lg mx-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="rounded-lg mx-1"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "sourceId",
    header: "Source ID",
    cell: ({ row }) => <div className="lowercase">{row.getValue("sourceId")}</div>,
  },
  {
    accessorKey: "leads",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          leads
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("leads")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.sourceId)}
            >
              <Clipboard className="h-4 mr-1" />Copiar source Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Eye className="h-4 mr-1" />Visualizar</DropdownMenuItem>
            <DropdownMenuItem><Trash2 className="h-4 mr-1" />Deletar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Page() {
  const TypedDataTable = AdDataTable<AD>
  return (
    <div className='flex h-screen w-full flex-col  gap-20 py-12 px-12'>
      <Header />
      <div className='w-full flex flex-row justify-between items-center'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Anuncios</h1>
        <CreateAdsSheet />
      </div>
      <div className='w-full flex flex-row gap-4'>
        <TypedDataTable columns={columns}/>
      </div>
    </div>
  )
}