export type AITool = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  features: string[];
};

export const AI_TOOLS: AITool[] = [
  {
    id: 'text-to-video',
    name: 'نص إلى فيديو',
    description: 'تحويل النصوص إلى فيديوهات احترافية باستخدام الذكاء الاصطناعي',
    icon: '🎬',
    color: 'from-purple-500 to-pink-500',
    route: '/tools/text-to-video',
    features: ['نصوص احترافية', 'حركات سلسة', 'صوت واضح'],
  },
  {
    id: 'text-to-image',
    name: 'نص إلى صورة',
    description: 'توليد صور عالية الجودة من الأوصاف النصية',
    icon: '🎨',
    color: 'from-blue-500 to-cyan-500',
    route: '/tools/text-to-image',
    features: ['صور عالية الدقة', 'أنماط متنوعة', 'تخصيص كامل'],
  },
  {
    id: 'video-to-video',
    name: 'فيديو إلى فيديو',
    description: 'تحسين وتحويل الفيديوهات الموجودة باستخدام AI',
    icon: '🔄',
    color: 'from-green-500 to-emerald-500',
    route: '/tools/video-to-video',
    features: ['تحسين الجودة', 'إضافة مؤثرات', 'توسيع الدقة'],
  },
  {
    id: 'storyboard',
    name: 'السيناريو والقصة',
    description: 'بناء سيناريوهات وقصص متكاملة للمشاريع الإبداعية',
    icon: '📋',
    color: 'from-orange-500 to-red-500',
    route: '/tools/storyboard',
    features: ['سيناريوهات احترافية', 'تنظيم المشهد', 'تصدير سهل'],
  },
  {
    id: 'image-to-video',
    name: 'صورة إلى فيديو',
    description: 'تحويل الصور الثابتة إلى فيديوهات ديناميكية',
    icon: '🖼️',
    color: 'from-indigo-500 to-purple-500',
    route: '/tools/image-to-video',
    features: ['حركات واقعية', 'انتقالات سلسة', 'مشاهد احترافية'],
  },
  {
    id: 'voice-generation',
    name: 'توليد الصوت',
    description: 'توليد أصوات طبيعية واحترافية من النصوص',
    icon: '🎙️',
    color: 'from-yellow-500 to-orange-500',
    route: '/tools/voice-generation',
    features: ['أصوات متعددة', 'لغات مختلفة', 'تحكم كامل'],
  },
];
