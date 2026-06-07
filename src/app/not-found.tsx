import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MotifMark } from "@/components/MotifDivider";

export default function NotFound() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="flex flex-col items-center gap-6 py-24 text-center sm:py-32">
        <MotifMark size={56} color="var(--color-gold)" />
        <span className="eyebrow text-rani">Page not found</span>
        <h1 className="text-4xl leading-tight sm:text-5xl">This one has wandered off.</h1>
        <p className="max-w-md text-lg leading-relaxed text-ink-soft">
          The page you&apos;re after isn&apos;t here, but there are plenty of
          one-of-a-kind pieces waiting to be found.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/shop" variant="primary">Explore the pieces</Button>
          <Button href="/" variant="ghost">Back home →</Button>
        </div>
      </Container>
    </main>
  );
}
