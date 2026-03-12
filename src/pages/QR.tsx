import { useMember } from "@/features/members/hooks/useMember";
import { useStore } from "@/stores";
import { CheckCheck, Copy, QrCode, ScanLine, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useState } from "react";

function QRSkeleton() {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 py-8 animate-pulse">
      <div className="flex flex-col items-center gap-2">
        <div className="h-14 w-14 rounded-full bg-primary/20" />
        <div className="h-3.5 w-28 rounded bg-muted" />
        <div className="h-2.5 w-20 rounded bg-muted/70" />
      </div>
      <div className="h-64 w-64 rounded-2xl bg-muted ring-1 ring-border" />
      <div className="h-10 w-48 rounded-xl bg-muted" />
    </div>
  );
}

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg
      className={`absolute h-7 w-7 text-primary ${className ?? ""}`}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
    >
      <path d="M2 10 L2 2 L10 2" />
    </svg>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [value]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy membership ID"
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
    >
      {copied ? (
        <>
          <CheckCheck className="h-3.5 w-3.5 text-green-500" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </button>
  );
}

function getInitials(first?: string, last?: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";
}

export default function MyQRCode() {
  const { data: member, isWaiting } = useMember();
  const {
    authState: { user },
  } = useStore();

  if (isWaiting) {
    return <QRSkeleton />;
  }

  const initials = getInitials(member?.firstName, member?.lastName);
  const fullName =
    [
      member?.firstName,
      member?.middleName?.[0] ? `${member.middleName[0]}.` : null,
      member?.lastName,
    ]
      .filter(Boolean)
      .join(" ") || "Member";

  return (
    <div className="flex flex-1 flex-col items-center gap-6 py-4">
      <div className="flex items-center gap-2 self-start">
        <QrCode className="h-5 w-5 text-primary" />
        <h1>My QR Code</h1>
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
        <div className="h-14 w-14 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center ring-4 ring-primary/20 shadow-md">
          <span className="text-lg font-bold text-white">{initials}</span>
        </div>
        <p className="text-base font-semibold text-foreground">{fullName}</p>
        {(member?.email || user?.email) && (
          <p className="text-xs text-muted-foreground">
            {member?.email ?? user?.email}
          </p>
        )}
      </div>

      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-xl scale-110 pointer-events-none" />

        <div className="relative rounded-3xl bg-white p-6 shadow-xl ring-1 ring-border flex flex-col items-center gap-4">
          <CornerBracket className="top-3 left-3" />
          <CornerBracket className="top-3 right-3 rotate-90" />
          <CornerBracket className="bottom-3 right-3 rotate-180" />
          <CornerBracket className="bottom-3 left-3 -rotate-90" />

          {member?.membershipId ? (
            <QRCodeSVG
              value={member.membershipId}
              size={200}
              bgColor="#ffffff"
              fgColor="#012976"
              level="H"
              style={{ display: "block" }}
            />
          ) : (
            <div className="h-50 w-50 flex flex-col items-center justify-center gap-3 text-muted-foreground/50">
              <QrCode className="h-16 w-16" />
              <p className="text-xs text-center">QR code unavailable</p>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <ScanLine className="h-3.5 w-3.5" />
            <span className="text-xs">Align code within scanner</span>
          </div>
        </div>
      </div>

      {member?.membershipId && (
        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 ring-1 ring-border w-full max-w-xs">
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Membership ID
            </span>
            <span className="text-sm font-mono font-bold text-foreground tracking-wide truncate">
              {member.membershipId}
            </span>
          </div>
          <CopyButton value={member.membershipId} />
        </div>
      )}

      <div className="flex items-start gap-2.5 rounded-xl bg-accent px-4 py-3 w-full max-w-xs">
        <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-accent-foreground leading-relaxed">
          Present this QR code to a cooperative staff to verify your membership.
          Keep your code confidential.
        </p>
      </div>
    </div>
  );
}
