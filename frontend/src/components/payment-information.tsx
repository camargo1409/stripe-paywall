import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Card } from "./ui/card";
import { Button } from "./ui";
import { useRouter } from "@tanstack/react-router";
import { useCheckoutContext } from "../context";
import api from "../api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import type { CreateSubscriptionScheduleResponse } from "../types";

export const PaymentInformation = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { reset, customerId, currentPlan, setSubscriptionId } =
    useCheckoutContext();
  const methods = useForm();

  const onSubmit = async () => {
    const res = await stripe?.confirmSetup({
      elements: elements!,
      redirect: "if_required",
    });

    if (res?.error) {
      toast.error("Error creating subscription ");
      return;
    }

    try {
      const subscriptionSchedule =
        await api.post<CreateSubscriptionScheduleResponse>(
          "/checkout/create-subscription-schedule",
          {
            customer_id: customerId,
            price_id: currentPlan?.price_id,
            trial_price_id: currentPlan?.trial_price_id,
            payment_method_id: res?.setupIntent?.payment_method,
          }
        );

      const subscriptionScheduleRes = subscriptionSchedule.data;
      setSubscriptionId(subscriptionScheduleRes.subscription);
      toast.success("Subscription created successfully");
    } catch (error) {
      toast.error("Error creating subscription");
    }
  };

  const handleCancel = () => {
    reset();
    router.navigate({
      to: "/",
    });
  };

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Payment Information
        </h2>
      </div>

      <div className="mb-6">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <PaymentElement />

          <div className="flex gap-2 mt-8">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={methods.formState.isSubmitting}
            >
              Pay
            </Button>
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
