import { Injectable } from '@nestjs/common';
import { StripeService } from '../infra/stripe.service';

interface CreateSubscriptionScheduleUseCaseParams {
  customer_id: string;
  price_id: string;
  trial_price_id: string;
  payment_method_id: string;
}

@Injectable()
export class CreateSubscriptionScheduleUseCase {
  constructor(private readonly stripeService: StripeService) {}

  async execute({
    customer_id,
    price_id,
    trial_price_id,
    payment_method_id,
  }: CreateSubscriptionScheduleUseCaseParams) {
    await this.stripeService.attachPaymentMethodToCustomer(
      customer_id,
      payment_method_id,
    );

    const subscriptionSchedule =
      await this.stripeService.createSubscriptionSchedule({
        customer_id,
        price_id,
        trial_price_id,
      });

    return {
      subscription: subscriptionSchedule.subscription,
    };
  }
}
