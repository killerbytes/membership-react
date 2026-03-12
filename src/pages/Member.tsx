import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMember } from "@/features/members/hooks/useMember";
import {
  BadgeCheck,
  Camera,
  CreditCard,
  FileText,
  Home,
  Mail,
  MapPin,
  MoveUpRight,
  Phone,
  User,
} from "lucide-react";

function MemberSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="rounded-xl bg-primary/10 p-5 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary/20 shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-32 rounded bg-primary/20" />
          <div className="h-3 w-24 rounded bg-primary/10" />
          <div className="h-5 w-20 rounded-full bg-primary/15 mt-1" />
        </div>
      </div>
      <div className="h-8 rounded-lg bg-muted w-full" />
      <div className="rounded-xl ring-1 ring-foreground/10 bg-card p-4 flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0"
          >
            <div className="h-2.5 w-16 rounded bg-muted" />
            <div className="h-4 w-40 rounded bg-muted/70" />
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-border last:border-0 gap-4">
      <div className="flex items-center gap-1.5 shrink-0">
        {icon && (
          <span className="text-muted-foreground/60 mt-0.5">{icon}</span>
        )}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span
        className={`text-sm font-medium text-right break-all ${
          highlight ? "text-primary" : "text-foreground"
        } ${!value || value === "-" ? "text-muted-foreground italic" : ""}`}
      >
        {value || "—"}
      </span>
    </div>
  );
}

function SectionLabel({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-1">
      <span className="text-primary">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

function PhotoFrame({ label, src }: { label: string; src?: string }) {
  const hasSrc = !!src && src !== "undefined" && src !== "null";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        {hasSrc && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            View full <MoveUpRight className="h-3 w-3" />
          </a>
        )}
      </div>
      <div
        className={`relative w-full overflow-hidden rounded-xl ring-1 ${
          hasSrc ? "ring-border" : "ring-dashed ring-border/70"
        } bg-muted`}
        style={{
          aspectRatio: hasSrc && label !== "Profile Photo" ? "16/9" : "4/3",
        }}
      >
        {hasSrc ? (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
            <Camera className="h-8 w-8" />
            <span className="text-xs">No {label.toLowerCase()} uploaded</span>
          </div>
        )}
      </div>
    </div>
  );
}

function getInitials(first?: string, last?: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";
}

export default function Members() {
  const { data: member, isWaiting: isMemberLoading } = useMember();

  if (isMemberLoading) {
    return <MemberSkeleton />;
  }

  const initials = getInitials(member?.firstName, member?.lastName);
  const fullName =
    [member?.firstName, member?.middleName, member?.lastName]
      .filter(Boolean)
      .join(" ") || "Member";

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-linear-to-br from-primary/90 to-primary p-5 flex items-center gap-4 shadow-md">
        <div className="h-16 w-16 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center shrink-0 shadow-inner">
          <span className="text-xl font-bold text-white">{initials}</span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-white font-semibold text-base leading-snug truncate">
            {fullName}
          </p>
          {(member?.email || member?.mobile) && (
            <p className="text-white/70 text-xs truncate">
              {member?.email ?? member?.mobile}
            </p>
          )}
          {member?.membershipId && (
            <div className="mt-1.5 flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-0.5 w-fit">
              <CreditCard className="h-3 w-3 text-white/80" />
              <span className="text-xs font-mono text-white/90 tracking-wide">
                {member.membershipId}
              </span>
            </div>
          )}
        </div>
        <div className="ml-auto shrink-0">
          <div className="flex items-center gap-1 bg-green-400/20 text-green-200 rounded-full px-2 py-0.5 text-xs font-medium">
            <BadgeCheck className="h-3 w-3" /> Active
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="photo">Photo</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
              <CardDescription>Your registered profile details</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              <SectionLabel icon={<User className="h-3.5 w-3.5" />}>
                Personal
              </SectionLabel>
              <InfoRow
                label="First Name"
                value={member?.firstName}
                icon={<User className="h-3 w-3" />}
              />
              <InfoRow label="Middle Name" value={member?.middleName} />
              <InfoRow label="Last Name" value={member?.lastName} />

              <div className="pt-4">
                <SectionLabel icon={<Mail className="h-3.5 w-3.5" />}>
                  Contact
                </SectionLabel>
                <InfoRow
                  label="Email"
                  value={member?.email}
                  icon={<Mail className="h-3 w-3" />}
                  highlight
                />
                <InfoRow
                  label="Mobile"
                  value={member?.mobile}
                  icon={<Phone className="h-3 w-3" />}
                />
              </div>

              <div className="pt-4">
                <SectionLabel icon={<FileText className="h-3.5 w-3.5" />}>
                  Government IDs
                </SectionLabel>
                <InfoRow
                  label="TIN No"
                  value={member?.tinNo || null}
                  icon={<FileText className="h-3 w-3" />}
                />
                <InfoRow
                  label="RSBSA No"
                  value={member?.rsbsaNo || null}
                  icon={<FileText className="h-3 w-3" />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address" className="mt-3 flex flex-col gap-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Home className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle>Permanent Address</CardTitle>
                  <CardDescription>Registered home address</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              <InfoRow
                label="Address Line 1"
                value={member?.permanentAddress1}
                icon={<MapPin className="h-3 w-3" />}
              />
              {member?.permanentAddress2 && (
                <InfoRow
                  label="Address Line 2"
                  value={member.permanentAddress2}
                />
              )}
              <InfoRow label="Barangay" value={member?.permanentBarangayName} />
              <InfoRow
                label="City / Municipality"
                value={member?.permanentCityName}
                highlight
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle>Current Address</CardTitle>
                  <CardDescription>Where you currently reside</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              <InfoRow
                label="Address Line 1"
                value={member?.currentAddress1}
                icon={<MapPin className="h-3 w-3" />}
              />
              {member?.currentAddress2 && (
                <InfoRow
                  label="Address Line 2"
                  value={member.currentAddress2}
                />
              )}
              <InfoRow label="Barangay" value={member?.currentBarangayName} />
              <InfoRow
                label="City / Municipality"
                value={member?.currentCityName}
                highlight
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photo" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Photos & Identification</CardTitle>
              <CardDescription>
                Your profile photo and valid ID on file
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <PhotoFrame
                label="Profile Photo"
                src={
                  member?.photoUrl
                    ? `${import.meta.env.VITE_IMAGE_URL}${member.photoUrl}`
                    : undefined
                }
              />
              <div className="border-t border-border pt-4">
                <PhotoFrame
                  label="Valid ID"
                  src={
                    member?.validIdUrl
                      ? `${import.meta.env.VITE_IMAGE_URL}${member.validIdUrl}`
                      : undefined
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
