import { enableFetchMocks } from "jest-fetch-mock";
import {getEstablishmentRatings, getLocalAuthorities} from "./ratingsAPI";
import fetch from "jest-fetch-mock";

enableFetchMocks();

describe("Ratings API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the local authorities api and returns the data", async () => {
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getLocalAuthorities();

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
        'https://api.ratings.food.gov.uk/Authorities/basic'
    );
  });

  it("call the ratings api with the provided local authority id and returns the data", async () => {
    // Given
    let localAuthorityId = 1;
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getEstablishmentRatings(localAuthorityId);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
        `https://api.ratings.food.gov.uk/Establishments?localAuthorityId=${localAuthorityId}&pageSize=10000`
    );
  });
});
