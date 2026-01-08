export interface Word {
  text: string;
  isBold: boolean;
}

/**
 * Parse text with **bold** or *bold* markdown into words with formatting
 */
export function parseTextToWords(text: string): Word[] {
  if (!text) return [];
  const words: Word[] = [];
  // Match bold patterns and capture them with their content
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add normal words before this match
    if (match.index > lastIndex) {
      const normalText = text.slice(lastIndex, match.index);
      normalText
        .split(" ")
        .filter(Boolean)
        .forEach((word) => {
          words.push({ text: word, isBold: false });
        });
    }

    // Add bold words (group 1 for **, group 2 for *)
    const boldText = match[1] || match[2];
    boldText
      .split(" ")
      .filter(Boolean)
      .forEach((word) => {
        words.push({ text: word, isBold: true });
      });

    lastIndex = regex.lastIndex;
  }

  // Add remaining normal words
  if (lastIndex < text.length) {
    text
      .slice(lastIndex)
      .split(" ")
      .filter(Boolean)
      .forEach((word) => {
        words.push({ text: word, isBold: false });
      });
  }

  return words;
}
