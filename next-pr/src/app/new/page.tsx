import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
"use server" // it means this runs only in <server-side!

const title = data.get("title")?.valueOf() // inside() should be the "name" value of input we wrote down

if (typeof title !=="string" || title.length===0) {
 
  throw new Error("Invalid Title")
}

await prisma.todo.create({data: {title, complete:false}})
redirect("/")

console.log("Hi! ");
}


export default function Page() {
return (
  <>
    <header className="flex justify-evenly items-center  mb-4">
      <h1 className="text-2xl">NEW</h1>
    </header>
    <form action={createTodo} className="flex gap-2 flex-col">
      <input
        type="text"
        name="title"
        className="border border-sky-600 bg-transparent rounded px-2 py-1 outline-none focus-within:border-sky-900"
      />
      <div className="flex gap-1 justify-end">
        <Link
          href=".."
          className="border border-sky-600 bg-transparent rounded px-2 py-1 outline-none focus-within:border-sky-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="border border-sky-600 bg-transparent rounded px-2 py-1 outline-none focus-within:border-sky-900"
        >Create</button>
      </div>
    </form>
  </>
);
}