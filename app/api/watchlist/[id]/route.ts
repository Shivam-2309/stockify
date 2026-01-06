import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/Watchlist";
import { auth } from "@/lib/better-auth/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  // 1. Check if user is logged in
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    // 2. Find and delete the watchlist item by _id and userId
    const deletedItem = await Watchlist.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    if (deletedItem.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "Stock removed from watchlist", deletedItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete watchlist item error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
