import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { StripeService } from './infra/stripe.service';
import { CreatePaymentIntentUseCase } from './use-case/create-payment-intent.use-case';
import { CreateSubscriptionScheduleUseCase } from './use-case/create-subscription-schedule.use-case';

@Module({
  controllers: [CheckoutController],
  providers: [
    CreatePaymentIntentUseCase,
    CreateSubscriptionScheduleUseCase,
    StripeService,
  ],
})
export class CheckoutModule {} 