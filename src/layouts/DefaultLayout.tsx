import { Toaster } from "@/components/ui/sonner";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 flex flex-col gap-4">
      {children}
      <Toaster position="top-left" richColors />
    </div>
  );
}
