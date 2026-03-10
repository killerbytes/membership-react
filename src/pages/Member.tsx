import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMember } from "@/features/members/hooks/useMember";

export default function Members() {
  const { data: member, isWaiting: isMemberLoading } = useMember();

  if (isMemberLoading) {
    return <div>Loading member data...</div>;
  }

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
                Member ID
              </label>
              <span>{member?.membershipId}</span>
            </div>
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
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                TIN No
              </label>
              <span>{member?.tinNo ? member?.tinNo : "-"}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                RSBSA No
              </label>
              <span>{member?.rsbsaNo ? member?.rsbsaNo : "-"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Permanent Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Address Line 1
              </label>
              <span>{member?.permanentAddress1}</span>
            </div>
            {member?.permanentAddress2 && (
              <div className="flex flex-col">
                <label htmlFor="" className="text-sm text-muted-foreground">
                  Address Line 2
                </label>
                <span>{member?.permanentAddress2}</span>
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Barangay
              </label>
              <span>{member?.permanentBarangayName}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                City
              </label>
              <span>{member?.permanentCityName}</span>
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
            {member?.currentAddress2 && (
              <div className="flex flex-col">
                <label htmlFor="" className="text-sm text-muted-foreground">
                  Address Line 2
                </label>
                <span>{member?.currentAddress2}</span>
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                Barangay
              </label>
              <span>{member?.currentBarangayName}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-muted-foreground">
                City
              </label>
              <span>{member?.currentCityName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
