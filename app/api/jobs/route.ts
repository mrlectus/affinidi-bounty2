import prisma from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

/**
 * Handles GET request to fetch jobs.
 *
 * Accepts the following query parameters:
 * - country: Filter jobs by country, case insensitive.
 * - page: The page number of results to return.
 * - limit: The number of results per page.
 *
 * Returns a JSON response with the fetched jobs.
 * Handles errors by returning 500 status.
 */
export const GET = async (req: NextRequest) => {
  const params = new URL(req.url);
  const country = params.searchParams.get("country") || undefined;
  const page = params.searchParams.get("page") || 0;
  const limit = params.searchParams.get("limit") || 20;
  try {
    const jobs = await prisma.job.findMany({
      where: {
        country: {
          equals: country,
          mode: "insensitive",
        },
      },
      take: Number(limit),
      skip: Number(page) * Number(limit),
    });
    return NextResponse.json(jobs);
  } catch (error) {
    await prisma.$disconnect();
    return NextResponse.json(
      { message: "cannot fetch jobs!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
