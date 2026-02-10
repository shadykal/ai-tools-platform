# AI Tools Platform

منصة تجريبية لأدوات الذكاء الاصطناعي مبنية بـ Next.js + TypeScript + Tailwind.

## تشغيل محلي

1. تثبيت الاعتماديات:

```bash
npm install
```

2. تشغيل السيرفر التطويري:

```bash
npm run dev
```

3. بناء للإنتاج:

```bash
npm run build
npm start
```

## بنية المشروع
- `src/app` — صفحات App Router
- `src/components` — مكونات React قابلة لإعادة الاستخدام
- `src/app/api/tools/*/route.ts` — نقاط نهاية API وهمية (stubs)

## الخطوات التالية المقترحة
- ربط نقاط النهاية بمزود AI حقيقي (OpenAI/Replicate/etc.)
- إضافة تخزين للملفات وقاعدة بيانات
- إضافة Authentication واشتراكات (Stripe أو غيرها)

## تشغيل سريع
بعد تشغيل `npm run dev` افتح:

```
http://localhost:3000
```

لاختبار الأدوات انتقل إلى `/tools`.
