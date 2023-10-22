
import { prisma } from "@/db";
import Link from "next/link";
import { TodoItem } from "@/components/TodoItem";

function getTodos() {

  return prisma.todo.findMany();
}

export default async function Home() {
const todos=await getTodos();
// await prisma.todo.create({ data: { title: "test", complete: false } });

async function toggleTodo (id: string, complete:boolean) {
"use server"

console.log(id, complete)

await prisma.todo.update({where:{id}, data:{complete}})
}

  return (
    <>
      <header className="flex justify-evenly items-center  mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-sky-600 text-sky-600 px-3 py-1 rounded hover:bg-rose-300 hover:text-slate-100 focus-within:shadow-lg outline-none"
          href=" /new"
        >
          New Page
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
        ))}
      </ul>
    </>
  );
}