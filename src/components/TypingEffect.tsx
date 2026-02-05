'use client';

import { useEffect, useState } from 'react';

interface TypingEffectProps {
  /** Full sentence to type out character by character */
  text: string;
  /** Optional second part to show after typing (styled with suffixClassName) */
  suffix?: string;
  suffixClassName?: string;
  className?: string;
  /** Delay per character when typing (ms) - higher = slower */
  speed?: number;
  /** Delay per character when deleting (ms). Defaults to speed / 2 */
  deleteSpeed?: number;
  /** Pause at end of sentence before deleting (ms) */
  pauseAfter?: number;
  /** Pause after delete before typing again (ms) */
  pauseBefore?: number;
  /** Whether to loop (type → pause → delete → pause → repeat). Default true */
  repeat?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
}

export default function TypingEffect({
  text,
  suffix,
  suffixClassName = 'text-primary-500',
  className = '',
  speed = 140,
  deleteSpeed,
  pauseAfter = 2000,
  pauseBefore = 600,
  repeat = true,
  cursorChar = '|',
  cursorClassName = 'text-primary-500 animate-pulse',
}: TypingEffectProps) {
  const [display, setDisplay] = useState('');
  const delSpeed = deleteSpeed ?? Math.max(40, Math.floor(speed / 2));

  useEffect(() => {
    if (!text) return;

    let i = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      if (deleting) {
        if (i > 0) {
          i--;
          setDisplay(text.slice(0, i));
          timeoutId = setTimeout(tick, delSpeed);
        } else {
          deleting = false;
          timeoutId = setTimeout(tick, pauseBefore);
        }
        return;
      }

      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
        timeoutId = setTimeout(tick, speed);
      } else {
        if (repeat) {
          timeoutId = setTimeout(() => {
            deleting = true;
            timeoutId = setTimeout(tick, pauseAfter);
          }, pauseAfter);
        }
      }
    }

    timeoutId = setTimeout(tick, 0);
    return () => clearTimeout(timeoutId);
  }, [text, speed, delSpeed, pauseAfter, pauseBefore, repeat]);

  const showCursor = display.length < text.length;

  return (
    <span className={className}>
      {display}
      {display.length === text.length && suffix != null && (
        <span className={suffixClassName}>{suffix}</span>
      )}
      {showCursor && <span className={cursorClassName}>{cursorChar}</span>}
    </span>
  );
}
