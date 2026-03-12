import { Toaster } from "@/components/ui/sonner";
import Header from "./Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main className="flex-1 px-4 pb-4 pt-4 flex flex-col">{children}</main>
      <Toaster position="bottom-left" richColors />
    </div>
  );
}
