import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Member } from "@/schemas";
import { memberServices } from "@/services";
import React from "react";

export default function Members() {
  const [member, setMember] = React.useState<Member>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  });
  const getData = async () => {
    const response = await memberServices.get(1);
    setMember(response);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex gap-4 flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Members Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Email
              </label>
              <span>{member?.email}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                First Name
              </label>
              <span>{member?.firstName}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Last Name
              </label>
              <span>{member?.lastName}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Middle Name
              </label>
              <span>{member?.middleName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Registered Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Address Line 1
              </label>
              <span>{member?.registeredAddress1}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Address Line 2
              </label>
              <span>{member?.registeredAddress2}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Barangay
              </label>
              <span>{member?.registeredBarangay}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                City
              </label>
              <span>{member?.registeredCity}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Address Line 1
              </label>
              <span>{member?.currentAddress1}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Address Line 2
              </label>
              <span>{member?.currentAddress2}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Barangay
              </label>
              <span>{member?.currentBarangay}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                City
              </label>
              <span>{member?.currentCity}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
