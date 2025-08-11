import type { Plan } from "../types";
import { Card } from "./ui/card";
import { Button } from "./ui";
import { useRouter } from "@tanstack/react-router";
import { useCheckoutContext } from "../context";

export interface PlanCardProps {
  plan: Plan;
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const router = useRouter();
  const { setCurrentPlan } = useCheckoutContext();
  const handleChoosePlan = (plan: Plan) => {
    setCurrentPlan(plan);
    router.navigate({
      to: "/checkout",
    });
  };

  return (
    <Card>
      {/* Popular badge for middle plan */}
      {plan.mostPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Card Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
              {plan.price_text}
            </p>
            <p className="text-sm text-slate-500 capitalize">
              Billed {plan.interval === "month" ? "monthly" : "annually"}
            </p>
          </div>

          {/* Trial Period */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-slate-700">
              🎉 {plan.price_text_trial}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 text-left mb-8">
            <div className="flex items-center text-sm text-slate-600">
              <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              Full platform access
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              Priority support
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              Automatic updates
            </div>
            {plan.name === "Enterprise" && (
              <div className="flex items-center text-sm text-slate-600">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                24/7 dedicated support
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleChoosePlan(plan)}
        >
          Start trial
        </Button>
      </div>
    </Card>
  );
};
