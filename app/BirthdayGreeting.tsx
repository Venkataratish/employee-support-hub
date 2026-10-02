"use client";

import { useEffect, useRef } from "react";

export default function BirthdayGreeting() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = document.createElement("birthday-greeting");
    element.hidden = true;
    container.current?.append(element);
    if (!document.querySelector('script[data-birthday-module]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "/birthday-greeting.js";
      script.dataset.birthdayModule = "true";
      script.onerror = () => { script.remove(); element.remove(); };
      document.head.append(script);
    }
    return () => element.remove();
  }, []);
  return <div ref={container} />;
}
