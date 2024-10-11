'use client'
import { useEffect, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "./ui/input"
import { DropdownMenuCheckboxItem } from "./ui/dropdown-menu"
import { ChevronDownIcon, Clipboard, Eye, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { loadAgentsFromAds, loadAgentsFromBusinessId } from "@/app/agents/actions"
import { Agent } from "@/domain/entities/agent"
import { SelectCard } from "./select-card"
import { loadAdsFromBusinessId } from "@/app/ads/actions"
import { AD } from "@/domain/entities/ad"



export function DataTable<T>({columns}: {
  columns: ColumnDef<T>[]
}) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [ads, setAds] = useState<AD[]>([])
  const [adId, setAdId] = useState<string>()
  const [adOpen, setAdOpen] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  useEffect(() => {
    loadAgentsFromBusinessId({ business: { id: "1" } }, { source: "mock" }).then(res => setAgents(res))
    loadAdsFromBusinessId({ business: { id: "1" } }, { source: "mock" }).then(res => setAds(res))
  }, [])


  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: agents as T[] || [],
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleAdsClick = async (adId: string) => {
    const data = await loadAgentsFromAds({ ad: { id: adId } }, { source: "mock" })
    setAgents(data)
    setAdId(adId)
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Pesquisar por telefone..."
          value={(table.getColumn("jid")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("jid")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <SelectCard entityTitle='Anuncio' data={ads} entityOpen={adOpen} entityValue={adId || ""} setEntityOpen={setAdOpen} setEntityValue={handleAdsClick} />
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}