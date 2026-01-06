import { Schema, model, models } from "mongoose";

const watchlistSchema = new Schema(
  {
    userId: {
      type: String, 
      required: true,
      index: true,
    },
    stockName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// resolving the hot reloading issue
// Jb bhi hmara code change hota h to hr module firse re-execute hota h
// agr hr br yeh model call kroge to yeh mongoose kahega ki bhai mne yhi model phle bhi register mn daal rkha h
// isliye koi need nhi h dobara create krne ke liye model ko
// isliye phle vo check krega ki kya already yeh model present h ? 
// agr present h ->to vhi use karo vrna mongoose bhai naya model bnao

// model bnake MongoDB mn bolo ki bhai aisa data aaega
export const Watchlist = models.Watchlist || model("Watchlist", watchlistSchema);
