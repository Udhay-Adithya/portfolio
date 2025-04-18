import Intro from "@/components/homepage/intro";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4">
      <Intro />
      { /* <LinkButtons /> */}
    </main>
  );
}
