import { Section } from "@/components/ui/Section";
import { ContactLeft } from "./ContactLeft";
import { EnquiryForm } from "./EnquiryForm";

export function ContactHero() {
  return (
    <Section className="py-16 lg:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <ContactLeft />
        <div className="flex justify-center lg:justify-end">
          <EnquiryForm />
        </div>
      </div>
    </Section>
  );
}
