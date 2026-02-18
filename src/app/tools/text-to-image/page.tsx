'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

interface ImageData {
  id: string;
  metadata: {
    id: string;
    prompt: string;
    style: string;
    size: string;
    description: string;
    colorPalette: string[];
    mood: string;
    elements: string[];
    composition: string;
    lightingType: string;
    generatedAt: string;
  };
  preview: string;
  fileName: string;
}

interface ApiResponse {
  jobId: string;
  status: string;
  tool: string;
  data?: ImageData;
  error?: string;
  generatedAt?: string;
}

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('1024x1024');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImageData | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<ImageData[]>([]);

  const handleGenerate = async () => {
    setError('');
    setResult(null);

    if (!prompt.trim()) {
      setError('الرجاء كتابة وصف الصورة');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/tools/text-to-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style,
          size,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'حدث خطأ في توليد الصورة');
      } else if (data.data) {
        setResult(data.data);
        setHistory([data.data, ...history.slice(0, 4)]);
      }
    } catch (err) {
      setError('خطأ في الاتصال بالخادم');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.preview;
    a.download = result.fileName;
    a.click();
  };

  const downloadMetadata = () => {
    if (!result) return;
    const json = JSON.stringify(result.metadata, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            نص إلى صورة 🎨
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            حول وصفاتك إلى صور فنية جميلة باستخدام الذكاء الاصطناعي
          </p>
        </div>

        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    وصف الصورة
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="اكتب وصفاً مفصلاً للصورة التي تريد إنشاءها...
مثال: منظر طبيعي جميل بغروب الشمس على الجبال مع انعكاس على بحيرة هادئة"
                    className="w-full h-48 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      النمط الفني
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="realistic">واقعي 📷</option>
                      <option value="painting">لوحة زيتية 🎨</option>
                      <option value="anime">أنمي ✨</option>
                      <option value="cartoon">كرتون 🎭</option>
                      <option value="digital">رقمي 💻</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      دقة الصورة
                    </label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="512x512">512×512 (صغير)</option>
                      <option value="768x768">768×768 (متوسط)</option>
                      <option value="1024x1024">1024×1024 (كبير)</option>
                      <option value="1024x768">1024×768 (أفقي)</option>
                      <option value="768x1024">768×1024 (عمودي)</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      جاري التوليد...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      إنشاء الصورة
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features Sidebar */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-900/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                المميزات
              </h3>
              <ul className="space-y-4">
                {[
                  'توليد فوري للصور',
                  'خمسة أنماط فنية',
                  'دقات متعددة',
                  'معلومات فنية مفصلة',
                  'تحميل وتصدير سهل',
                  'سجل الصور',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // Results View
          <div className="space-y-8">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  الصورة المولدة
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{result.metadata.prompt}</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={downloadImage}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                  📥 تحميل الصورة
                </button>
                <button
                  onClick={downloadMetadata}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                >
                  📋 معلومات
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                >
                  ← جديد
                </button>
              </div>
            </div>

            {/* Image Preview */}
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <img
                  src={result.preview}
                  alt={result.metadata.prompt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Details */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  التفاصيل
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">الوصف الفني</p>
                    <p className="text-gray-900 dark:text-white">{result.metadata.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">الأسلوب</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{result.metadata.style}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">المزاج</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{result.metadata.mood}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">التكوين</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{result.metadata.composition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">الإضاءة</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{result.metadata.lightingType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  لوحة الألوان
                </h3>
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {result.metadata.colorPalette.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-md"
                        style={{ backgroundColor: color }}
                      />
                      <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 font-mono">
                        {color}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elements */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  العناصر الفنية
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.metadata.elements.map((element, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {element}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generation Info */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  معلومات الإنشاء
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">الدقة:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{result.metadata.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">المعرف:</span>
                    <span className="font-mono text-gray-900 dark:text-white text-xs">{result.metadata.id.split('-')[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">التاريخ:</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(result.metadata.generatedAt).toLocaleString('ar-SA')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  الصور الحديثة
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {history.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setResult(img)}
                      className="cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition"
                    >
                      <img
                        src={img.preview}
                        alt={img.metadata.prompt}
                        className="w-full h-24 object-cover hover:opacity-80 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
