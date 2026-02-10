'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function StoryboardPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scenes, setScenes] = useState(5);

  const handleGenerate = async () => {
    try {
      const res = await fetch('/api/tools/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, scenes }),
      });
      const data = await res.json();
      console.log('storyboard response', data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            السيناريو والقصة 📋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            أنشئ سيناريوهات وقصص متكاملة مع رسومات توضيحية احترافية
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  عنوان المشروع
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="أدخل عنوان قصتك أو مشروعك"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  وصف القصة
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب وصفاً كاملاً لقصتك أو سيناريوك..."
                  className="w-full h-48 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  عدد المشاهد
                </label>
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={scenes}
                  onChange={(e) => setScenes(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-center text-gray-600 dark:text-gray-400 mt-2">{scenes} مشهد</p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!title.trim() || !description.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                إنشاء السيناريو
              </button>
            </div>
          </div>

          {/* Template Section */}
          <div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border border-orange-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                قوالب مدمجة
              </h3>
              <ul className="space-y-4">
                {[
                  'تصميم المشاهد',
                  'كتابة الحوار',
                  'تحديد الممثلين',
                  'توزيع الميزانية',
                  'جدول الإنتاج',
                  'تصدير احترافي',
                ].map((template, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{template}</span>
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
