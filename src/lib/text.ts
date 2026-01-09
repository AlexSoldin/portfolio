export interface Word {
  text: string;
  isBold: boolean;
  isAccent?: boolean;
}

/**
 * Parse text with **bold**, *bold*, or ^accent^ markdown into words with formatting
 */
export function parseTextToWords(text: string): Word[] {
  if (!text) return [];
  const words: Word[] = [];
  // Match bold patterns (** or *) and accent pattern (^)
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\^(.+?)\^/g;
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

    // Determine which formatting was matched
    const isAccent = !!match[3];
    const formattingText = match[1] || match[2] || match[3];

    formattingText
      .split(" ")
      .filter(Boolean)
      .forEach((word) => {
        words.push({ text: word, isBold: !isAccent, isAccent });
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
