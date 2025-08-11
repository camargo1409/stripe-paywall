import type { CheckoutContextValue } from "@stripe/react-stripe-js";

export const checkoutEmailValidate = async (
  email: string,
  checkout: CheckoutContextValue
) => {
  const updateResult = await checkout.updateEmail(email);
  const isValid = updateResult.type !== "error";

  return { isValid, message: !isValid ? updateResult.error.message : null };
};
