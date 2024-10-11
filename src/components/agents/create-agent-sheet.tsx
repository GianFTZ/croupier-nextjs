import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from "lucide-react"

export const CreateAgentsSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"lg"}>
          <Plus className="h-6 w-6 mr-2" />Criar corretor
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-inherit">
        <SheetHeader>
          <SheetTitle>Criar novo corretor</SheetTitle>
          <SheetDescription>
            Preencha corretamente as informações do corretor.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Numero de telefone
              </Label>
              <Input id="name" className="col-span-3" />
            <Button className="col-span-4">Testar numero</Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}