import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/Watchlist";
import { auth } from "@/lib/better-auth/auth"

export async function GET(req: NextRequest) {
    await connectToDatabase();

    const session = await auth.api.getSession({ headers: req.headers });

    if(!session || !session.user) {
        return NextResponse.json({error: "UnAuthorized User", status: "401"});
    }

    const userId = session.user.id;
    const stocks = await Watchlist.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(stocks);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const { stockName } = await req.json();
  if (!stockName || !stockName.trim()) {
    return NextResponse.json({ error: "Stock name required" }, { status: 400 });
  }

  const doc = await Watchlist.create({
    userId,
    stockName: stockName.trim(),
  });

  return NextResponse.json(doc, { status: 201 });
}
