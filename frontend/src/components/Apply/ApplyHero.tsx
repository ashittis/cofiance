import { Section } from "@/components/ui/Section";
import { ApplyLeft } from "./ApplyLeft";
import { ApplyForm } from "./ApplyForm";

export function ApplyHero() {
  return (
    <Section className="py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ApplyLeft />
        <div className="flex justify-center lg:justify-end">
          <ApplyForm />
        </div>
      </div>
    </Section>
  );
}
