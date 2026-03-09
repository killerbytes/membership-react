import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { type UseFormReturn } from "react-hook-form";

export default function ReviewTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<any>;
  onSubmit: () => void;
}) {
  const data = form.getValues();
  console.log(data);

  return (
    <TabsContent value="review" className="gap-4 flex flex-col">
      <Card className="gap-6">
        <CardHeader>
          <CardTitle>Review</CardTitle>
          <CardDescription>Review your information</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col"></CardContent>
      </Card>
      <Button type="button" onClick={onSubmit}>
        Next
      </Button>
    </TabsContent>
  );
}
