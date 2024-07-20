import Header from "@/components/Header";
import Link from "next/link";
export default function Home() {
  return (
    <main
      className="h-full bg-cover bg-center"
      style={{
        backgroundImage: "url('https://t3.ftcdn.net/jpg/02/53/98/62/240_F_253986268_I3wMfXKQvcjNVcRSLDTMfKtkvbmpAj1J.jpg')",
      }}
    >
    <Header/>      

    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-6">Welcome to Mini Quiz <span className="text-info">App</span></h1>
        <div className="space-x-4">
          
          <Link href="/homepage" className="btn btn-primary">
            Start Quiz
          </Link>
        </div>
      </div>

    </main>
  );
}
