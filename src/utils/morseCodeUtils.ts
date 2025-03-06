
// Morse code dictionary for letters, numbers, and some punctuation
export const englishToMorseMap: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.',
  '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

// Create reverse mapping for Morse to English
export const morseToEnglishMap: Record<string, string> = Object.entries(englishToMorseMap).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>
);

// Convert English text to Morse code
export function translateToMorse(text: string): string {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .split('')
    .map(char => englishToMorseMap[char] || char)
    .join(' ')
    .trim();
}

// Convert Morse code to English text
export function translateToEnglish(morse: string): string {
  if (!morse) return '';
  
  return morse
    .split(' ')
    .map(code => {
      // Check if it's a space (represented as /)
      if (code === '/') return ' ';
      return morseToEnglishMap[code] || code;
    })
    .join('')
    .trim();
}

// Audio context for playing sounds
let audioContext: AudioContext | null = null;

// Function to initialize audio context (must be called after user interaction)
export function initAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

// Constants for Morse code timing (in seconds)
const DOT_DURATION = 0.1;
const DASH_DURATION = DOT_DURATION * 3;
const SYMBOL_SPACE = DOT_DURATION;
const LETTER_SPACE = DOT_DURATION * 3;
const WORD_SPACE = DOT_DURATION * 7;

// Play Morse code sound
export async function playMorseCode(morseCode: string) {
  try {
    // Initialize audio context if not already done
    const context = initAudioContext();
    if (context.state === 'suspended') {
      await context.resume();
    }
    
    let timeOffset = 0;
    
    for (let i = 0; i < morseCode.length; i++) {
      const char = morseCode[i];
      
      if (char === '.') {
        // Play dot
        playTone(context, timeOffset, DOT_DURATION);
        timeOffset += DOT_DURATION + SYMBOL_SPACE;
      } else if (char === '-') {
        // Play dash
        playTone(context, timeOffset, DASH_DURATION);
        timeOffset += DASH_DURATION + SYMBOL_SPACE;
      } else if (char === ' ') {
        // Space between letters (minus the already included symbol space)
        timeOffset += LETTER_SPACE - SYMBOL_SPACE;
      } else if (char === '/') {
        // Space between words (minus the already included letter space)
        timeOffset += WORD_SPACE - LETTER_SPACE;
      }
    }
  } catch (error) {
    console.error('Error playing Morse code:', error);
  }
}

// Helper function to play a tone
function playTone(context: AudioContext, startTime: number, duration: number) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.value = 700; // 700 Hz tone
  
  // Add a small ramp to avoid clicks
  gainNode.gain.setValueAtTime(0, context.currentTime + startTime);
  gainNode.gain.linearRampToValueAtTime(0.5, context.currentTime + startTime + 0.01);
  gainNode.gain.setValueAtTime(0.5, context.currentTime + startTime + duration - 0.01);
  gainNode.gain.linearRampToValueAtTime(0, context.currentTime + startTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  
  oscillator.start(context.currentTime + startTime);
  oscillator.stop(context.currentTime + startTime + duration);
}
