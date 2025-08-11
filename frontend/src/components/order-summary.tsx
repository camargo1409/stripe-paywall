import { useCheckoutContext } from "../context";
import { Card } from "./ui/card";

export const OrderSummary = () => {
  const { currentPlan } = useCheckoutContext();
  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">{currentPlan?.name}</p>
            <p className="text-sm text-gray-600">Qty: 1</p>
          </div>
          <p className="font-medium text-gray-900">
            {currentPlan?.price_text}
          </p>
        </div>
        <p className="text-sm text-gray-600">
          {currentPlan?.price_text_trial}
        </p>
      </div>

    </Card>
  );
};
