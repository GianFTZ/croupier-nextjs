"use client"
import Header from "@/components/Header";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Page() {
  return (
    <div className='flex h-screen w-full flex-col  gap-20 py-12 px-12'>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Informacoes da empresa</CardTitle>
          <CardDescription>
            Nome usado apenas para fins internos e de design.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input defaultValue={"Bluebell"} />
            <Popover>
              <PopoverTrigger asChild className="w-1/3 place-self-end">
                <Button variant="outline">Horario de atedimento</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="inicio">Inicio do atendimento</Label>
                      <Input
                        id="inicio"
                        className="col-span-2 h-8"
                        type="time"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="fim">Fim do atendimento</Label>
                      <Input
                        id="fim"
                        type="time"
                        className="col-span-2 h-8"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>

  )
}