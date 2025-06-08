import DashboardSideNav from "@/components/DashboardSideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex flex-row min-h-screen">
      <div className="bg-gray-100 w-full max-w-56">
        <DashboardSideNav />
      </div>
      <div>{children}</div>
    </main>
  );
}
