import { Elements } from "@stripe/react-stripe-js";
import { CustomerInformation } from "./customer-information";
import { PaymentInformation } from "./payment-information";
import { loadStripe } from "@stripe/stripe-js";
import { useCheckoutContext } from "../context";
import { SuccessCard } from "./success-card";
import { OrderSummary } from "./order-summary";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export const CheckoutForm = () => {
  const { clientSecret, customerId, subscriptionId } = useCheckoutContext();

  if (subscriptionId) return <SuccessCard />;

  return (
    <div className="">
      <div className="flex gap-8 flex-wrap">
        <div className="flex-2">
          {clientSecret && customerId ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentInformation />
            </Elements>
          ) : (
            <CustomerInformation />
          )}
        </div>
        <div className="flex-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
