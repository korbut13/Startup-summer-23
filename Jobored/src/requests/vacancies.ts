import { url } from "../url";
import { authorizationData } from "../authorisation";
import { token } from "./token";
import { Vacancy } from "../types";

export async function getVacancies() {
  return await fetch(`${url}/2.0/vacancies/`, {
    method: "GET",
    headers: {
      "x-secret-key": "GEU4nvd3rej*jeh.eqp",
      "X-Api-App-Id": `${authorizationData.client_secret}`,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }).then((response) => response.json()).then((response: { objects: Vacancy[] }) => response.objects)
}

export const vacancies = await getVacancies();
