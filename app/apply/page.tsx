import Link from "next/link";
import { Suspense } from "react";
import { ApplicationForm } from "./application-form";

export const metadata = {
  title: "Apply to Z Labs",
  description:
    "Apply for Z Labs membership, a curated Bay Area community for PhDs, research operators, and technical founders."
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-alabaster text-ink">
      <header className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4 text-sm sm:px-6 lg:px-8">
        <Link href="/" className="brand-mark">
          <span className="z-mark">Z</span>
          <span className="brand-text">Z Labs</span>
        </Link>
        <Link className="quiet-link text-ink/70" href="/">
          Back to home
        </Link>
      </header>

      <section className="mx-auto max-w-[1180px] px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm text-ink/55">Membership application</p>
            <h1 className="mt-3 max-w-xl text-5xl leading-[1.02] sm:text-6xl">
              Join the room where deep work becomes momentum.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">
              Z Labs reviews each application manually for intellectual depth,
              contribution potential, and fit with the Bay Area ecosystem.
            </p>
            <div className="mt-8 border-t border-ink/10 pt-5 text-sm leading-6 text-ink/55">
              Applications are private. Airtable receives only the information
              you submit here.
            </div>
          </div>
          <div className="rounded-md border border-ink/10 bg-white p-4 sm:p-6">
            <Suspense fallback={<p className="text-sm text-ink/55">Loading form...</p>}>
              <ApplicationForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
