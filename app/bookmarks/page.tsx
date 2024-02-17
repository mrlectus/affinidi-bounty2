import { getUserProfile } from "@/utils/utils";
import prisma from "../db/prisma";
import { Bookmark } from "@/components/bookmark";
import { Suspense } from "react";
/**
 * Fetches the user profile from the database.
 *
 * Uses Prisma to query the database for the user with the given id.
 * Returns a promise that resolves to the user profile object.
 */

const getBookmark = async () => {
  const { email } = await getUserProfile();
  const bookmark = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
    select: {
      bookmarks: true,
    },
  });
  return bookmark?.bookmarks;
};

/**
 * Fetches the user's bookmarks from the database and returns them.
 *
 * Uses getUserProfile() to get the user's email, then queries the database using Prisma
 * to get the bookmarks for that user.
 *
 * Returns the user's bookmarks if they exist, otherwise returns null or empty array.
 * Renders the bookmarks or a default "No bookmarks" message.
 */
const Bookmarks = async () => {
  const bookmarks = await getBookmark();
  if (bookmarks === null || bookmarks?.length === 0)
    return (
      <div className="flex justify-center text-xl p-4">
        No bookmarks | Nextjs Cache problem 🤡
      </div>
    );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex p-5 gap-3 flex-col">
        {bookmarks?.map((bookmark: any) => {
          return <Bookmark key={bookmark.id} {...bookmark} />;
        })}
      </div>
    </Suspense>
  );
};

export default Bookmarks;
