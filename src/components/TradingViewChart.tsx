// components/TradingViewChart.tsx

import { useEffect } from 'react';
import { BinanceDataFeed } from '../utils/BianceDatafeed';


interface TradingViewChartProps {
  symbol: string;
  interval?: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol = 'WETHUSDC', interval = 'D' }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol || "WETHUSDC",
          interval: interval,
          container_id: "tradingview_chart",
          theme: 'dark',
          datafeed: new BinanceDataFeed(),
          library_path: "/charting_library/",
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          withdateranges: true,
          // allow_symbol_change: true,
          hide_side_toolbar: true,
          details: true,
          studies: [],
        });
      };

      document.body.appendChild(script);

      // 清理函数
      return () => {
        // 在组件卸载时移除脚本
        // document.body.removeChild(script);
        script.remove();
      };
    }
  }, [symbol, interval]);

  return <div id="tradingview_chart" style={{ height: '100%', width: '100%' }}></div>;
};

export default TradingViewChart;
