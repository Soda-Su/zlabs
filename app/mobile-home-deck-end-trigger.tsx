"use client";

import { useEffect, useRef } from "react";

export function MobileHomeDeckEndTrigger() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const didTriggerRef = useRef(false);

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || didTriggerRef.current) {
          return;
        }

        didTriggerRef.current = true;
        window.dispatchEvent(new CustomEvent("zlabs:open-apply"));

        window.setTimeout(() => {
          didTriggerRef.current = false;
        }, 1200);
      },
      { threshold: 0.75 }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, []);

  return <div ref={triggerRef} className="mobile-home-end-trigger" aria-hidden="true" />;
}
