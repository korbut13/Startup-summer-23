export function createPaymentString(paymentFrom: number, paymentTo: number, currency: string) {
  switch (paymentFrom + paymentTo) {
    case 0:
      return 'з/п не указана';
      break;
    case paymentFrom:
      return `з/п от ${paymentFrom} ${currency}`;
      break;
    case paymentTo:
      return `з/п до ${paymentTo} ${currency}`;
      break;
    case paymentTo + paymentFrom:
      return `з/п от ${paymentFrom} - ${paymentTo} ${currency}`;
      break;
    default:
      return 'з/п не указана';
  }
}
