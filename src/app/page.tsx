import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { AI_TOOLS } from '@/types/tools';

export default function Home() {
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

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {AI_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
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
      </main>

      <Footer />
    </div>
  );
}
