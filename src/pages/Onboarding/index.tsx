import { Tabs } from "@/components/ui/tabs";
import { BreadcrumbTabs } from "@/pages/Onboarding/BreadcrumbTabs";
import { memberServices } from "@/services";
import { useStore } from "@/stores";
import { IdCard, MapPinHouse, User } from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import AddressTab from "./AddressTab";
import IdentificatioTab from "./IdentificationTab";
import InfoTab from "./InfoTab";
import ProfileTab from "./ProfileTab";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "info", label: "Info", icon: User },
  { key: "address", label: "Address", icon: MapPinHouse },
  { key: "identification", label: "Photo", icon: IdCard },
];
export default function Onboarding() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const {
    authState: { user },
  } = useStore();

  const form = useForm({
    defaultValues: {
      currentAddress: true,
      currentAddress1: "",
      currentAddress2: "",
      currentBarangay: "",
      currentCity: "",
      firstName: "Bruce",
      lastName: "Wayne",
      middleName: "X",
      registeredAddress1: "123 Street",
      registeredAddress2: "",
      registeredBarangay: "",
      registeredCity: "",
      rsbsaNo: "",
      tinNo: "",
    },
  });

  React.useEffect(() => {
    form.reset({
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const onSubmit = async (formValues) => {
    try {
      console.log(formValues);
      await memberServices.register(formValues);
    } catch (error) {
      console.log(error.error);
      error.errors?.forEach((err) => {
        if (err.field) {
          form.setError(err.field, {
            type: "server",
            message: err.message,
          });
        }
      });
    }
  };

  const data = useWatch({ control: form.control });

  return (
    <div className="flex flex-col gap-4">
      <h1>Member Onboarding</h1>
      <BreadcrumbTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <ProfileTab form={form} onSubmit={() => setActiveTab("info")} />
        <InfoTab form={form} onSubmit={() => setActiveTab("address")} />
        <AddressTab
          form={form}
          onSubmit={() => setActiveTab("identification")}
        />
        <IdentificatioTab
          form={form}
          onSubmit={() => form.handleSubmit(onSubmit)()}
        />
      </Tabs>
      {JSON.stringify(data)}
    </div>
  );
}
