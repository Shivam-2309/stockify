"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Search } from "lucide-react";

type FinnhubSearchResult = {
  description: string; 
  displaySymbol: string; 
  symbol: string; 
  type: string; 
};

export default function SearchStockPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FinnhubSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a stock name or symbol.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
      const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(
        trimmed
      )}&token=${apiKey}`;

      const res = await fetch(url);
      console.log("Res: ", res);

      if (!res.ok) {
        throw new Error("Failed to fetch data from Finnhub");
      }
      setFetched(true);
      const data = await res.json();
      setResults(data.result || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleAddToWatchlist = async (stock: FinnhubSearchResult) => {
    const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        // object literal ke andr sirf key value pair hi aa skti h.
        body: JSON.stringify({ stockName : stock.description }),
    });

    console.log("Result: ", res);

    if(!res.ok){
      alert("Unable to put it in your watchlist");   
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Search Stocks</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Search for stocks by symbol or company name. 
      </p>

      <div className="mb-6 flex gap-2">
        <div className="flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. AAPL, INFY, Tesla"
          />
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? (
            "Searching..."
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {results.length === 0 && !loading && !error && (
        <p className="text-sm text-muted-foreground">
          No results yet. Try searching for a stock symbol or name.
        </p>
      )}

      <div className="space-y-3">
        {results.map((stock) => (
          <Card key={stock.symbol} className="border border-gray-200 shadow-sm h-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">
                  {stock.displaySymbol || stock.symbol}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {stock.description || "No description available"}
                </CardDescription>
              </div>
              {stock.type && (
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                  {stock.type}
                </span>
              )}
            </CardHeader>

            <CardContent>
              <p className="text-xs text-muted-foreground">
                Symbol: <span className="font-medium">{stock.symbol}</span>
              </p>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                size="sm"
                onClick={() => handleAddToWatchlist(stock)}
              >
                Add to watchlist
              </Button>
            </CardFooter>
          </Card>
        ))}
        {fetched && <Button onClick={() => {
            setResults([]);
            setFetched(false);
        }}>Close</Button>}
      </div>
    </div>
  );
}
