"use client";

import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

type SubmitState = "idle" | "loading" | "success" | "error";

type FormValues = {
  fullName: string;
  email: string;
  linkedin: string;
  currentRole: string;
  company: string;
  representativeWork: string;
  quietQuestion: string;
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  linkedin: "",
  currentRole: "",
  company: "",
  representativeWork: "",
  quietQuestion: ""
};

const formspreeEndpoint = "https://formspree.io/f/xbdqaydw";

export function ApplicationForm() {
  const searchParams = useSearchParams();
  const initialEmail = useMemo(
    () => searchParams.get("email")?.trim() ?? "",
    [searchParams]
  );
  const [values, setValues] = useState<FormValues>({
    ...initialValues,
    email: initialEmail
  });
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject: `Z Labs waitlist profile: ${values.fullName}`,
          fullName: values.fullName,
          email: values.email,
          linkedin: values.linkedin,
          currentRole: values.currentRole,
          company: values.company,
          representativeWork: values.representativeWork,
          quietQuestion: values.quietQuestion
        })
      });

      if (!response.ok) {
        throw new Error("Waitlist profile could not be submitted.");
      }

      setState("success");
      setMessage(
        "Z Labs is in a period of research and curation. Your profile is in our priority waitlist. We will reach out when the timeline aligns."
      );
      setValues({ ...initialValues, email: values.email });
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Waitlist profile could not be submitted."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Full name"
          value={values.fullName}
          onChange={(value) => updateField("fullName", value)}
          required
        />
        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={(value) => updateField("email", value)}
          required
        />
        <Field
          label="LinkedIn"
          value={values.linkedin}
          onChange={(value) => updateField("linkedin", value)}
          placeholder="https://linkedin.com/in/..."
          required
        />
        <Field
          label="Current role"
          value={values.currentRole}
          onChange={(value) => updateField("currentRole", value)}
          required
        />
        <Field
          label="Company / institution"
          value={values.company}
          onChange={(value) => updateField("company", value)}
          required
        />
        <Field
          label="Representative work"
          type="url"
          value={values.representativeWork}
          onChange={(value) => updateField("representativeWork", value)}
          placeholder="Paper, portfolio, product, GitHub, talk, or project link"
          required
        />
      </div>

      <div className="mt-5 grid gap-5">
        <TextArea
          label="What question are you quietly working on that Z Labs should understand?"
          value={values.quietQuestion}
          onChange={(value) => updateField("quietQuestion", value)}
          required
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "loading" || state === "success"}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-medium text-white transition duration-300 hover:bg-zlabs-blue-deep focus:outline-none focus:ring-2 focus:ring-zlabs-blue-deep focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "loading" ? "Submitting" : "Join the Waitlist"}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
          />
        </button>
        <p
          aria-live="polite"
          className={`min-h-6 text-sm ${
            state === "success" ? "text-zlabs-blue-deep" : "text-ink/55"
          }`}
        >
          {message}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="field-label">
      <span>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="field-label">
      <span>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <textarea
        required={required}
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="field-input resize-y"
      />
    </label>
  );
}
