export interface Plan {
  id: string;
  name: string;
  price_text: string;
  price_text_trial: string;
  trial_period_days: number;
  price_id: string;
  trial_price_id: string;
  interval: string;
  trial_interval: string;
  mostPopular?: boolean;
}

export interface CreateSubscriptionScheduleResponse {
  subscription: string;
}
