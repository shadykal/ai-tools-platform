'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function VoiceGenerationPage() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('voice1');
  const [language, setLanguage] = useState('ar');
  const [speed, setSpeed] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/tools/voice-generation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, language, speed }),
      });
      const data = await res.json();
      console.log('voice-generation response', data);
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
            توليد الصوت 🎙️
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            حول نصوصك إلى أصوات احترافية طبيعية وعالية الجودة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  النص المراد تحويله
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="اكتب النص الذي تريد تحويله إلى صوت..."
                  className="w-full h-48 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* Settings Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اللغة
                  </label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">الإنجليزية</option>
                    <option value="fr">الفرنسية</option>
                    <option value="es">الإسبانية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الصوت
                  </label>
                  <select 
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="voice1">ذكر 1</option>
                    <option value="voice2">ذكر 2</option>
                    <option value="voice3">أنثى 1</option>
                    <option value="voice4">أنثى 2</option>
                  </select>
                </div>
              </div>

              {/* Speed Control */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  سرعة الكلام
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-gray-600 dark:text-gray-400 font-semibold min-w-fit">{speed.toFixed(1)}x</span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!text.trim() || isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'جاري التوليد...' : 'توليد الصوت'}
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border border-yellow-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                المميزات
              </h3>
              <ul className="space-y-4">
                {[
                  'أصوات طبيعية جداً',
                  'لغات متعددة',
                  'أصوات متنوعة',
                  'تحكم بالسرعة',
                  'جودة عالية',
                  'معالج سريع',
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
