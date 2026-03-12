export default function MembershipLine({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-muted-foreground">{label}</label>
      <span className="font-medium">{children}</span>
    </div>
  );
}
