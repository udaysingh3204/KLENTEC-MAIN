import { useRef } from "react";

/**
 * Lightweight, dependency-free spam signal for public forms:
 * - a hidden honeypot field real users never see or fill, but bots often do
 * - a minimum time-on-page check, since bots typically submit instantly
 */
export const useSpamGuard = (minSeconds = 2) => {
  const mountedAt = useRef(Date.now());

  const isLikelyBot = (honeypotValue: string) => {
    if (honeypotValue) return true;
    if (Date.now() - mountedAt.current < minSeconds * 1000) return true;
    return false;
  };

  return { isLikelyBot };
};
