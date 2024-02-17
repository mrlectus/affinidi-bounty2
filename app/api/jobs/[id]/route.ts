import prisma from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler for retrieving a job by ID.
 *
 * Looks up a job by the provided ID.
 * Returns the job data if found, else returns 404.
 */
export const GET = async (
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (job) {
      return NextResponse.json(job);
    } else {
      return NextResponse.json({ message: "Job not found!" }, { status: 404 });
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
