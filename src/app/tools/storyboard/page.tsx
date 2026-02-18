'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

interface Storyboard {
  title: string;
  genre: string;
  duration: string;
  summary: string;
  scenes: any[];
  characters: any[];
  theme: string;
  generatedAt: string;
}

interface ApiResponse {
  jobId: string;
  status: string;
  tool: string;
  data?: Storyboard;
  markdown?: string;
  error?: string;
}

export default function StoryboardPage() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('دراما رومانسية');
  const [sceneCount, setSceneCount] = useState(5);
  const [characterCount, setCharacterCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Storyboard | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'characters' | 'scenes'>('overview');

  const handleGenerate = async () => {
    setError('');
    setResult(null);

    if (!title.trim()) {
      setError('الرجاء إدخال عنوان السيناريو');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/tools/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          genre,
          sceneCount,
          characterCount,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'حدث خطأ في توليد السيناريو');
      } else if (data.data) {
        setResult(data.data);
        setActiveTab('overview');
      }
    } catch (err) {
      setError('خطأ في الاتصال بالخادم');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToMarkdown = () => {
    if (!result) return;
    // Create markdown content
    let content = `# ${result.title}\n\n`;
    content += `**النوع:** ${result.genre}\n`;
    content += `**المدة:** ${result.duration}\n`;
    content += `**الموضوع:** ${result.theme}\n\n`;
    content += `## الملخص\n${result.summary}\n\n`;

    // Download
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.title.replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.title.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
            أنشئ سيناريوهات واقعية مع شخصيات ومشاهد متكاملة
          </p>
        </div>

        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    عنوان السيناريو
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: لقاء القدر في المقهى"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    نوع السيناريو
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option>دراما رومانسية</option>
                    <option>أكشن</option>
                    <option>كوميديا</option>
                    <option>رعب</option>
                    <option>خيال علمي</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      عدد المشاهد
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={sceneCount}
                      onChange={(e) => setSceneCount(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                      {sceneCount} مشهد
                    </p>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      عدد الشخصيات
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={characterCount}
                      onChange={(e) => setCharacterCount(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-2 font-semibold">
                      {characterCount} شخصيات
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !title.trim()}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      جاري التوليد...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      إنشاء السيناريو
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Feature Sidebar */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl p-8 border border-orange-200 dark:border-orange-900/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">المميزات</h3>
              <ul className="space-y-4">
                {[
                  'شخصيات متكاملة',
                  'حوارات واقعية',
                  'مشاهد مصممة بعناية',
                  'توجيهات إنتاجية',
                  'تصدير سهل',
                  'توليد فوري',
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
            {/* Header with Export Buttons */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {result.title}
                </h2>
                <div className="flex gap-4 text-gray-600 dark:text-gray-400">
                  <span>📌 {result.genre}</span>
                  <span>⏱️ {result.duration}</span>
                  <span>🎭 {result.theme}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={exportToMarkdown}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                  📄 Markdown
                </button>
                <button
                  onClick={exportToJSON}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                >
                  📋 JSON
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                >
                  ← جديد
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
              {(['overview', 'characters', 'scenes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold transition ${
                    activeTab === tab
                      ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {tab === 'overview' && '📖 نظرة عامة'}
                  {tab === 'characters' && '👥 الشخصيات'}
                  {tab === 'scenes' && '🎬 المشاهد'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الملخص</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {result.summary}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      تم التوليد في: {new Date(result.generatedAt).toLocaleString('ar-SA')}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'characters' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.characters.map((char: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                    >
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {char.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{char.role}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        {char.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {char.traits.map((trait: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'scenes' && (
                <div className="space-y-6">
                  {result.scenes.map((scene: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
                    >
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {scene.title}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">المكان</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{scene.setting}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">المدة</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{scene.duration}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-500 dark:text-gray-400">الشخصيات</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {scene.characters.join('، ')}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          <strong>الحدث:</strong> {scene.actionDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
