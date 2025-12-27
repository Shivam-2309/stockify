"use client"
import React, { useEffect, useRef, memo } from 'react';
import { MARKET_OVERVIEW_WIDGET_CONFIG } from "@/lib/constants"
import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { cn } from "@/lib/utils"

interface TradingViewWidgetProps {
    title?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}

const TradingViewWidget = ( {title, scriptUrl, config, height = 600, className} : TradingViewWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);
  return (
    <div className='w-full'>
        {title && <h3 className='font semi-bold text-2xl text-gray-100 mt-3 mb-1.5'>{ title }</h3>}
        <div className={cn("tradingview-widget-container", className)} ref={containerRef}>
            <div className="tradingview-widget-container__widget" style={{height, width: "100%"}} />
        </div>
    </div>
  );
}

export default memo(TradingViewWidget);
