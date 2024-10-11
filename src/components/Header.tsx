import Link from "next/link";

export default function Header() {
  return (
    <header className=" flex flex-row">
      <div className="w-2/5 ">
        <h1  className="text-2xl font-extrabold">Bluebell</h1>
      </div>
      <div className="w-3/5  flex gap-8 justify-end items-center pr-12">
        <Link href={"/"} className="text-lg font-bold">Dashboard</Link>
        <Link href={("/agents")} className="text-lg font-medium text-zinc-500">Corretores</Link>
        <Link href={"/ads"} className="text-lg font-medium text-zinc-500">Anuncios</Link>
        <Link href={"/about"} className="text-lg font-medium text-zinc-500">Sobre a empresa</Link>
      </div>
    </header>
  )
}