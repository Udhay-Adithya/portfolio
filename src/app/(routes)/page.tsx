import Intro from "@/components/homepage/intro";
import LinkButtons from "@/components/homepage/link-buttons";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-start justify-center px-4 bg-background text-foreground">
      <Intro />
      <LinkButtons />
    </main>
  );
}
