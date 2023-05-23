export type AuthorizationData = {
  client_id: string;
  client_secret: string;
  hr: string;
};

export type RefreshAuthorisationData = {
  refresh_token: string;
  client_id: string;
  client_secret: string;
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
  title_trimmed: string;
  key: number;
};

export type BranchParams = {
  label: string;
  value: string;
  catalogues: number;
};

export type Vacancy = {
  id: number;
  profession: string;
  firm_name: string;
  town: { id: number; title: string };
  type_of_work: { id: number; title: string };
  payment_to: number;
  payment_from: number;
  currency: string;
  vacancyRichText: string;
};

export type FilterInputValues = {
  title_rus: string;
  payment_from: string;
  payment_to: string;
};

export type InitialDataFilters = {
  published: string;
  keyword: string;
  payment_from: string;
  payment_to: string;
  catalogues: string;
};

export type InitialInputValues = {
  keyword: string;
  payment_from: string;
  payment_to: string;
  catalogues: string;
};
