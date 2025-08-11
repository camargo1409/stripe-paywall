import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "./ui";
import { Card } from "./ui/card";
import { useCheckoutContext } from "../context";
import api from "../api";
import { useRouter } from "@tanstack/react-router";

export const CustomerInformation = () => {
  const methods = useForm();
  const { setClientSecret, setCustomerId } = useCheckoutContext();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const { data: result } = await api.post("/checkout/payment-intent", {
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
    });

    setClientSecret(result.clientSecret);
    setCustomerId(result.customerId);
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold text-gray-900">
            Customer Information
          </h2>
          <div className="flex flex-col gap-2">
            <Input
              label="First Name"
              type="text"
              placeholder="John"
              name="firstName"
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Doe"
              name="lastName"
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              name="email"
              required
            />

            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={methods.formState.isSubmitting}
              >
                Next
              </Button>

              <Button
                variant="outline"
                fullWidth
                onClick={() => router.navigate({ to: "/" })}
              >
                Back to plans
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};
