
import { Button } from "../components/ui/button";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="relative py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <div className="mt-6 m-auto space-y-6 ">
              <h1 className="text-center  text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
                My Duct
              </h1>
              {/* <p className="text-center text-xl text-gray-600 dark:text-gray-300">
                Be part of millions people around the world using tailus in
                modern User Interfaces.
              </p> */}
              <div className="flex flex-wrap justify-center gap-6">
                <Button onClick={() => router.push('/myduct') }>Enter</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
