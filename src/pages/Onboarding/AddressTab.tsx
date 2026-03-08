import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { locationServices } from "@/services";
import React from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

export default function AddressTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<any>;
  onSubmit: () => void;
}) {
  const [cities, setCities] = React.useState<any[]>([]);
  const [barangays, setBarangays] = React.useState<any[]>([]);
  const getCities = async () => {
    const cities = await locationServices.getCities();
    setCities(cities);
  };

  const getBarangays = async (cityCode: string) => {
    const barangays = await locationServices.getBarangays(cityCode);
    setBarangays(barangays);
  };

  React.useEffect(() => {
    getCities();
  }, []);

  return (
    <TabsContent value="address" className="gap-4 flex flex-col">
      <Card className="gap-6">
        <CardHeader>
          <CardTitle>Permanent Address</CardTitle>
          <CardDescription>Enter your address details</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          <Controller
            name="registeredAddress1"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    House No, Street Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your house no, street name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="registeredAddress2"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Village/Subdivision/Purok
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your village/subdivision/purok"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="registeredCity"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <NativeSelect
                    {...field}
                    onChange={(e) => {
                      console.log(e.target.value);

                      field.onChange(e.target.value);
                      getBarangays(e.target.value);
                    }}
                  >
                    <NativeSelectOption value="">
                      Select city
                    </NativeSelectOption>
                    {cities.map((city) => (
                      <NativeSelectOption key={city.code} value={city.code}>
                        {city.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {/* <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your city"
                  /> */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="registeredBarangay"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Barangay</FieldLabel>
                  <NativeSelect
                    {...field}
                    disabled={barangays.length === 0}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  >
                    <NativeSelectOption value="">
                      Select barangay
                    </NativeSelectOption>
                    {barangays.map((barangay) => (
                      <NativeSelectOption
                        key={barangay.code}
                        value={barangay.code}
                      >
                        {barangay.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="currentAddress"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    House No, Street Name
                  </FieldLabel>
                  <div className="flex items-center space-x-2">
                    <Switch
                      {...field}
                      defaultChecked={field.value}
                      onCheckedChange={(e) => field.onChange(e)}
                      id={field.name}
                    />
                    <Label htmlFor={field.name}>Current Address</Label>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
        </CardContent>
      </Card>

      <Card className="gap-6">
        <CardHeader>
          <CardTitle>Current Address</CardTitle>
          <CardDescription>Enter your address details</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          <Controller
            name="currentAddress1"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    House No, Street Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your house no, street name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="currentAddress2"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Village/Subdivision/Purok
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your village/subdivision/purok"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="currentCity"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <NativeSelect
                    {...field}
                    onChange={(e) => {
                      console.log(e.target.value);

                      field.onChange(e.target.value);
                      getBarangays(e.target.value);
                    }}
                  >
                    <NativeSelectOption value="">
                      Select city
                    </NativeSelectOption>
                    {cities.map((city) => (
                      <NativeSelectOption key={city.code} value={city.code}>
                        {city.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {/* <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your city"
                  /> */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="currentBarangay"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Barangay</FieldLabel>
                  <NativeSelect
                    {...field}
                    disabled={barangays.length === 0}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  >
                    <NativeSelectOption value="">
                      Select barangay
                    </NativeSelectOption>
                    {barangays.map((barangay) => (
                      <NativeSelectOption
                        key={barangay.code}
                        value={barangay.code}
                      >
                        {barangay.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
        </CardContent>
      </Card>
      <Button type="button" onClick={onSubmit}>
        Next
      </Button>
    </TabsContent>
  );
}
