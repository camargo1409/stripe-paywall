import { Injectable } from '@nestjs/common';
import { StripeService } from '../infra/stripe.service';

export interface CreatePaymentIntentRequest {
  email: string;
  name: string;
}

@Injectable()
export class CreatePaymentIntentUseCase {
  constructor(private readonly stripeGateway: StripeService) {}

  async execute(request: CreatePaymentIntentRequest) {
    const customer = await this.stripeGateway.createCustomer({
      email: request.email,
      name: request.name,
    });

    const setupIntent = await this.stripeGateway.createSetupIntent(
      customer.id,
    );

    return {
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
    };
  }
}
