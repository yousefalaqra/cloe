export class SubscriptionResource {
  id: number;
  period: 24 | 168 | 730 | 8760;
  cost: number;
  disabled: boolean;
}
