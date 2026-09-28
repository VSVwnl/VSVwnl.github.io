import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { branches } from "../data/skilltree.js";
import { bySlug } from "../data/projects.js";

export default function SkillTree() {
  const [branchId, setBranchId] = useState(branches[0].id);
  const [skillId, setSkillId] = useState(branches[0].skills[0].id);
  const branch = branches.find((b) => b.id === branchId);
  const skill = branch.skills.find((s) => s.id === skillId) ?? branch.skills[0];
  return (
    <div className="skill-map">
      <div className="skill-root">
        <span className="skill-root-dot" aria-hidden="true" />
        <span>Interactive software</span>
        <span className="eyebrow">A map of demonstrated work</span>
      </div>
      <div className="skill-columns">
        <div className="skill-branches" role="group" aria-label="Skill areas">
          {branches.map((b, i) => (
            <button
              type="button"
              key={b.id}
              aria-pressed={b.id === branchId}
              aria-controls="skill-options"
              onClick={() => {
                setBranchId(b.id);
                setSkillId(b.skills[0].id);
              }}
            >
              <span className="eyebrow">0{i + 1}</span>
              {b.label}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          id="skill-options"
          className="skill-options"
          role="group"
          aria-label={branch.label}
        >
          <p className="eyebrow">Choose a skill</p>
          {branch.skills.map((s) => (
            <button
              type="button"
              key={s.id}
              aria-pressed={s.id === skill.id}
              aria-controls="skill-evidence"
              onClick={() => setSkillId(s.id)}
            >
              {s.label}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div
          id="skill-evidence"
          className="skill-evidence"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="eyebrow">In practice</p>
          <h3>{skill.label}</h3>
          <p>{skill.use}</p>
          <ul>
            {skill.projects.map((slug) => {
              const p = bySlug(slug);
              return (
                p && (
                  <li key={slug}>
                    <a
                      className="text-link"
                      href={
                        p.featured ? `/work/${p.slug}/` : `/work/#${p.slug}`
                      }
                    >
                      {p.title}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
