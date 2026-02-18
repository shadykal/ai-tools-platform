// Local storage for storyboards

export interface SavedStoryboard {
  id: string;
  title: string;
  genre: string;
  data: any;
  savedAt: string;
}

const STORAGE_KEY = 'ai_platform_storyboards';

export function saveStoryboardLocally(storyboard: any): SavedStoryboard {
  const saved: SavedStoryboard = {
    id: `sb-${Date.now()}`,
    title: storyboard.title,
    genre: storyboard.genre,
    data: storyboard,
    savedAt: new Date().toISOString(),
  };

  try {
    const existing = getAllSavedStoryboards();
    existing.push(saved);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (err) {
    console.error('Failed to save storyboard locally:', err);
  }

  return saved;
}

export function getAllSavedStoryboards(): SavedStoryboard[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load storyboards:', err);
    return [];
  }
}

export function deleteSavedStoryboard(id: string): void {
  try {
    const existing = getAllSavedStoryboards();
    const filtered = existing.filter((s) => s.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (err) {
    console.error('Failed to delete storyboard:', err);
  }
}

export function getSavedStoryboardById(id: string): SavedStoryboard | null {
  const all = getAllSavedStoryboards();
  return all.find((s) => s.id === id) || null;
}

export function exportStoryboardAsText(storyboard: any): string {
  let text = `${storyboard.title}\n`;
  text += `${'='.repeat(storyboard.title.length)}\n\n`;
  text += `النوع: ${storyboard.genre}\n`;
  text += `المدة: ${storyboard.duration}\n`;
  text += `الموضوع: ${storyboard.theme}\n\n`;
  text += `الملخص:\n${storyboard.summary}\n\n`;

  text += `الشخصيات الرئيسية:\n`;
  text += `${'-'.repeat(30)}\n`;
  storyboard.characters.forEach((char: any) => {
    text += `\n${char.name} (${char.role})\n`;
    text += `الصفات: ${char.traits.join('، ')}\n`;
    text += `${char.description}\n`;
  });

  text += `\n\nالسيناريو المفصل:\n`;
  text += `${'='.repeat(30)}\n`;
  storyboard.scenes.forEach((scene: any, idx: number) => {
    text += `\n${scene.title}\n`;
    text += `${'-'.repeat(scene.title.length)}\n`;
    text += `المكان: ${scene.setting}\n`;
    text += `المدة: ${scene.duration}\n`;
    text += `الشخصيات: ${scene.characters.join('، ')}\n`;
    text += `الحدث: ${scene.actionDescription}\n`;
  });

  return text;
}
