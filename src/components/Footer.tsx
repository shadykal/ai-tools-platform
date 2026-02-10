export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span>🤖</span> AI Tools Hub
            </h3>
            <p className="text-sm text-gray-400">
              منصة شاملة لأدوات الذكاء الاصطناعي تساعدك في إنشاء محتوى احترافي
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">الأدوات</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">نص إلى فيديو</a></li>
              <li><a href="#" className="hover:text-white transition-colors">نص إلى صورة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">صورة إلى فيديو</a></li>
              <li><a href="#" className="hover:text-white transition-colors">توليد الصوت</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">الشركة</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">عن الموقع</a></li>
              <li><a href="#" className="hover:text-white transition-colors">المدونة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">التسعير</a></li>
              <li><a href="#" className="hover:text-white transition-colors">التوظيف</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">قانوني</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شروط الخدمة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ملفات تعريف الارتباط</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400">
              © {currentYear} AI Tools Hub. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
