export type AuthorizationData = {
  login: string;
  password: string;
  client_id: string;
  client_secret: string;
  hr: string
};
export type Token = {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string
}
export type CatalogBranches = {
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
    },
  ]
}
