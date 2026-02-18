// Smart local storyboard/scenario generator without external APIs

export interface Scene {
  sceneNumber: number;
  title: string;
  duration: string;
  setting: string;
  characters: string[];
  dialogue: DialogueLine[];
  actionDescription: string;
  cameraDirections: string[];
  notes: string[];
}

export interface DialogueLine {
  character: string;
  text: string;
  emotion?: string;
}

export interface Storyboard {
  title: string;
  genre: string;
  duration: string;
  summary: string;
  scenes: Scene[];
  characters: CharacterProfile[];
  theme: string;
  generatedAt: string;
}

export interface CharacterProfile {
  name: string;
  role: string;
  description: string;
  traits: string[];
}

// Sample datasets for intelligent generation
const characterNames = [
  'أحمد', 'فاطمة', 'محمد', 'ليلى', 'علي', 'سارة', 'خالد', 'مريم', 'عمر', 'نور',
  'يوسف', 'زينة', 'إبراهيم', 'هند', 'حسن', 'دينا', 'طارق', 'سها', 'زياد', 'أسماء'
];

const settings = [
  'قصر فخم', 'منزل عادي', 'مقهى شهير', 'شارع مزدحم', 'حديقة جميلة',
  'مكتب حديث', 'محطة قطار', 'شاطئ ساحر', 'مكتبة قديمة', 'مستشفى', 
  'مطعم فاخر', 'سيارة متحركة', 'غرفة مظلمة', 'ساحة عامة', 'منتزه عائلي'
];

const emotions = [
  'سعيد', 'حزين', 'غاضب', 'خائف', 'مندهش', 'مرتبك', 'واثق', 'قلق', 'متفاجئ', 'محرج'
];

const cameraDirections = [
  'zoom in على الوجه',
  'plan عام للمشهد',
  'حركة بطيئة من اليسار لليمين',
  'focus على الموضوع الرئيسي',
  'لقطة على الأرض من الأعلى',
  'مقربة على التفاصيل الدقيقة',
  'لقطة ثابتة',
  'حركة دوران حول الموضوع',
  'لقطة من الخلف',
  'focus على العيون'
];

const actionDescriptions = [
  'يدخل الشخص بثقة',
  'حوار مشحون بالعواطف',
  'لحظة من الصمت المؤثر',
  'مفاجأة غير متوقعة',
  'انفجار عاطفي',
  'لحظة هادئة للتأمل',
  'مشهد حركة مثير',
  'لقاء عاطفي',
  'صراع نفسي داخلي',
  'لحظة حاسمة'
];

const genres = {
  'دراما رومانسية': {
    themes: ['الحب', 'التضحية', 'الفهم المتبادل'],
    typicalScenes: ['لقاء أول', 'صراع عاطفي', 'مصالحة']
  },
  'أكشن': {
    themes: ['المطاردة', 'البطولة', 'الصراع'],
    typicalScenes: ['البداية المثيرة', 'مشهد حركة', 'النهاية المجيدة']
  },
  'كوميديا': {
    themes: ['الفكاهة', 'المواقف المضحكة', 'النهاية السعيدة'],
    typicalScenes: ['موقف مجنون', 'سوء فهم مضحك', 'نهاية سعيدة']
  },
  'رعب': {
    themes: ['الخوف', 'الغموض', 'التوتر'],
    typicalScenes: ['بناء التوتر', 'لحظة خوف', 'الحقيقة المزلزلة']
  },
  'خيال علمي': {
    themes: ['التكنولوجيا', 'المستقبل', 'الاستكشاف'],
    typicalScenes: ['اكتشاف', 'معركة فضائية', 'حل المشكلة']
  }
};

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateCharacters(count: number, genre: string): CharacterProfile[] {
  const characters: CharacterProfile[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name: string;
    do {
      name = getRandomElement(characterNames);
    } while (usedNames.has(name));
    usedNames.add(name);

    const roles = ['البطل الرئيسي', 'الشخصية الثانوية', 'الخصم', 'الحليف', 'المستشار'];
    const traits = ['شجاع', 'ذكي', 'كاريزماتي', 'صادق', 'محنك', 'حساس', 'طموح'];

    characters.push({
      name,
      role: getRandomElement(roles),
      description: `شخصية مهمة في السيناريو من نوع ${genre}`,
      traits: getRandomElements(traits, 3)
    });
  }

  return characters;
}

function generateDialogue(character: string, sceneContext: string): DialogueLine[] {
  const dialogueOptions: { [key: string]: string[] } = {
    'لقاء أول': [
      'مرحباً، أنا جديد هنا',
      'هل يمكنني أن أساعدك؟',
      'لا أعتقد أننا التقينا من قبل',
      'أنت من هنا؟'
    ],
    'صراع عاطفي': [
      'لا أستطيع أن أتقبل هذا',
      'لماذا لم تخبرني؟',
      'هذا ليس عادلاً',
      'أنا بحاجة إلى وقت للتفكير',
      'لم أتوقع هذا منك'
    ],
    'مصالحة': [
      'آسف على ما حدث',
      'أنا أفهم مشاعرك الآن',
      'هيا نبدأ من جديد',
      'تم إصلاح الأمور',
      'شكراً لأنك استمعت لي'
    ],
    'مفاجأة': [
      'لا مكان للقلق',
      'كان هذا بمثابة مفاجأة سارة',
      'لم أكن أتوقعه أبداً',
      'هذا أفضل مما توقعت'
    ]
  };

  const dialogue = dialogueOptions[sceneContext] || dialogueOptions['لقاء أول'];
  const lines: DialogueLine[] = [];

  for (let i = 0; i < 2; i++) {
    lines.push({
      character,
      text: getRandomElement(dialogue),
      emotion: getRandomElement(emotions)
    });
  }

  return lines;
}

function generateScene(sceneNumber: number, genre: string, theme: string): Scene {
  const setting = getRandomElement(settings);
  const character = getRandomElement(characterNames);
  const sceneType = getRandomElements(['لقاء أول', 'صراع عاطفي', 'مصالحة', 'مفاجأة'], 1)[0];

  return {
    sceneNumber,
    title: `المشهد ${sceneNumber}: ${sceneType}`,
    duration: `${2 + sceneNumber} دقائق`,
    setting,
    characters: getRandomElements(characterNames, 2),
    dialogue: generateDialogue(character, sceneType),
    actionDescription: getRandomElement(actionDescriptions),
    cameraDirections: getRandomElements(cameraDirections, 2),
    notes: [
      `موضوع رئيسي: ${theme}`,
      `نوع المشهد: ${sceneType}`,
      `المزاج العام: ${getRandomElement(emotions)}`
    ]
  };
}

function generateSummary(title: string, genre: string, scenes: Scene[]): string {
  const genreInfo = genres[genre as keyof typeof genres];
  const themes = genreInfo?.themes || ['الدراما', 'الصراع', 'الحل'];

  return `قصة مشوقة من نوع ${genre} تدور أحداثها حول ${themes[0].toLowerCase()}.
    تتألف من ${scenes.length} مشاهد مترابطة تقدم رحلة درامية مليئة بالتشويق والعاطفة.
    يتميز السيناريو بحوارات قوية وصراعات نفسية عميقة تجذب المشاهد من البداية إلى النهاية.`;
}

export function generateStoryboard(
  title: string,
  genre: string,
  sceneCount: number = 5,
  characterCount: number = 3
): Storyboard {
  const genreInfo = genres[genre as keyof typeof genres];
  const selectedTheme = genreInfo ? getRandomElement(genreInfo.themes) : 'الدراما';
  
  const scenes: Scene[] = [];
  for (let i = 1; i <= sceneCount; i++) {
    scenes.push(generateScene(i, genre, selectedTheme));
  }

  const characters = generateCharacters(characterCount, genre);
  const summary = generateSummary(title, genre, scenes);

  return {
    title: title || 'سيناريو جديد',
    genre,
    duration: `${sceneCount * 3} دقائق تقريباً`,
    summary,
    scenes,
    characters,
    theme: selectedTheme,
    generatedAt: new Date().toISOString()
  };
}

export function storyboardToMarkdown(storyboard: Storyboard): string {
  let markdown = `# ${storyboard.title}\n\n`;
  markdown += `**النوع:** ${storyboard.genre}\n`;
  markdown += `**المدة الزمنية:** ${storyboard.duration}\n`;
  markdown += `**الموضوع:** ${storyboard.theme}\n\n`;
  
  markdown += `## ملخص القصة\n${storyboard.summary}\n\n`;
  
  markdown += `## الشخصيات الرئيسية\n`;
  storyboard.characters.forEach(char => {
    markdown += `\n### ${char.name}\n`;
    markdown += `**الدور:** ${char.role}\n`;
    markdown += `**الصفات:** ${char.traits.join('، ')}\n`;
    markdown += `**الوصف:** ${char.description}\n`;
  });
  
  markdown += `\n## السيناريو المفصل\n`;
  storyboard.scenes.forEach(scene => {
    markdown += `\n### ${scene.title}\n`;
    markdown += `- **المكان:** ${scene.setting}\n`;
    markdown += `- **المدة:** ${scene.duration}\n`;
    markdown += `- **الشخصيات:** ${scene.characters.join('، ')}\n`;
    markdown += `- **الحدث:** ${scene.actionDescription}\n`;
    
    if (scene.dialogue.length > 0) {
      markdown += `\n**الحوار:**\n`;
      scene.dialogue.forEach(line => {
        markdown += `> **${line.character}** (${line.emotion || 'محايد'}): ${line.text}\n`;
      });
    }
    
    markdown += `\n**توجيهات الكاميرا:**\n`;
    scene.cameraDirections.forEach(dir => {
      markdown += `- ${dir}\n`;
    });
    
    if (scene.notes.length > 0) {
      markdown += `\n**ملاحظات:**\n`;
      scene.notes.forEach(note => {
        markdown += `- ${note}\n`;
      });
    }
  });
  
  return markdown;
}
