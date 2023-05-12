export type AuthorizationData = {
  login: string;
  password: string;
  client_id: string;
  client_secret: string;
  hr: string;
};

export type Token = {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
};

export type Branch = {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: [
    {
      title_rus: string;
      url_rus: string;
      title: string;
      id_parent: number;
      key: number;
    }
  ];
};

export type Vacancy = {
  profession: string;
  firm_name: string;
  town: { id: number; title: string };
  type_of_work: { id: number; title: string };
  payment_to: number;
  payment_from: number;
  currency: string;
};

export type FilterInputValues = {
  title_rus: string;
  payment_from: string;
  payment_to: string;
};

export type InitialInputValues = {
  payment_from: string;
  payment_to: string;
};
