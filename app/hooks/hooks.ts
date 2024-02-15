import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  addToBookmark,
  deleteBookmark,
  getAllJobs,
  getCountryInfo,
  getCurrency,
  getUserInfo,
  sendEmail,
} from "../service/api";
import toast from "react-hot-toast";
import { Record } from "@prisma/client/runtime/library";

/**
 * Fetches user info from the API.
 */

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });
};

/**
 * Fetches country info from the API.
 * @param country - The country code to fetch info for.
 */

export const useGetCountryInfo = (country: string) => {
  return useQuery({
    queryKey: ["country", country],
    queryFn: () => getCountryInfo(country),
    enabled: !!country,
  });
};

/**
 * Fetches currency information.
 */

export const useGetCurrency = (currency: string) => {
  return useQuery({
    queryKey: ["currency", currency],
    queryFn: () => getCurrency(currency),
    enabled: !!currency,
  });
};

/**
 * A React Hook that provides a mutation for sending an email.
 *
 * On mutate, it will:
 * - Send an email with the provided message and email address.
 *
 * On success, it will:
 * - Display a success toast notification with the response message.
 */

export const useSendEmail = () => {
  return useMutation({
    mutationKey: ["send-email"],
    mutationFn: ({ message, email }: Record<string, string>) =>
      sendEmail({ message, email }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.success("mail is on it's way");
    },
  });
};

export const useFetchPaginatedJobs = ({
  limit,
  country,
}: {
  limit: number;
  country: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: ({ pageParam }) =>
      getAllJobs({
        pageParam,
        limit,
        country,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length !== undefined) return pages.length + 1;
      return undefined;
    },
    enabled: !!country,
  });
};

export const useAddBookmark = () => {
  return useMutation({
    mutationKey: ["add-bookmark"],
    mutationFn: ({ id, email }: { id: number; email: string }) =>
      addToBookmark({ id, email }),
    onSuccess: () => {
      toast.success("Job added to bookmark");
    },
    onError: () => {
      toast.error("Error adding job to bookmark");
    },
  });
};

export const useDeleteBookmark = () => {
  return useMutation({
    mutationKey: ["deleted-bookmark"],
    mutationFn: ({ id, email }: { id: number; email: string }) =>
      deleteBookmark({ id, email }),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
