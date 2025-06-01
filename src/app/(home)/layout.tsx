import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex-1">{children}</div>
    </main>
  );
}
