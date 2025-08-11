import { Outlet, createRootRoute } from "@tanstack/react-router";
import { CheckoutProvider } from "../context";
import { Toaster } from "react-hot-toast";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <CheckoutProvider>
      <Outlet />
      <Toaster position="top-right" toastOptions={{
        duration: 5000
      }}/>
    </CheckoutProvider>
  );
}
