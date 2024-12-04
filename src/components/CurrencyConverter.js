import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRightLeft, TrendingUp } from 'lucide-react';

const periods = {
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
};

const fromCurrencies = [
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
];

const toCurrencies = [
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
];

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("1000");
  const [period, setPeriod] = useState("1W");
  const [chartData, setChartData] = useState([]);
  const [rate, setRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForexData();
  }, [fromCurrency, toCurrency, period, amount]);

  const fetchForexData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://web-production-88ce.up.railway.app/api/forex-data', {
        from: fromCurrency,
        to: toCurrency,
        period: period,
        amount: parseFloat(amount)
      });

      if (response.data.success) {
        setChartData(response.data.data);
        setRate(response.data.current_rate);
        setConvertedAmount(response.data.converted_amount);
      } else {
        setError('Failed to fetch exchange rate data');
      }
    } catch (err) {
      console.error('Error fetching forex data:', err);
      setError(err.response?.data?.error || 'Failed to fetch exchange rate data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-indigo-900">Currency Converter</h1>
          <p className="text-xl text-indigo-700">
            Convert {fromCurrency} to {toCurrency} at today's live rates
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur shadow-xl rounded-lg">
          <div className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 items-end">
              <div className="form-group">
                <label className="text-sm font-medium text-indigo-900">From</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-grow text-lg border border-indigo-300 focus:border-indigo-500 rounded-md p-2"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="currency-select w-[140px] border-indigo-300 focus:border-indigo-500 rounded-md p-2"
                  >
                    {fromCurrencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRightLeft className="text-indigo-500 w-8 h-8" />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-indigo-900">To</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={convertedAmount.toFixed(2)}
                    readOnly
                    className="flex-grow text-lg border border-indigo-300 focus:border-indigo-500 rounded-md p-2"
                  />
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="currency-select w-[140px] border-indigo-300 focus:border-indigo-500 rounded-md p-2"
                  >
                    {toCurrencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="text-center text-lg font-medium text-indigo-900">
              1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </div>
          </div>
        </div>

        <div className="chart-container bg-white/90 backdrop-blur shadow-xl rounded-lg">
          <div className="p-6">
            <h2 className="flex items-center gap-2 text-2xl text-indigo-900 mb-4">
              <TrendingUp className="w-6 h-6" />
              {fromCurrency} to {toCurrency} Exchange Rate
            </h2>

            {error && (
              <div className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            <div className="period-buttons flex justify-center gap-2 mb-6">
              {Object.keys(periods).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    period === p
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-[300px] text-indigo-600">
                Loading chart data...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    minTickGap={50}
                    stroke="#4338ca"
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => value.toFixed(2)}
                    stroke="#4338ca"
                  />
                  <Tooltip
                    formatter={(value) => [value.toFixed(4), "Exchange Rate"]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #4338ca' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#4338ca"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
