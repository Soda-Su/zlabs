"use client";

import { InviteForm } from "./invite-form";

export function HeroInvite() {
  return (
    <InviteForm
      placeholder="Join Z Labs beta"
      buttonLabel="Join the Beta"
      variant="hero"
      onValidEmail={(email) => {
        const event = new CustomEvent("zlabs:open-apply", {
          detail: { email }
        });
        window.dispatchEvent(event);
      }}
    />
  );
}
