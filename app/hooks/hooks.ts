import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  addToBookmark,
  apply,
  deleteBookmark,
  getAllJobs,
  getCountryInfo,
  getCurrency,
  getJob,
  getUserInfo,
  sendEmail,
} from "../service/api";
import toast from "react-hot-toast";
import { Record } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";

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
    onError: (error) => {
      toast.success(error.message);
    },
  });
};

/**
 * Fetches paginated jobs data from the API for a given country.
 *
 * @param limit - The number of jobs to return per page.
 * @param country - The country code to fetch jobs for.
 *
 * Returns paginated jobs data using React Query's infinite query hooks.
 */
export const useFetchPaginatedJobs = ({
  limit,
  country,
}: {
  limit: number;
  country: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["jobs", country],
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

/**
 * Adds a job to the user's bookmarks.
 *
 * @param id - The ID of the job to add.
 * @param email - The user's email address.
 *
 * @returns A React Query mutation config object for adding a bookmark.
 */
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

/**
 * Deletes a job bookmark for the given user.
 *
 * @param id - The ID of the job bookmark to delete.
 * @param email - The email address of the user.
 *
 * @returns A React Query mutation config object for deleting a bookmark.
 */
export const useDeleteBookmark = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["deleted-bookmark"],
    mutationFn: ({ id, email }: { id: number; email: string }) =>
      deleteBookmark({ id, email }),
    onSuccess: (data) => {
      toast.success(data?.message);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

/**
 * Fetches a job by ID using React Query.
 *
 * @param id - The ID of the job to fetch.
 *
 * @returns A React Query query config object for fetching the job.
 */
export const useGetJob = (id: number) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
  });
};

/**
 * A React Query mutation hook for applying to a job.
 *
 * @returns A mutation config object for applying to a job.
 */
export const useApply = () => {
  return useMutation({
    mutationKey: ["apply"],
    mutationFn: apply,
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};
