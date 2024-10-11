'use client'
import {
  Card, CardContent, CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Chart from "@/components/Chart"
import Header from "@/components/Header"


export default function Page() {
  const leads = [
    {
      name: 'Gian',
      jid: '+55 45 99984-7520',
      corretor: 'Joao'
    },
    {
      name: 'Felipe',
      jid: '+55 45 99984-7520',
      corretor: 'Joao'
    },
    {
      name: 'Theodorowicz',
      jid: '+55 45 99984-7520',
      corretor: 'Joao'
    },
    {
      name: '',
      jid: '+55 45 99984-7520',
      corretor: 'Joao'
    },
    {
      name: 'Zucoloto',
      jid: '+55 45 99984-7520',
      corretor: 'Joao'
    }
  ]
  const ads = [
    {
      name: "Casas regiao norte",
      leads: 123
    },
    {
      name: "Apartamentos regiao sul",
      leads: 234
    },
    {
      name: "Imóveis regiao leste",
      leads: 345
    },
    {
      name: "Imóveis regiao oeste",
      leads: 456
    },
    {
      name: "Imóveis regiao sul",
      leads: 567
    }
  ]
  return (
    <div className="flex h-screen w-full flex-col  gap-20 py-12 px-12">
      <Header />
      <main className="flex flex-col gap-12">
        <h1 className="font-extrabold text-4xl">Painel de controle</h1>
        <StatsCards />
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <SquareChart />
          </Card>
          <Card className="h-full flex flex-col justify-between">
            <Chart />
          </Card>
        </div>
      </main>
      <footer className="grid grid-cols-2 gap-4 h-full">
        <Card>
          <CardHeader className="flex flex-row items-center w-full justify-between">
            <div className="flex flex-row gap-4">
              <CardTitle>Ultimos leads</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <Button>Ver todos</Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {leads.map((lead) => {
              return (
                <div className="flex flex-row items-center justify-between pr-1">
                  <div className="flex flex-row gap-4 items-center">
                    <Avatar className="hidden h-12 w-12 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback className="text-sm">CO</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-base font-medium leading-none">{lead.name || "nao-consta"}</p>
                      <p className="text-base text-muted-foreground">
                        {lead.jid}
                      </p>
                      <p className="text-base text-muted-foreground">
                        <span className="font-bold">Corretor: </span>{lead.jid}
                      </p>
                    </div>
                  </div>
                  <div>5 min atras</div>
                </div>
              )
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center w-full justify-between">
            <div className="flex flex-row gap-4">
              <CardTitle>Anuncios com mais leads</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <Button>Ver todos</Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 mt-4">
            {ads.map(ad => {
              return (
                <div className="flex flex-row items-center justify-between pr-1">
                  <div className="flex flex-row gap-4 items-center">
                    <p className="text-base font-medium leading-none">{ad.name}</p>
                  </div>
                  <div>{ad.leads}</div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}




const data = [
  { name: "Segunda", quantity: 700 },
  { name: "Terca", quantity: 600 },
  { name: "Quarta", quantity: 550 },
  { name: "Quinta", quantity: 300 },
  { name: "Sexta", quantity: 400 },
  { name: "Sabado", quantity: 200 },
  { name: "Domingo", quantity: 450 },
];

const SquareChart = () => {
  const maxQuantity = Math.max(...data.map((item) => item.quantity));
  const squareValue = Math.floor(maxQuantity / 5);

  return (
    <div className="flex flex-col h-full">
      <div className="flex py-4 flex-row justify-center gap-4 lg:gap-2 w-full">
        {data.map((item) => {
          const numSquares = Math.ceil(item.quantity / squareValue);
          const squaresArray = Array(numSquares).fill("white");
          if (numSquares > 0) {
            squaresArray[squaresArray.length - 1] = "black";
          }
          return (
            <div key={item.name} className="flex flex-col items-center gap-28">
              <p className="mt-2 text-center text-sm font-medium">{item.name}</p>
              <div className="flex flex-col-reverse h-full justify-starts">
                {squaresArray.map((color, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 flex items-center justify-center font-bold rounded-lg ${color === "black"
                      ? "bg-black text-white z-20"
                      : "bg-white border border-zinc-700"
                      }`}
                  >
                    {color === "black" ? `${item.quantity}` : ""}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full h-full flex pl-6 py-6 gap-4 justify-start items-end ">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 leading-none font-bold text-xl">{data.map(e => e.quantity).reduce((prev, curr) => prev + curr)}</div>
          <div className="leading-none font-medium">
            Leads essa semana
          </div>
        </div>
      </div>
    </div>
  );
};


function StatsCards() {
  return (
    <div className="flex flex-row overflow-x-auto gap-6">
      <Card className="aspect-video bg-[#fceee3] min-w-52">
        <CardContent className="flex flex-col justify-center items-center h-full gap-2 py-2">
          <div className="text-5xl font-bold">459</div>
          <div className="text-1xl font-medium">
            LEADS
          </div>
          <p className="text-xs text-muted-foreground">
            +20.1% sob o mes passado
          </p>
        </CardContent>
      </Card>
      <Card className="aspect-video bg-[#f0fcf0] min-w-52">
        <CardContent className="flex flex-col justify-center items-center h-full gap-2 py-2">
          <div className="text-5xl font-bold gap-4 flex justify-center items-baseline">10<span className="text-2xl font-medium">/ 35</span></div>
          <div className="text-1xl font-medium">
            CORRETORES
          </div>
          <p className="text-xs text-muted-foreground">
            Corretores ativos
          </p>
        </CardContent>
      </Card>
      <Card className="aspect-video bg-[#e6f5f8] min-w-52">
        <CardContent className="flex flex-col justify-center items-center h-full gap-2 py-2">
          <div className="text-5xl font-bold gap-4 flex justify-center items-baseline">4<span className="text-2xl font-medium">/ 12</span></div>
          <div className="text-1xl font-medium">
            ANUNCIOS
          </div>
          <p className="text- xs text-muted-foreground">
            Anuncios ativos
          </p>
        </CardContent>
      </Card>
      <Card className="aspect-video bg-[#1c1b20] min-w-52">
        <CardContent className="flex flex-col justify-center items-center h-full gap-2 py-2 text-zinc-50">
          <div className="text-5xl font-bold">12</div>
          <div className="text-1xl font-medium">
            LEADS RETIDOS
          </div>
          <p className="text-xs text-muted-foreground text-zinc-400">
            Clique para distribuir
          </p>
        </CardContent>
      </Card>
    </div>
  )
}