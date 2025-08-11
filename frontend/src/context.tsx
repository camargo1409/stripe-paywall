import { createContext, useContext, useState } from "react";
import type { Plan } from "./types";


interface CheckoutContextType {
  currentPlan: Plan | null;
  setCurrentPlan: (plan: Plan) => void;
  customerId: string | null;
  setCustomerId: (customerId: string) => void;
  clientSecret: string | null;
  setClientSecret: (clientSecret: string) => void;
  reset: () => void;
  subscriptionId: string | null;
  setSubscriptionId: (subscriptionId: string) => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
  currentPlan: null,
  setCurrentPlan: () => {},
  customerId: null,
  setCustomerId: () => {},
  clientSecret: null,
  setClientSecret: () => {},
  reset: () => {},
  subscriptionId: null,
  setSubscriptionId: () => {},
});
export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  const reset = () => {
    setCurrentPlan(null);
    setCustomerId(null);
    setClientSecret(null);
    setSubscriptionId(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        currentPlan,
        setCurrentPlan,
        customerId,
        setCustomerId,
        clientSecret,
        setClientSecret,
        reset,
        subscriptionId,
        setSubscriptionId,
      }}
    >
      {children}

    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => useContext(CheckoutContext);
