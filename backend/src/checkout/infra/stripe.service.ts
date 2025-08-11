import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

interface CreateSubscriptionScheduleParams {
  customer_id: string;
  price_id: string;
  trial_price_id: string;
}

interface CreateCustomerParams {
  email: string;
  name: string;
}

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('STRIPE_SECRET_KEY');
    if (!apiKey) {
      throw new Error(
        'STRIPE_SECRET_KEY is not defined in environment variables',
      );
    }

    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  async createSetupIntent(customerId: string) {
    return this.stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  async createCustomer({ email, name }: CreateCustomerParams) {
    const foundCustomer = await this.stripe.customers.list({
      email,
      limit: 1,
    });

    if (foundCustomer.data.length > 0) {
      return foundCustomer.data[0];
    }
    const createdCustomer = await this.stripe.customers.create({
      email,
      name,
    });

    return createdCustomer;
  }

  async createSubscriptionSchedule({
    customer_id,
    price_id,
    trial_price_id,
  }: CreateSubscriptionScheduleParams) {
    return this.stripe.subscriptionSchedules.create({
      customer: customer_id,
      start_date: 'now',
      phases: [
        {
          items: [{ price: trial_price_id, quantity: 1 }],
          iterations: 1, // dura 1 semana
        },
        {
          items: [{ price: price_id, quantity: 1 }],
        },
      ],
      default_settings: {
        collection_method: 'charge_automatically',
      },
    });
  }

  async attachPaymentMethodToCustomer(
    customerId: string,
    paymentMethodId: string,
  ) {
    await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    await this.stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  }
}
