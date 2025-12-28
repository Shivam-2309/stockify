import TradingViewWidget from '@/components/TradingViewWidget'
import { HEATMAP_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG, MARKET_OVERVIEW_WIDGET_CONFIG } from '@/lib/constants'

const Home = () => {
  const scriptURL = "https://s3.tradingview.com/external-embedding/";
  return (
    <div className='flex min-h-screen home-wrapper'>
      <div className='w-full max-w-7xl mx-auto p-6'>
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          <div className='xl:col-span-1'>
            <TradingViewWidget 
              title="Market Overview"
              scriptUrl={`${scriptURL}embed-widget-market-overview.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              className="custom-chart"
              height={500}
            />
          </div>
          <div className='xl:col-span-2'>
            <TradingViewWidget 
              title="Stock Heatmap"
              scriptUrl={`${scriptURL}embed-widget-stock-heatmap.js`}
              config={HEATMAP_WIDGET_CONFIG}
              height={500}
            />
          </div>
        </section> 

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className='xl:col-span-1'>
            <TradingViewWidget 
              scriptUrl={`${scriptURL}embed-widget-timeline.js`}
              config={TOP_STORIES_WIDGET_CONFIG}
              className="custom-chart"
              height={500}
            />
          </div>
          <div className='xl:col-span-2'>
            <TradingViewWidget 
              title="Market Overview"
              scriptUrl={`${scriptURL}embed-widget-market-quotes.js`}
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              height={500}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
