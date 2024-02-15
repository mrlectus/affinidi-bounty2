import { NextResponse } from "next/server";

export const GET = ({ params }: { params: any }) => {
  console.log(params);
  return NextResponse.json({ message: "Gppd!" });
};
