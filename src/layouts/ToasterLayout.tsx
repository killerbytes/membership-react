import { Toaster } from "@/components/ui/sonner";

export default function ToasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col">
      {children}
      <Toaster position="top-right" richColors />
    </div>
  );
}
