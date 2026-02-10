'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function VideoToVideoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState('1080p');

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/tools/video-to-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quality }),
      });
      const data = await res.json();
      console.log('video-to-video response', data);
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
            فيديو إلى فيديو 🔄
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            حسّن وحوّل فيديوهاتك الموجودة باستخدام تقنيات AI المتقدمة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  تحميل الفيديو
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">
                    اسحب الفيديو هنا أو اضغط لاختياره
                  </p>
                  <p className="text-xs text-gray-500 mt-2">الحد الأقصى: 2GB</p>
                </div>
              </div>

              {/* Enhancement Options */}
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    خيارات التحسين
                  </label>
                  <div className="space-y-3">
                    {[
                      { id: 'upscale', label: 'تحسين الجودة' },
                      { id: 'frame', label: 'زيادة عدد الإطارات (60FPS)' },
                      { id: 'denoise', label: 'تنظيف الضوضاء' },
                      { id: 'enhance', label: 'تحسين الألوان' },
                    ].map((option) => (
                      <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                        <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    جودة الإخراج
                  </label>
                  <select 
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="2k">2K</option>
                    <option value="4k">4K</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleUpload}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all"
              >
                {isLoading ? 'جاري المعالجة...' : 'معالجة الفيديو'}
              </button>
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border border-green-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                المقدرات
              </h3>
              <ul className="space-y-4">
                {[
                  'تحسين الدقة تلقائياً',
                  'إصلاح الإضاءة',
                  'تقليل الضوضاء',
                  'زيادة الإطارات',
                  'تحسين الألوان',
                  'معالجة سريعة',
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
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
