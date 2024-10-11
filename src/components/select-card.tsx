'use client'

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"


export function SelectCard({  entityOpen, entityValue, setEntityOpen, setEntityValue, data, entityTitle }: { entityOpen: boolean, setEntityOpen: ((open: boolean) => void), entityValue: string, setEntityValue: ((value: string) => void), data: any[], entityTitle: string }) {
  return (
    <Popover open={entityOpen} onOpenChange={setEntityOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={entityOpen}
          className="px-4 justify-between"
        >
          {entityValue
            ? data.find((entity) => entity.name === entityValue)?.name
            : `Selecione uma ${entityTitle}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${entityTitle}..`} />
          <CommandList>
            <CommandEmpty>No datasource found.</CommandEmpty>
            <CommandGroup>
              {data.map((entity) => (
                <CommandItem
                  key={entity.name}
                  value={entity.name}
                  onSelect={(currentValue) => {
                    setEntityValue(currentValue === entityValue ? "" : currentValue)
                    setEntityOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      entityValue === entity.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {entity.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}