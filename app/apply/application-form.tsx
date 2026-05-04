"use client";

import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import posthog from "posthog-js";

type SubmitState = "idle" | "loading" | "success" | "error";

type FormValues = {
  fullName: string;
  email: string;
  wechat: string;
  linkedin: string;
  currentRole: string;
  company: string;
  representativeWork: string;
  dinnerInterest: string;
  quietQuestion: string;
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  wechat: "",
  linkedin: "",
  currentRole: "",
  company: "",
  representativeWork: "",
  dinnerInterest: "",
  quietQuestion: ""
};

const formspreeEndpoint = "https://formspree.io/f/xbdqaydw";

export function ApplicationForm({
  initialEmailOverride
}: {
  initialEmailOverride?: string;
}) {
  const searchParams = useSearchParams();
  const dinnerInterestContext = useMemo(
    () => searchParams.get("interest")?.trim() ?? "",
    [searchParams]
  );
  const initialEmail = useMemo(() => {
    if (typeof initialEmailOverride === "string") {
      return initialEmailOverride.trim();
    }

    return searchParams.get("email")?.trim() ?? "";
  }, [initialEmailOverride, searchParams]);
  const initialDinnerInterest = useMemo(() => {
    return dinnerInterestContext.endsWith("-dinner") ? "yes" : "";
  }, [dinnerInterestContext]);
  const [values, setValues] = useState<FormValues>({
    ...initialValues,
    email: initialEmail,
    dinnerInterest: initialDinnerInterest
  });
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  useEffect(() => {
    setValues((current) =>
      current.email === initialEmail &&
      current.dinnerInterest === initialDinnerInterest
        ? current
        : {
            ...current,
            email: initialEmail,
            dinnerInterest: initialDinnerInterest || current.dinnerInterest
          }
    );
  }, [initialDinnerInterest, initialEmail]);

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
          subject: `Z Labs beta profile: ${values.fullName}`,
          fullName: values.fullName,
          email: values.email,
          wechat: values.wechat,
          linkedin: values.linkedin,
          currentRole: values.currentRole,
          company: values.company,
          representativeWork: values.representativeWork,
          dinnerInterest: values.dinnerInterest,
          dinnerInterestContext: dinnerInterestContext || "none",
          quietQuestion: values.quietQuestion
        })
      });

      if (!response.ok) {
        throw new Error("Beta profile could not be submitted.");
      }

      posthog.identify(values.email, {
        email: values.email,
        name: values.fullName,
        current_role: values.currentRole,
        company: values.company
      });
      posthog.capture("beta_profile_submitted", {
        current_role: values.currentRole,
        company: values.company,
        dinner_interest: values.dinnerInterest || "unspecified",
        dinner_interest_context: dinnerInterestContext || "none"
      });
      setState("success");
      setMessage(
        "Z Labs is in a period of research and curation. Your note is in our beta access queue. We will reach out when the timing aligns."
      );
      setValues({
        ...initialValues,
        email: values.email,
        dinnerInterest: initialDinnerInterest
      });
    } catch (error) {
      posthog.captureException(error);
      posthog.capture("beta_profile_submission_failed", {
        error_message: error instanceof Error ? error.message : "Unknown error"
      });
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Beta profile could not be submitted."
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
          placeholder="How you would like to be known"
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
          label="WeChat"
          value={values.wechat}
          onChange={(value) => updateField("wechat", value)}
          placeholder="Optional, if you prefer event invitations there"
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
          placeholder="Researcher, founder, operator, student, etc."
          required
        />
        <Field
          label="Company / institution"
          value={values.company}
          onChange={(value) => updateField("company", value)}
          placeholder="Current home base"
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
        <SelectField
          label="Would you like to be considered for the current or next Z Dinners gathering?"
          value={values.dinnerInterest}
          onChange={(value) => updateField("dinnerInterest", value)}
          options={[
            {
              value: "",
              label: "Optional"
            },
            {
              value: "yes",
              label: "Yes, I would like to be considered"
            },
            {
              value: "not-now",
              label: "Not specifically"
            }
          ]}
        />
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
          {state === "loading" ? "Sending" : "Request beta access"}
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

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  required?: boolean;
}) {
  return (
    <label className="field-label">
      <span>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
      >
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
