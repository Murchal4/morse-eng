
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Translator } from "@/components/morse/Translator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 px-6 border-b">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">Morse Code Translator</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 container py-12 px-4">
        <Translator />
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Morse Code Translator &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
