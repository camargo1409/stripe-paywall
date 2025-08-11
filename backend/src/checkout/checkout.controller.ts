import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { CreatePaymentIntentUseCase } from './use-case/create-payment-intent.use-case';
import { CreateSubscriptionScheduleUseCase } from './use-case/create-subscription-schedule.use-case';
import plans from './plans.json';


@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly createPaymentIntentUseCase: CreatePaymentIntentUseCase,
    private readonly createSubscriptionScheduleUseCase: CreateSubscriptionScheduleUseCase,
  ) {}

  @Post('payment-intent')
  async createPaymentIntent(@Body() body) {
    return await this.createPaymentIntentUseCase.execute({
      email: body.email,
      name: body.name,
    });
  }

  @Post('create-subscription-schedule')
  async createSubscriptionSchedule(@Body() body) {
    return await this.createSubscriptionScheduleUseCase.execute({
      customer_id: body.customer_id,
      price_id: body.price_id,
      trial_price_id: body.trial_price_id,
      payment_method_id: body.payment_method_id,
    });
  }

  @Get('plans')
  async getPlans() {
    return plans;
  }
}
