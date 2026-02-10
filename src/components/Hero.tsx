export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 md:py-32">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-blue-200 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-purple-200 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            منصة أدوات الذكاء الاصطناعي الشاملة
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            كل ما تحتاجه للإنتاج الإبداعي في مكان واحد. حول أفكارك إلى محتوى احترافي باستخدام قوة الذكاء الاصطناعي
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">6+</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">أدوات متقدمة</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">∞</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">احتمالات غير محدودة</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">24/7</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">متاح دائماً</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              ابدأ الآن مجاناً
            </button>
            <button className="px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors">
              تعرف على المزيد
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
