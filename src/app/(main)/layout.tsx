import { Button } from "@/components/ui/button";
import UserMenu from "@/components/user-menu";
import { ADMIN_PAGES } from "@/constants/pages.constants";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-md:px-4 flex h-14 w-full max-w-full">
          <nav className="flex items-center gap-2 md:gap-4 lg:gap-6">
            <Button asChild variant="link" className="max-md:p-0">
              <Link href={ADMIN_PAGES.HOME}>Главная</Link>
            </Button>
          </nav>
          <div className="flex flex-1 items-center justify-end">
            <UserMenu />
          </div>
        </div>
      </header>
      <main className="container px-[4rem] max-w-full max-md:px-4 mt-8">
        {children}
      </main>
    </div>
  );
}
