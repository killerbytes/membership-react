import { Tabs } from "@/components/ui/tabs";
import { ROUTES } from "@/constants";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { memberApi } from "@/features/members/api";
import { memberInputSchema, type MemberInput } from "@/features/members/types";
import AddressTab from "@/features/onboarding/components/AddressTab";
import { BreadcrumbTabs } from "@/features/onboarding/components/BreadcrumbTabs";
import IdentificationTab from "@/features/onboarding/components/IdentificationTab";
import InfoTab from "@/features/onboarding/components/InfoTab";
import ProfileTab from "@/features/onboarding/components/ProfileTab";
import ReviewTab from "@/features/onboarding/components/ReviewTab";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, MapPinHouse, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "info", label: "Info", icon: User },
  { key: "address", label: "Address", icon: MapPinHouse },
  { key: "identification", label: "Photo", icon: IdCard },
];

const tabFields = {
  profile: ["firstName", "lastName", "middleName"],
  info: ["email", "mobile", "tinNo", "rsbsaNo"],
  address: [
    "permanentAddress1",
    "permanentAddress2",
    "permanentCity",
    "permanentBarangay",
    "currentAddress",
    "currentAddress1",
    "currentAddress2",
    "currentCity",
    "currentBarangay",
  ],
  identification: ["photoUrl", "validIdUrl"],
} as const;

const STEP_DESCRIPTIONS: Record<string, { title: string; subtitle: string }> = {
  profile: {
    title: "Tell us your name",
    subtitle: "Step 1 of 4 — Personal information",
  },
  info: {
    title: "Contact & IDs",
    subtitle: "Step 2 of 4 — How we'll reach you",
  },
  address: {
    title: "Your address",
    subtitle: "Step 3 of 4 — Where you reside",
  },
  identification: {
    title: "Photo & Valid ID",
    subtitle: "Step 4 of 4 — Verify your identity",
  },
};

export default function Onboarding() {
  const [activeTab, setActiveTab] = React.useState("identification");
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();
  if (user?.member) {
    navigate(ROUTES.MEMBER);
  }
  const form = useForm<MemberInput>({
    resolver: zodResolver(memberInputSchema),
    defaultValues: {
      currentAddress: true,
      currentAddress1: "",
      currentAddress2: "",
      currentBarangay: "",
      currentCity: "",
      firstName: "",
      lastName: "",
      middleName: "",
      permanentAddress1: "",
      permanentAddress2: "",
      permanentBarangay: "",
      permanentCity: "",
      rsbsaNo: "",
      tinNo: "",
      photoUrl: "xx",
      validIdUrl: "xx",
    },
  });

  React.useEffect(() => {
    form.reset({
      ...form.getValues(),
      ...(user?.email && { email: user.email }),
      ...(user?.mobile && { mobile: user.mobile }),
    });
  }, [user]);

  const onSubmit = async (formValues: any) => {
    try {
      await memberApi.create(formValues);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      toast.success("Member created successfully");
      navigate(ROUTES.MEMBER);
    } catch (err: any) {
      if (err.type === "VALIDATION_ERROR") {
        const error = err as {
          error?: string;
          errors?: { field: any; message: string }[];
        };
        let firstErrorTab: string | null = null;

        error.errors?.forEach((e) => {
          if (e.field) {
            form.setError(e.field, {
              type: "server",
              message: e.message,
            });

            if (!firstErrorTab) {
              for (const [tab, fields] of Object.entries(tabFields)) {
                if ((fields as readonly string[]).includes(e.field)) {
                  firstErrorTab = tab;
                  break;
                }
              }
            }
          }
        });

        if (firstErrorTab) {
          setActiveTab(firstErrorTab);
        }
      } else {
        toast.error(err.message);
      }
    }
  };

  const onInvalid = (errors: any) => {
    for (const [tab, fields] of Object.entries(tabFields)) {
      if (fields.some((field) => errors[field])) {
        setActiveTab(tab);
        break;
      }
    }
  };

  const handleNext = async (
    currentTabKey: keyof typeof tabFields,
    nextTabKey: string
  ) => {
    const isValid = await form.trigger(tabFields[currentTabKey] as any);
    if (isValid) {
      setActiveTab(nextTabKey);
    }
  };

  const stepInfo = STEP_DESCRIPTIONS[activeTab] ?? {
    title: "Member Onboarding",
    subtitle: "Complete all steps to register",
  };

  return (
    <div className="flex flex-col gap-5 flex-1">
      <div className="flex flex-col gap-0.5">
        <h1 className="leading-tight">{stepInfo.title}</h1>
        <p className="text-xs text-muted-foreground">{stepInfo.subtitle}</p>
      </div>

      <BreadcrumbTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <ProfileTab
          form={form}
          onSubmit={() => handleNext("profile", "info")}
        />
        <InfoTab form={form} onSubmit={() => handleNext("info", "address")} />
        <AddressTab
          form={form}
          onSubmit={() => handleNext("address", "identification")}
        />
        <IdentificationTab
          form={form}
          onSubmit={() => {
            form.handleSubmit(onSubmit, onInvalid)();
          }}
        />
        <ReviewTab
          form={form}
          onSubmit={() => {
            form.handleSubmit(onSubmit, onInvalid)();
          }}
        />
      </Tabs>
    </div>
  );
}
