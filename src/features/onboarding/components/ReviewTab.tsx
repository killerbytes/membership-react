import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Loader2, Send } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

export default function ReviewTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<any>;
  onSubmit: () => void;
}) {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <TabsContent value="review" className="gap-4 flex flex-col">
      <Card className="gap-6">
        <CardHeader>
          <CardTitle>Review</CardTitle>
          <CardDescription>Review your information</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col"></CardContent>
      </Card>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full gap-2"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {isSubmitting ? "Submitting…" : "Submit Application"}
      </Button>
    </TabsContent>
  );
}
