"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StockCard } from "@/components/StockCard";

const WatchListPage = (props : FinnhubSearchResult[]) => {
  const [items, setItems] = useState<WatchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [stockName, setStockName] = useState("");

  // uss bde ka sb kuch laane ke liye
    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/watchlist");

            if(res.ok){
                const data = await res.json();
                setItems(data);
            }
        };
        load();
    }, []);

  const handleAdd = async () => {
    const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify( {stockName} ),
    });

    if(res.ok){
        const newItem = await res.json();
        setItems(prev => [newItem, ...prev]);
        setStockName("");
        setOpen(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>

      <Button 
        onClick={() => setOpen(!open)}
        className="mb-6"
      >
        {open ? "Tap to close" : "Add Stock"}
      </Button>


    {open && (
    <div className="mb-6 max-w-md rounded-xl border border-gray-200 bg-blue-950 p-4 shadow-lg">
        <input
        value={stockName}
        onChange={e => setStockName(e.target.value)}
        placeholder="Enter stock name"
        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            className="px-4 m-2"
        >
            Cancel
        </Button>
        <Button
            size="sm"
            onClick={handleAdd}
            className="px-4 m-2"
        >
            Add
        </Button>
    </div>
    )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item._id} className="relative">
          <StockCard stockName={item.stockName} />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={async () => {
              const res = await fetch(`/api/watchlist/${item._id}`, {
                method: "DELETE",
              });

              if (res.ok) {
                setItems(prev => prev.filter(i => i._id !== item._id));
              } else {
                const data = await res.json();
                alert(data.error || "Failed to delete");
              }
            }}
          >
            Delete
          </Button>
        </div>
      ))}
      </div>
    </div>
  )
}

export default WatchListPage