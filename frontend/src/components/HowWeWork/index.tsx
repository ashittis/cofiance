import { Section } from "@/components/ui/Section";
import { HeroRow } from "./HeroRow";
import { TimelineRail } from "./TimelineRail";
import { StatBar } from "./StatBar";

export function HowWeWork() {
  return (
    <Section className="overflow-hidden py-20">
      <HeroRow />
      <TimelineRail />
      <StatBar />
    </Section>
  );
}
