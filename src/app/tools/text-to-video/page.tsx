'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function TextToVideoPage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/tools/text-to-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      // For now just log the response and show success state
      console.log('text-to-video response', data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            نص إلى فيديو 🎬
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            حول نصوصك إلى فيديوهات احترافية باستخدام الذكاء الاصطناعي المتقدم
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                أدخل النص
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="اكتب النص الذي تريد تحويله إلى فيديو..."
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    سرعة الفيديو
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>عادية</option>
                    <option>سريعة</option>
                    <option>بطيئة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    النسبة
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text:gray-900 dark:text-white">
                    <option>16:9</option>
                    <option>9:16</option>
                    <option>1:1</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!text.trim() || isLoading}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'جاري معالجة...' : 'إنشاء الفيديو'}
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border border-purple-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                المميزات
              </h3>
              <ul className="space-y-4">
                {[
                  'فيديوهات HD وFullHD',
                  'حركات سلسة واحترافية',
                  'صوت عالي الجودة',
                  'مؤثرات بصرية متقدمة',
                  'سرعة معالجة سريعة',
                  'تحميل سهل',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
