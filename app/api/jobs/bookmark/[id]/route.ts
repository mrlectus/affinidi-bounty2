import prisma from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles POST request to bookmark a job by id.
 * Looks up the job by id and connects it to the user's bookmarks if found.
 * Returns the bookmarked job or an error message.
 */
export const POST = async (request: NextRequest) => {
  const { pathname } = new URL(request.url);
  const { email } = await request.json();
  const id = Number(pathname.split("/").pop());
  const bookmark = await prisma.job.findUnique({
    where: {
      id,
    },
  });
  if (bookmark) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        bookmarks: {
          connect: {
            id,
          },
        },
      },
    });
    return NextResponse.json(bookmark);
  } else {
    return NextResponse.json({ message: "Cannot save to bookmark" });
  }
};

/**
 * Handles DELETE request to remove a bookmarked job by id.
 * Looks up the job by id and disconnects it from the user's bookmarks if found.
 * Returns a success/error message.
 */
export const DELETE = async (request: NextRequest) => {
  const { pathname } = new URL(request.url);
  const { email } = await request.json();
  const id = Number(pathname.split("/").pop());
  const bookmark = await prisma.job.findUnique({
    where: {
      id,
    },
  });
  if (bookmark) {
    const done = await prisma.user.update({
      where: {
        email,
      },
      data: {
        bookmarks: {
          disconnect: {
            id,
          },
        },
      },
    });
    if (done) {
      return NextResponse.json(
        { message: "bookmark has been removed!" },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        { message: "bookmark cannot be removed!" },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Cannot find bookmark" },
      {
        status: 500,
      }
    );
  }
};
