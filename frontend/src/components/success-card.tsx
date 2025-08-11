import { Card } from "./ui/card";
import { useCheckoutContext } from "../context";
import { Button } from "./ui";
import { useRouter } from "@tanstack/react-router";

export const SuccessCard = () => {
  const { subscriptionId, reset } = useCheckoutContext();
  const router = useRouter();

  const handleBackToPlans = () => {
    reset();
    router.navigate({ to: "/" });
  };

  return (
    <Card>
      <div className="flex flex-col gap-2">
        <h2>You’re subscribed!</h2>
        <p>Subscription ID: {subscriptionId}</p>
        <Button onClick={handleBackToPlans}>
          Back to plans
        </Button>
      </div>
    </Card>
  );
};
