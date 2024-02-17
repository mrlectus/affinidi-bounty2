import { NextResponse } from "next/server";

/**
 * Handles POST requests to apply for a job.
 *
 * @returns JSON response indicating job application success
 */
export const POST = () => {
  return NextResponse.json({ message: "Job application success!!" });
};
