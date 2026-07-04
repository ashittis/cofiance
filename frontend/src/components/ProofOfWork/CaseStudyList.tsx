"use client";

import { useState } from "react";
import { caseStudies } from "./data";
import { CaseStudyRow } from "./CaseStudyRow";

export function CaseStudyList() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#efefef]">
      {caseStudies.map((cs) => (
        <CaseStudyRow
          key={cs.id}
          cs={cs}
          open={openId === cs.id}
          onToggle={() => setOpenId((prev) => (prev === cs.id ? null : cs.id))}
        />
      ))}
    </div>
  );
}
