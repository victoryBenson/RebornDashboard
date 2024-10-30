import Link from "next/link";


export default function Home() {
 
  
  return (
    <main className="flex min-h-screen bg-blue-700 text-white justify-center items-center">
      <div className="gap-8 flex flex-col text-center">
        <p className="font-bold text-5xl">Welcome here</p>
        <button className="flex items-center justify-center">
          <Link href={'/dashboard'} className="border p-3 rounded-lg bg-white text-black font-semibold">View Dashboard</Link>
        </button>
      </div>
    </main>
  );
}
