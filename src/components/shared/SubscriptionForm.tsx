
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/services/news.service";
import { toast } from "@/components/ui/use-toast";
import { Mail, CheckCircle } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type SubscriptionFormValues = z.infer<typeof formSchema>;

const SubscriptionForm = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: SubscriptionFormValues) => {
    try {
      const success = await subscribeToNewsletter(values.email);
      if (success) {
        setIsSubscribed(true);
        toast({
          title: "Subscription Successful",
          description: "Thank you for subscribing to our newsletter!",
        });
      }
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isSubscribed) {
    return (
      <div className="p-4 bg-green-50 text-green-800 rounded-md flex items-center gap-2">
        <CheckCircle size={18} className="text-green-600" />
        <p>Thank you for subscribing! You'll receive updates soon.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      placeholder="Your email address"
                      {...field}
                      className="pl-9"
                    />
                  </div>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SubscriptionForm;
