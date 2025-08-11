import { createFileRoute } from "@tanstack/react-router";
import { CheckoutForm } from "../components/checkout-form";

export const Route = createFileRoute("/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your purchase with Stripe
          </p>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
}
