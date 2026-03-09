import { Tabs } from "@/components/ui/tabs";
import { ROUTES } from "@/constants";
import { useCurrentUser } from "@/features/auth/hooks/userCurrentUser";
import { memberApi } from "@/features/members/api";
import { memberInputSchema, type MemberInput } from "@/features/members/types";
import AddressTab from "@/features/onboarding/components/AddressTab";
import { BreadcrumbTabs } from "@/features/onboarding/components/BreadcrumbTabs";
import IdentificationTab from "@/features/onboarding/components/IdentificationTab";
import InfoTab from "@/features/onboarding/components/InfoTab";
import ProfileTab from "@/features/onboarding/components/ProfileTab";
import ReviewTab from "@/features/onboarding/components/ReviewTab";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, MapPinHouse, User } from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "info", label: "Info", icon: User },
  { key: "address", label: "Address", icon: MapPinHouse },
  { key: "identification", label: "Photo", icon: IdCard },
];
export default function Onboarding() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  const form = useForm<MemberInput>({
    resolver: zodResolver(memberInputSchema),
    defaultValues: {
      currentAddress: false,
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
      // email: "",
      // mobile: "",
      photoUrl: "xxx",
      validIdUrl: "xxx",
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
      console.log(formValues);
      await memberApi.createMember(formValues);
      toast.success("Member created successfully");
      navigate(ROUTES.MEMBER);
    } catch (err: unknown) {
      if (err.type === "VALIDATION_ERROR") {
        const error = err as {
          error?: string;
          errors?: { field: any; message: string }[];
        };
        console.log(error);
        error.errors?.forEach((e) => {
          if (e.field) {
            form.setError(e.field, {
              type: "server",
              message: e.message,
            });
          }
        });
      } else {
        toast.error(err.message);
      }
    }
  };

  const formData = useWatch({ control: form.control });

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
    identification: ["email"],
  } as const;

  const handleNext = async (
    currentTabKey: keyof typeof tabFields,
    nextTabKey: string
  ) => {
    const isValid = await form.trigger(tabFields[currentTabKey] as any);
    if (isValid) {
      setActiveTab(nextTabKey);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Member Onboarding</h1>
      <BreadcrumbTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
          onSubmit={() => handleNext("identification", "review")}
        />
        <ReviewTab
          form={form}
          onSubmit={() => {
            console.log(form.getValues(), form.formState.errors);

            form.handleSubmit(onSubmit)();
          }}
        />
      </Tabs>
      {/* <pre className="bg-muted p-4 rounded-md text-xs">
        {JSON.stringify(formData, null, 2)}
      </pre> */}
    </div>
  );
}
