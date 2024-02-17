import { getUserProfile } from "@/utils/utils";
import prisma from "../db/prisma";
import { Bookmark } from "@/components/bookmark";
import { Suspense } from "react";

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
