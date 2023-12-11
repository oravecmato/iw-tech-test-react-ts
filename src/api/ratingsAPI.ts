import {ILocalAuthority} from "../types/ratings";

export interface IRatingsApiResponse {
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: [
    {
      rel: string;
      href: string;
    }
  ];
}

export interface IEstablishments extends IRatingsApiResponse {
  establishments: {}[];
}

export interface ILocalAuthorities extends IRatingsApiResponse {
  authorities: ILocalAuthority[];
}

export function getEstablishmentRatings(
    localAuthorityId: number
): Promise<IEstablishments> {
  return fetch(
    `https://api.ratings.food.gov.uk/Establishments?localAuthorityId=${localAuthorityId}&pageSize=10000`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getLocalAuthorities(): Promise<ILocalAuthorities> {
  return fetch(
      `https://api.ratings.food.gov.uk/Authorities/basic`,
      { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}
