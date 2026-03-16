'use client';

import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface PercentageCalculatorProps {
  dict: {
    label_is: string;
    label_of: string;
    label_what_is: string;
    label_percentage_of: string;
    label_what_percentage_is: string;
    label_percentage_change: string;
    label_to: string;
    label_result: string;
    label_increase: string;
    label_decrease: string;
    label_increased_by: string;
    label_decreased_by: string;
    label_rate_of_change: string;
    label_discount: string;
  }
}

const PercentageCalculator = ({ dict }: PercentageCalculatorProps) => {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<string>('');
  const [m1Y, setM1Y] = useState<string>('');
  const [m1Result, setM1Result] = useState<number | null>(null);

  // Mode 2: X is what percentage of Y?
  const [m2X, setM2X] = useState<string>('');
  const [m2Y, setM2Y] = useState<string>('');
  const [m2Result, setM2Result] = useState<number | null>(null);

  // Mode 3: X increased by Y%?
  const [m3X, setM3X] = useState<string>('');
  const [m3Percent, setM3Percent] = useState<string>('');
  const [m3Result, setM3Result] = useState<number | null>(null);

  // Mode 4: X decreased by Y%?
  const [m4X, setM4X] = useState<string>('');
  const [m4Percent, setM4Percent] = useState<string>('');
  const [m4Result, setM4Result] = useState<number | null>(null);

  // Mode 5: Percentage change from X to Y
  const [m5X, setM5X] = useState<string>('');
  const [m5Y, setM5Y] = useState<string>('');
  const [m5Result, setM5Result] = useState<{ value: number; type: 'increase' | 'decrease' | 'none' } | null>(null);

  useEffect(() => {
    const x = parseFloat(m1X);
    const y = parseFloat(m1Y);
    if (!isNaN(x) && !isNaN(y)) {
      setM1Result((x / 100) * y);
    } else {
      setM1Result(null);
    }
  }, [m1X, m1Y]);

  useEffect(() => {
    const x = parseFloat(m2X);
    const y = parseFloat(m2Y);
    if (!isNaN(x) && !isNaN(y) && y !== 0) {
      setM2Result((x / y) * 100);
    } else {
      setM2Result(null);
    }
  }, [m2X, m2Y]);

  // Mode 3: X increased by Y%
  useEffect(() => {
    const x = parseFloat(m3X);
    const percent = parseFloat(m3Percent);
    if (!isNaN(x) && !isNaN(percent)) {
      setM3Result(x + (x * percent / 100));
    } else {
      setM3Result(null);
    }
  }, [m3X, m3Percent]);

  // Mode 4: X decreased by Y%
  useEffect(() => {
    const x = parseFloat(m4X);
    const percent = parseFloat(m4Percent);
    if (!isNaN(x) && !isNaN(percent)) {
      setM4Result(x - (x * percent / 100));
    } else {
      setM4Result(null);
    }
  }, [m4X, m4Percent]);

  // Mode 5: Percentage change from X to Y
  useEffect(() => {
    const x = parseFloat(m5X);
    const y = parseFloat(m5Y);
    if (!isNaN(x) && !isNaN(y) && x !== 0) {
      const diff = y - x;
      const percentage = (diff / Math.abs(x)) * 100;
      setM5Result({
        value: Math.abs(percentage),
        type: percentage > 0 ? 'increase' : percentage < 0 ? 'decrease' : 'none'
      });
    } else {
      setM5Result(null);
    }
  }, [m5X, m5Y]);

  const formatNumber = (num: number) => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Mode 1: What is X% of Y? */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border dark:border-gray-800 shadow-sm p-6 md:p-8 transition-colors duration-300">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            {dict.label_what_is && dict.label_percentage_of ? `${dict.label_what_is.split('%')[0]?.trim()} % ${dict.label_of}` : 'Percentage of'}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300">
          <span>{dict.label_what_is}</span>
          <input
            type="number"
            value={m1X}
            onChange={(e) => setM1X(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="X"
          />
          <span>{dict.label_percentage_of}</span>
          <input
            type="number"
            value={m1Y}
            onChange={(e) => setM1Y(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="Y"
          />
          <span>?</span>
        </div>
        {m1Result !== null && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{dict.label_result}</span>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {formatNumber(m1Result)}
            </div>
          </div>
        )}
      </div>

      {/* Mode 2: X is what percentage of Y? */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border dark:border-gray-800 shadow-sm p-6 md:p-8 transition-colors duration-300">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            {dict.label_is && dict.label_of ? `${dict.label_is} % ${dict.label_of}` : 'Percentage of'}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300">
          <input
            type="number"
            value={m2X}
            onChange={(e) => setM2X(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="X"
          />
          <span>{dict.label_what_percentage_is}</span>
          <input
            type="number"
            value={m2Y}
            onChange={(e) => setM2Y(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="Y"
          />
          <span>?</span>
        </div>
        {m2Result !== null && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900/30">
            <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">{dict.label_result}</span>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {formatNumber(m2Result)}%
            </div>
          </div>
        )}
      </div>

      {/* Mode 3: X increased by Y%? */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border dark:border-gray-800 shadow-sm p-6 md:p-8 transition-colors duration-300">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            {dict.label_increased_by || 'Increased by %'}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300">
          <input
            type="number"
            value={m3X}
            onChange={(e) => setM3X(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="X"
          />
          <span>+ </span>
          <input
            type="number"
            value={m3Percent}
            onChange={(e) => setM3Percent(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="%"
          />
          <span>% = ?</span>
        </div>
        {m3Result !== null && (
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-900/30">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">{dict.label_result}</span>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {formatNumber(m3Result)}
            </div>
          </div>
        )}
      </div>

      {/* Mode 4: X decreased by Y%? */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border dark:border-gray-800 shadow-sm p-6 md:p-8 transition-colors duration-300">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            {dict.label_decreased_by || dict.label_discount || 'Decreased by %'}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300">
          <input
            type="number"
            value={m4X}
            onChange={(e) => setM4X(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="X"
          />
          <span>- </span>
          <input
            type="number"
            value={m4Percent}
            onChange={(e) => setM4Percent(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="%"
          />
          <span>% = ?</span>
        </div>
        {m4Result !== null && (
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">{dict.label_result}</span>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {formatNumber(m4Result)}
            </div>
          </div>
        )}
      </div>

      {/* Mode 5: Percentage change from X to Y */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border dark:border-gray-800 shadow-sm p-6 md:p-8 transition-colors duration-300">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            {dict.label_rate_of_change || 'Rate of change'}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300">
          <input
            type="number"
            value={m5X}
            onChange={(e) => setM5X(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="X"
          />
          <span>→</span>
          <input
            type="number"
            value={m5Y}
            onChange={(e) => setM5Y(e.target.value)}
            className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-gray-900 dark:text-gray-100"
            placeholder="Y"
          />
          <span>?</span>
        </div>
        {m5Result !== null && (
          <div className={`mt-4 p-4 rounded-2xl border ${
            m5Result.type === 'increase' 
              ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30' 
              : m5Result.type === 'decrease'
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700'
          }`}>
            <span className={`text-sm font-semibold uppercase tracking-wider ${
              m5Result.type === 'increase' ? 'text-red-600 dark:text-red-400' : m5Result.type === 'decrease' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {dict.label_result} ({m5Result.type === 'increase' ? dict.label_increase : m5Result.type === 'decrease' ? dict.label_decrease : ''})
            </span>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {m5Result.type === 'increase' ? '+' : m5Result.type === 'decrease' ? '-' : ''}{formatNumber(m5Result.value)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PercentageCalculator;
