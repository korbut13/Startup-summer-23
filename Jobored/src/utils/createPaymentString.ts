export function createPaymentString(paymentFrom: number, paymentTo: number, currency: string) {
  switch (paymentFrom + paymentTo) {
    case 0:
      return 'з/п не указана';
    case paymentFrom:
      return `з/п от ${paymentFrom} ${currency}`;
    case paymentTo:
      return `з/п до ${paymentTo} ${currency}`;
    case paymentTo + paymentFrom:
      return `з/п от ${paymentFrom} - ${paymentTo} ${currency}`;
    default:
      return 'з/п не указана';
  }
}
