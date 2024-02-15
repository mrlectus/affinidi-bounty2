import prisma from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

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
