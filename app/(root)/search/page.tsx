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
import { Search, Loader2, Info, Plus } from "lucide-react";

type FinnhubSearchResult = {
  description: string; 
  displaySymbol: string; 
  symbol: string; 
  type: string; 
};

type StockInfo = {
  data?: any;
  error?: string;
  loading?: boolean;
};

export default function SearchStockPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FinnhubSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  
  // Per-stock info state
  const [stockInfos, setStockInfos] = useState<Record<string, StockInfo>>({});

  const getInfo = async (stock: FinnhubSearchResult): Promise<void> => {
    const symbol = stock.symbol;
    
    // Set loading state for this specific stock
    setStockInfos(prev => ({
      ...prev,
      [symbol]: { loading: true }
    }));

    try {
      const res = await fetch("/api/getinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          stockName: symbol,
          description: stock.description 
        }),
      });

      if (res.ok) {
        const data = await res.json(); 
        setStockInfos(prev => ({
          ...prev,
          [symbol]: { data: data.aiAnalysis }
        }));
      } else {
        throw new Error(`HTTP error! status: ${res.status}`); 
      }
    } catch (error) {
      console.error("GetInfo error:", error);
      setStockInfos(prev => ({
        ...prev,
        [symbol]: { error: "Failed to fetch info" }
      }));
    }
  };

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockName: stock.description }),
    });

    if(!res.ok){
      alert("Unable to put it in your watchlist");   
    } else {
      alert("Added to Watchlist");
    }
  };

  const clearSearch = () => {
    setResults([]);
    setFetched(false);
    setQuery("");
    setError(null);
    setStockInfos({});
  };

  const getStockInfo = (symbol: string) => {
    return stockInfos[symbol];
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
            disabled={loading}
          />
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
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

      {results.length === 0 && !loading && !error && fetched && (
        <p className="text-sm text-muted-foreground">
          No results found. Try different keywords.
        </p>
      )}

      {results.length > 0 && (
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearSearch}
            className="mb-4"
          >
            Clear Results
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {results.map((stock) => {
          const stockInfo = getStockInfo(stock.symbol);
          return (
            <Card key={stock.symbol} className="border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg leading-tight">
                    {stock.displaySymbol || stock.symbol}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground max-w-md">
                    {stock.description || "No description available"}
                  </CardDescription>
                </div>
                {stock.type && (
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    {stock.type}
                  </span>
                )}
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span>Symbol:</span>
                  <span className="font-mono font-medium bg-slate-100 px-2 py-1 rounded text-sm">
                    {stock.symbol}
                  </span>
                </div>

                {stockInfo?.loading ? (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground py-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading stock information...</span>
                  </div>
                ) : stockInfo?.error ? (
                  <div className="text-sm text-destructive py-3 px-3 bg-destructive/10 rounded-md border border-destructive/20">
                    {stockInfo.error}
                  </div>
                ) : stockInfo?.data ? (
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border max-h-64 overflow-hidden">
                    <div className="text-xs font-medium text-blue-800 mb-3 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Stock Analysis
                    </div>
                    <div className="text-m leading-4 text-gray-800 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {typeof stockInfo.data === 'object' 
                        ? JSON.stringify(stockInfo.data, null, 2)
                            .split('\n')
                            .map((line, idx) => (
                              <span key={idx} className="block font-mono whitespace-pre">
                                {line}
                              </span>
                            ))
                        : stockInfo.data
                      }
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start h-10 text-muted-foreground hover:text-foreground"
                    onClick={() => getInfo(stock)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Get Stock Information
                  </Button>
                )}
              </CardContent>

              <CardFooter className="pt-0 border-t border-gray-100">
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToWatchlist(stock)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Watchlist
                  </Button>
                  {stockInfo?.data && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setStockInfos(prev => {
                          const newInfos = { ...prev };
                          delete newInfos[stock.symbol];
                          return newInfos;
                        });
                      }}
                      className="h-10 px-3"
                    >
                      Clear Info
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
