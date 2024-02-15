import { Prisma } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";

/**
 * Gets user profile information from the auth API and returns formatted user data.
 * Makes a GET request to the /api/auth/me endpoint to get the user's profile.
 * Maps over the profile records to extract specific fields into a formatted object.
 * Returns object with nickname, email, name, picture, and other profile fields.
 */
export const getUserInfo = async () => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const user: Array<Record<string, string | string[]>> = data?.profile;
  const nickname = user
    ?.map((p) => p.nickname)
    .filter((p) => p !== undefined)[0];
  const email = user?.map((p) => p.email).filter((p) => p !== undefined)[0];
  const givenName = user
    ?.map((p) => p.givenName)
    .filter((p) => p !== undefined)[0];
  const picture = user?.map((p) => p.picture).filter((p) => p !== undefined)[0];
  const gender = user?.map((p) => p.gender).filter((p) => p !== undefined)[0];
  const country = user?.map((p) => p.country).filter((p) => p !== undefined)[0];
  const familyName = user
    ?.map((p) => p.familyName)
    .filter((p) => p !== undefined)[0];
  const phone = user
    ?.map((p) => p.phoneNumber)
    .filter((p) => p !== undefined)[0];
  const address = user
    ?.map((p) => p.streetAddress)
    .filter((p) => p !== undefined)[0];
  const postalCode = user
    ?.map((p) => p.postalCode)
    .filter((p) => p !== undefined)[0];
  const city = user?.map((p) => p.locality).filter((p) => p !== undefined)[0];

  return {
    nickname,
    email,
    givenName,
    picture,
    country,
    gender,
    familyName,
    phone,
    address,
    postalCode,
    city,
  };
};

/**
 * Sends an email via the API.
 *
 * @param message - The message text to send in the email.
 * @param email - The recipient email address.
 *
 * @returns The API response.
 */
export const sendEmail = async ({ message, email }: Record<string, string>) => {
  const response = await fetch(
    `https://mrlectus-stackup-6cd355c4b177.herokuapp.com/send`,
    {
      method: "POST",
      body: JSON.stringify({ message, email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

/**
 * Fetches country currency information from OpenCage Geocoding API.
 *
 * @param country - The country name to lookup currency info for
 * @returns The ISO code and symbol for the given country's currency
 * @throws Error on failed API response
 */
export const getCountryInfo = async (country: string) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${country}&limit=1&address_only=1&key=${process.env.NEXT_PUBLIC_GEO_SECRET}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const currency = data.results[0].annotations.currency;
    return {
      iso_code: currency.iso_code,
      symbol: currency.symbol,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Gets currency information from external API
 */

export const getCurrency = async (symbol: string) => {
  const response = await fetch(
    `https://mrlectus-stackup-6cd355c4b177.herokuapp.com/exchange`
  );
  const data = await response.json();
  return data.rates[symbol] as number;
};

export type TJobs = Prisma.JobGetPayload<{}>;
export const getAllJobs = async ({
  pageParam,
  limit,
  country,
}: {
  pageParam: number;
  limit: number;
  country: string;
}) => {
  const response = await fetch(
    `/api/jobs?page=${pageParam}&limit=${limit}&country=${country}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data as TJobs[];
};

export const addToBookmark = async ({
  id,
  email,
}: {
  id: number;
  email: string;
}) => {
  const response = await fetch(`/api/jobs/bookmark/${id}`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const deleteBookmark = async ({
  id,
  email,
}: {
  id: number;
  email: string;
}) => {
  try {
    const response = await fetch(`/api/jobs/bookmark/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
