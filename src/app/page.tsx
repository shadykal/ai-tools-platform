import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { AI_TOOLS } from '@/types/tools';

export default function Home() {
  const completedTools = ['storyboard', 'text-to-image'];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Tools Section */}
        <section id="tools" className="py-20 md:py-32 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                أدوات الذكاء الاصطناعي المتقدمة
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                اختر من مجموعة شاملة من الأدوات لإنشاء محتوى احترافي
              </p>
            </div>

            {/* Status Badge */}
            <div className="mb-8 text-center">
              <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                ✅ {completedTools.length} من {AI_TOOLS.length} أداة جاهزة
              </span>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {AI_TOOLS.map((tool) => (
                <div key={tool.id} className="relative">
                  <ToolCard tool={tool} />
                  {completedTools.includes(tool.id) && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      جاهزة ✨
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                المميزات
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                تمتع بميزات متقدمة وسهلة الاستخدام
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'سريع جداً',
                  description: 'معالجة فورية للمحتوى بأعلى السرعات',
                  icon: '⚡',
                },
                {
                  title: 'سهل الاستخدام',
                  description: 'واجهة بديهية لا تحتاج خبرة تقنية',
                  icon: '✨',
                },
                {
                  title: 'عالي الجودة',
                  description: 'نتائج احترافية ومتقدمة',
                  icon: '🎯',
                },
                {
                  title: 'آمن وموثوق',
                  description: 'بيانات محمية وخوادم موثوقة',
                  icon: '🔒',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Updates Section */}
        <section id="updates" className="py-20 md:py-32 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                آخر التحديثات
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  date: 'اليوم',
                  title: 'أداة السيناريو والقصة جاهزة 🎉',
                  description: 'توليد سيناريوهات احترافية محليًا بدون API خارجية. جاهزة للاستخدام الفوري!',
                  status: 'مكتملة',
                },
                {
                  date: 'قريباً',
                  title: 'توليد الصور من النصوص',
                  description: 'تحويل الأوصاف النصية إلى صور عالية الجودة باستخدام نماذج متقدمة.',
                  status: 'تحت التطوير',
                },
                {
                  date: 'قريباً',
                  title: 'تحويل النصوص إلى فيديوهات',
                  description: 'إنشاء فيديوهات احترافية من النصوص والسيناريوهات.',
                  status: 'تحت التطوير',
                },
              ].map((update, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{update.date}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      update.status === 'مكتملة'
                        ? 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                        : 'bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
                    }`}>
                      {update.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {update.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {update.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
