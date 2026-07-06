#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

// Maintainer self-check, not a proof of agent behavior.
// Snapshot checks validate the current installed skill shape.
// Regression checks compare that shape to a baseline to catch backsliding.

const root = process.cwd();
const baseline = readArg("--baseline") || "main";
const json = process.argv.includes("--json");
const snapshotOnly = process.argv.includes("--snapshot-only");

const FILES = {
  readme: "README.md",
  steady: "skills/steady-coding/SKILL.md",
  image: "skills/codex-image-gen/SKILL.md",
  development: "skills/development-workflows/SKILL.md",
  project: "skills/project-context/SKILL.md",
  discussion: "skills/discussion-workflows/SKILL.md",
  doc: "skills/doc-driven-workflows/SKILL.md",
  grilling: "skills/agent-grilling/SKILL.md",
  parallel: "skills/parallel-lane-orchestration/SKILL.md",
  integration: "skills/integration-review/SKILL.md",
  multi: "skills/multi-agent-orchestration/SKILL.md",
};

function main() {
  const after = loadSnapshot(null);
  const checks = {
    optimized_skill_entries: checkOptimizedSkillEntriesSnapshot(after),
    governance_gates: checkGovernanceGatesSnapshot(after),
    multi_execution_gates: checkMultiExecutionGatesSnapshot(after.multi),
    multi_reference_gates: checkMultiReferenceGates(after.multi),
    adversarial_fixtures: runAdversarialFixtures(after),
    routing_case_coverage: checkRoutingCasesSnapshot(after),
  };
  if (!snapshotOnly) {
    const before = loadSnapshot(baseline);
    Object.assign(checks, {
      multi_agent_orchestration: compareMulti(before.multi, after.multi),
      readme_routing: compareReadme(before.readme, after.readme),
      agent_grilling_boundary: compareGrilling(before.grilling, after.grilling),
      remaining_boundary_docs: compareRemainingBoundaries(before, after),
      stable_skills_unchanged: compareStableSkills(before, after),
    });
  }
  const result = {
    baseline,
    mode: snapshotOnly ? "snapshot-only" : "snapshot-plus-regression",
    checks,
  };
  result.summary = summarize(result.checks);
  if (json) console.log(JSON.stringify(result, null, 2));
  else printHuman(result);
  if (!result.summary.pass) process.exit(1);
}

function loadSnapshot(ref) {
  return Object.fromEntries(Object.entries(FILES).map(([key, path]) => [
    key,
    ref ? gitShow(ref, path) : readFileSync(`${root}/${path}`, "utf8"),
  ]));
}

function compareMulti(before, after) {
  const b = scoreMulti(before);
  const a = scoreMulti(after);
  const reduction = percentReduction(b.lines, a.lines);
  return {
    before: b,
    after: a,
    line_reduction_percent: reduction,
    pass: a.score > b.score && reduction >= 45 && a.references_complete && a.critical_gates_present,
  };
}

function scoreMulti(text) {
  const refs = [
    "lifecycle-intensity.md",
    "workflow-integration.md",
    "capability-cache.md",
    "external-agent-sessions.md",
    "task-packets.md",
    "output-normalization.md",
    "artifact-layout.md",
    "review-convergence.md",
  ];
  const gates = [
    /explicitly asks/i,
    /Do not use/i,
    /parallel-lane-orchestration/,
    /agent-grilling/,
    /external agents?/i,
    /ask the user/i,
    /fresh .*evidence/i,
    /Treat every agent output as a claim/i,
    /## Minimum Execution Gates/,
    /blind\/source-first/i,
    /bounded packet/i,
    /Stop by evidence, not round count/i,
  ];
  const signals = [
    /## Quick Decision/,
    /## First Move/,
    /## Intensity Ladder/,
    /## Runtime Capability Contract/,
    /## Moderator Rules/,
    /## Reference Routing/,
  ];
  const lines = lineCount(text);
  const score = [
    lines <= 220,
    ...signals.map((pattern) => pattern.test(text)),
    refs.every((ref) => text.includes(ref)),
    gates.every((pattern) => pattern.test(text)),
  ].filter(Boolean).length;
  return {
    lines,
    approx_tokens: approxTokens(text),
    score,
    compact_entry: lines <= 220,
    first_screen_decision: signals.slice(0, 4).every((pattern) => pattern.test(text)),
    references_complete: refs.every((ref) => text.includes(ref)),
    critical_gates_present: gates.every((pattern) => pattern.test(text)),
  };
}

function compareReadme(before, after) {
  const b = scoreReadme(before);
  const a = scoreReadme(after);
  return {
    before: b,
    after: a,
    pass: a.score > b.score && a.routing_guide_complete,
  };
}

function scoreReadme(text) {
  const routePairs = [
    ["project-context", "source-of-truth"],
    ["discussion-workflows", "agent-grilling"],
    ["parallel-lane-orchestration", "multi-agent-orchestration"],
    ["doc-driven-workflows", "docs exist"],
    ["integration-review", "worker summaries"],
  ];
  const ambiguousPhrases = [
    "先问透",
    "先复盘",
    "先恢复上下文",
    "Use two agents in parallel",
    "The lanes came back",
  ];
  const routingGuide = /## Routing Guide/.test(text);
  const pairHits = routePairs.filter(([a, b]) => text.includes(a) && text.includes(b)).length;
  const ambiguousHits = ambiguousPhrases.filter((phrase) => text.includes(phrase)).length;
  return {
    lines: lineCount(text),
    approx_tokens: approxTokens(text),
    score: Number(routingGuide) + pairHits + ambiguousHits,
    routing_guide_complete: routingGuide && pairHits === routePairs.length && ambiguousHits === ambiguousPhrases.length,
  };
}

function compareGrilling(before, after) {
  const b = scoreGrilling(before);
  const a = scoreGrilling(after);
  return {
    before: b,
    after: a,
    pass: a.score > b.score && a.boundary_with_discussion,
  };
}

function compareRemainingBoundaries(before, after) {
  const b = scoreRemainingBoundaries(before);
  const a = scoreRemainingBoundaries(after);
  return {
    before: b,
    after: a,
    pass: a.score > b.score && a.project_boundary && a.discussion_boundary && a.development_boundary,
  };
}

function compareOptimizedSkillEntries(before, after) {
  const b = scoreOptimizedSkillEntries(before);
  const a = scoreOptimizedSkillEntries(after);
  return {
    before: b,
    after: a,
    pass: a.score > b.score && a.all_skills_covered,
  };
}

function checkOptimizedSkillEntriesSnapshot(snapshot) {
  const a = scoreOptimizedSkillEntries(snapshot);
  return { after: a, pass: a.all_skills_covered };
}

function scoreOptimizedSkillEntries(snapshot) {
  const specs = {
    development: [
      /## Quick Decision/,
      /workflow owner or sequence/i,
      /leaf owner is already obvious/i,
      /multi-agent-orchestration/,
    ],
    project: [
      /## Boundary/,
      /preflight or state-recovery gate/i,
      /not as the owner/i,
      /route onward/i,
    ],
    discussion: [
      /## Boundary/,
      /不负责 project state recovery/,
      /先复盘/,
      /先问透/,
    ],
    doc: [
      /## Quick Decision/,
      /doc-driven source of truth/i,
      /Do not use it for/i,
      /docs that merely exist/i,
    ],
    grilling: [
      /Formulation pressure-test/i,
      /Boundary with `discussion-workflows`/,
      /before a decision exists/i,
    ],
    parallel: [
      /## Quick Decision/,
      /two or more independent/i,
      /Do not use it for/i,
      /Spec\/Eval/,
    ],
    integration: [
      /## Quick Decision/,
      /parallel-lane batch has returned/i,
      /Do not use it for/i,
      /ready-to-merge/,
    ],
    multi: [
      /## Quick Decision/,
      /## Intensity Ladder/,
      /## Runtime Capability Contract/,
      /## Minimum Execution Gates/,
      /## Reference Routing/,
    ],
  };
  const perSkill = Object.fromEntries(Object.entries(specs).map(([name, patterns]) => {
    const hits = patterns.filter((pattern) => pattern.test(snapshot[name])).length;
    return [name, { hits, required: patterns.length, pass: hits === patterns.length }];
  }));
  return {
    score: Object.values(perSkill).reduce((sum, item) => sum + item.hits, 0),
    total: Object.values(perSkill).reduce((sum, item) => sum + item.required, 0),
    all_skills_covered: Object.values(perSkill).every((item) => item.pass),
    per_skill: perSkill,
  };
}

function compareStableSkills(before, after) {
  const stable = ["steady", "image"];
  const unchanged = stable.filter((key) => before[key] === after[key]);
  return {
    before: { unchanged: stable.length, total: stable.length },
    after: {
      unchanged: unchanged.length,
      total: stable.length,
      unchanged_skills: unchanged,
      changed_skills: stable.filter((key) => !unchanged.includes(key)),
    },
    pass: unchanged.length === stable.length,
  };
}

function compareMultiExecutionGates(before, after) {
  const b = scoreMultiExecutionGates(before);
  const a = scoreMultiExecutionGates(after);
  return {
    before: b,
    after: a,
    pass: a.score > b.score && a.all_gates_present,
  };
}

function checkMultiExecutionGatesSnapshot(text) {
  const a = scoreMultiExecutionGates(text);
  return { after: a, pass: a.all_gates_present };
}

function scoreMultiExecutionGates(text) {
  const gates = {
    phase_reference_required: /Before dispatch or final claims, read the reference that owns the active phase/i,
    blind_same_artifact_review: /same whole artifact blind\/source-first/i,
    adversarial_convergence: /run an adversarial convergence round before repair or final acceptance/i,
    bounded_packet: /Every delegated task needs a bounded packet/i,
    session_identity: /Preserve reviewer or external-agent session identity/i,
    stop_by_evidence: /Stop by evidence, not round count/i,
    user_decision_pacing: /Ask one user decision at a time/i,
    parent_workflow_owner: /Maintain one active parent workflow/i,
    in_progress_continuation: /If status is `in_progress`, continue/i,
  };
  const checks = Object.fromEntries(Object.entries(gates).map(([key, pattern]) => [key, pattern.test(text)]));
  return {
    score: Object.values(checks).filter(Boolean).length,
    total: Object.keys(checks).length,
    all_gates_present: Object.values(checks).every(Boolean),
    checks,
  };
}

function compareGovernanceGates(before, after) {
  const b = scoreGovernanceGates(before);
  const a = scoreGovernanceGates(after);
  return {
    before: b,
    after: a,
    pass: a.score > b.score && a.all_skills_covered,
  };
}

function checkGovernanceGatesSnapshot(snapshot) {
  const a = scoreGovernanceGates(snapshot);
  return { after: a, pass: a.all_skills_covered };
}

function scoreGovernanceGates(snapshot) {
  const specs = {
    development: {
      law: /ROUTE TO THE OWNER; DO NOT IMPERSONATE THE OWNER/,
      specific: [/focused skill owns the next action/i, /from this router alone/i],
      redFlags: [/from this router alone/i, /internal workflow sequencing/i, /task feels large/i],
    },
    project: {
      law: /NO STATE-GOVERNED PLANNING FROM MEMORY/,
      specific: [/recover current source state/i, /current state packet/i],
      redFlags: [/current state packet/i, /authoritative without checking source files/i, /every doc in the repo/i],
    },
    discussion: {
      law: /不要把未标记状态的讨论结论当成 confirmed/,
      specific: [/confirmed \/ draft \/ open/, /canonical boundary/],
      redFlags: [/继续新增方案/, /进入实现、派工或合并/, /draft\/open 写成 confirmed/],
    },
    doc: {
      law: /NO DOC SYNC WITHOUT AN INVOCATION GATE AND SOURCE EVIDENCE/,
      specific: [/invocation gate/i, /open-question ledger/i],
      redFlags: [/docs are absent/i, /code task touched any file/i, /source anchors/i],
    },
    grilling: {
      law: /NO USER QUESTION UNTIL AGENT-ANSWERABLE QUESTIONS ARE EXHAUSTED/,
      specific: [/true user decisions/i, /high-impact agent-answerable questions/i],
      redFlags: [/broad brainstorming questions/i, /implementation lanes/i, /agent disagreement/i],
    },
    parallel: {
      law: /NO LANE DISPATCH WITHOUT OWNED SURFACES AND A COLLISION CHECK/,
      specific: [/owned scope/i, /first safe batch/i],
      redFlags: [/all possible.*lanes/i, /high-collision files/i, /next batch before returned lanes/i],
    },
    integration: {
      law: /NO ACCEPTED LANE WITHOUT DIFF AND EVIDENCE REVIEW/,
      specific: [/actual changed surfaces/i, /worker's narrative alone/i],
      redFlags: [/worker's narrative alone/i, /stale, missing, partial, or blocked verification/i, /outside the lane's owned scope/i],
    },
    multi: {
      law: /MULTI-AGENT OUTPUT IS EVIDENCE INPUT, NOT A CONCLUSION/,
      specific: [/Agreement is a signal/i, /moderator-inspected evidence/i],
      redFlags: [/task is large or uncertain/i, /reviewer consensus as proof/i, /required convergence round/i],
    },
  };
  const perSkill = Object.fromEntries(Object.entries(specs).map(([key, spec]) => {
    const text = snapshot[key];
    const ironLaw = extractSection(text, "Iron Law");
    const redFlags = extractSection(text, "Red Flags");
    const checks = {
      has_iron_law_section: ironLaw.length > 0,
      law_matches_skill: spec.law.test(ironLaw),
      law_has_actionable_gate: /without|until|before|only|must|must not|do not|不能|必须|先|没有|不得/i.test(ironLaw),
      red_flags_minimum: countRedFlags(redFlags) >= 5,
      red_flags_match_skill: spec.redFlags.every((pattern) => pattern.test(redFlags)),
      skill_specific_governance: spec.specific.every((pattern) => pattern.test(text)),
    };
    const hits = Object.values(checks).filter(Boolean).length;
    return [key, { hits, required: Object.keys(checks).length, pass: hits === Object.keys(checks).length, checks }];
  }));
  return {
    score: Object.values(perSkill).reduce((sum, item) => sum + item.hits, 0),
    total: Object.values(perSkill).reduce((sum, item) => sum + item.required, 0),
    all_skills_covered: Object.values(perSkill).every((item) => item.pass),
    per_skill: perSkill,
  };
}

function checkMultiReferenceGates(multiText) {
  const refs = [
    "lifecycle-intensity.md",
    "workflow-integration.md",
    "capability-cache.md",
    "external-agent-sessions.md",
    "task-packets.md",
    "output-normalization.md",
    "review-convergence.md",
    "artifact-layout.md",
  ];
  const stopPauseRequired = new Set([
    "lifecycle-intensity.md",
    "external-agent-sessions.md",
    "task-packets.md",
    "output-normalization.md",
    "review-convergence.md",
    "artifact-layout.md",
  ]);
  const perRef = Object.fromEntries(refs.map((ref) => {
    const path = `${root}/skills/multi-agent-orchestration/references/${ref}`;
    const exists = multiText.includes(ref) && existsSync(path);
    const text = exists ? readFileSync(path, "utf8") : "";
    const checks = {
      linked_from_skill: multiText.includes(ref),
      file_exists: existsSync(path),
      has_evidence_rule: /evidence/i.test(text),
      has_required_stop_or_pause_rule: !stopPauseRequired.has(ref) || /stop|pause|blocked|complete/i.test(text),
    };
    const hits = Object.values(checks).filter(Boolean).length;
    return [ref, { hits, required: Object.keys(checks).length, pass: hits === Object.keys(checks).length, checks }];
  }));
  return {
    before: { score: 0, total: refs.length * 4 },
    after: {
      score: Object.values(perRef).reduce((sum, item) => sum + item.hits, 0),
      total: Object.values(perRef).reduce((sum, item) => sum + item.required, 0),
      references_checked: refs,
      per_ref: perRef,
    },
    pass: Object.values(perRef).every((item) => item.pass),
  };
}

function runAdversarialFixtures(snapshot) {
  const hollowMulti = [
    "---",
    "name: multi-agent-orchestration",
    "description: Use when explicitly asks for multi-agent work.",
    "---",
    "# Multi-Agent Orchestration",
    "## Quick Decision",
    "Do not use. Use parallel-lane-orchestration and agent-grilling.",
    "## First Move",
    "Ask the user and mention external agents.",
    "## Intensity Ladder",
    "Level 0. Level 1. Level 2.",
    "## Runtime Capability Contract",
    "present does not mean runnable.",
    "## Moderator Rules",
    "Use fresh evidence and claim words.",
    "## Reference Routing",
    "lifecycle-intensity.md workflow-integration.md capability-cache.md external-agent-sessions.md task-packets.md output-normalization.md artifact-layout.md review-convergence.md",
  ].join("\n");
  const hollowGovernance = {
    ...snapshot,
    integration: [
      "# Integration Review",
      "## Iron Law",
      "NO ACCEPTED LANE WITHOUT DIFF AND EVIDENCE REVIEW.",
      "## Red Flags",
      "- filler one",
      "- filler two",
      "- filler three",
      "- filler four",
      "- filler five",
      "actual changed surfaces",
      "worker's narrative alone",
    ].join("\n"),
  };
  const readmeWithLooseWords = [
    "# x",
    "## Routing Guide",
    "project-context source-of-truth discussion-workflows agent-grilling parallel-lane-orchestration multi-agent-orchestration doc-driven-workflows docs exist integration-review worker summaries",
    "先问透 先复盘 先恢复上下文 Use two agents in parallel The lanes came back",
  ].join("\n");
  const checks = {
    hollow_multi_rejected_by_execution_gates: !scoreMultiExecutionGates(hollowMulti).all_gates_present,
    hollow_multi_rejected_by_entry_score: !scoreMulti(hollowMulti).critical_gates_present || scoreMulti(hollowMulti).score < 9,
    hollow_governance_rejected: !scoreGovernanceGates(hollowGovernance).all_skills_covered,
    loose_readme_rejected_by_routing_cases: !scoreRoutingCases({ ...snapshot, readme: readmeWithLooseWords }).all_cases_covered,
  };
  return {
    before: { score: 0, total: Object.keys(checks).length },
    after: {
      score: Object.values(checks).filter(Boolean).length,
      total: Object.keys(checks).length,
      checks,
    },
    pass: Object.values(checks).every(Boolean),
  };
}

function scoreRemainingBoundaries(snapshot) {
  const projectSignals = [
    /preflight or state-recovery gate/i,
    /not as the owner/i,
    /then route to/i,
  ];
  const discussionSignals = [
    /不负责 project state recovery/,
    /先恢复上下文/,
    /先复盘/,
    /先问透/,
    /lane 回来了/,
  ];
  const developmentSignals = [
    /leaf skill trigger is already obvious/i,
    /use that focused skill directly/i,
  ];
  const projectHits = projectSignals.filter((pattern) => pattern.test(snapshot.project)).length;
  const discussionHits = discussionSignals.filter((pattern) => pattern.test(snapshot.discussion)).length;
  const developmentHits = developmentSignals.filter((pattern) => pattern.test(snapshot.development)).length;
  return {
    score: projectHits + discussionHits + developmentHits,
    project_boundary: projectHits === projectSignals.length,
    discussion_boundary: discussionHits === discussionSignals.length,
    development_boundary: developmentHits === developmentSignals.length,
  };
}

function compareRoutingCases(before, after) {
  const b = scoreRoutingCases(before);
  const a = scoreRoutingCases(after);
  return {
    before: b,
    after: a,
    pass: a.score > b.score && a.all_cases_covered,
  };
}

function checkRoutingCasesSnapshot(snapshot) {
  const a = scoreRoutingCases(snapshot);
  return { after: a, pass: a.all_cases_covered };
}

function scoreRoutingCases(snapshot) {
  const routingTexts = {
    readme: snapshot.readme,
    multi: snapshot.multi,
    grilling: snapshot.grilling,
    project: snapshot.project,
    discussion: snapshot.discussion,
    development: snapshot.development,
    doc: snapshot.doc,
    parallel: snapshot.parallel,
    integration: snapshot.integration,
  };
  const cases = [
    { phrase: "先恢复上下文", owner: "project-context" },
    { phrase: "continue from handoff", owner: "project-context" },
    { phrase: "先复盘", owner: "discussion-workflows" },
    { phrase: "先问透", owner: "agent-grilling" },
    { phrase: "docs may drift", owner: "doc-driven-workflows" },
    { phrase: "code/docs synchronization", owner: "doc-driven-workflows" },
    { phrase: "lane 回来了", owner: "integration-review" },
    { phrase: "returned lane review", owner: "integration-review" },
    { phrase: "clear independent lane dispatch", owner: "parallel-lane-orchestration" },
    { phrase: "Use two agents in parallel", owner: "parallel-lane-orchestration" },
    { phrase: "fresh eyes", owner: "multi-agent-orchestration" },
    { phrase: "one reviewer", owner: "multi-agent-orchestration" },
    { phrase: "workflow owner", owner: "development-workflows" },
    { phrase: "Spec/Eval", owner: "multi-agent-orchestration" },
  ];
  const covered = cases.filter(({ phrase, owner }) => routingCaseCovered(routingTexts, phrase, owner));
  const missing = cases.filter(({ phrase, owner }) => !routingCaseCovered(routingTexts, phrase, owner));
  return {
    score: covered.length,
    total_cases: cases.length,
    covered_cases: covered,
    missing_cases: missing,
    all_cases_covered: covered.length === cases.length,
  };
}

function routingCaseCovered(sources, phrase, owner) {
  return Object.values(sources).some((text) => nearbyInText(text, phrase, owner, 420));
}

function nearbyInText(text, phrase, owner, windowSize) {
  const lines = text.split(/\r?\n/);
  if (lines.some((line) => line.includes(phrase) && line.includes(owner))) return true;

  let index = text.indexOf(phrase);
  while (index >= 0) {
    const start = Math.max(0, index - windowSize);
    const end = Math.min(text.length, index + phrase.length + windowSize);
    if (text.slice(start, end).includes(owner)) return true;
    index = text.indexOf(phrase, index + phrase.length);
  }
  return false;
}

function extractSection(text, heading) {
  const pattern = new RegExp(`^## ${escapeRegExp(heading)}\\s*$`, "m");
  const match = pattern.exec(text);
  if (!match) return "";
  const rest = text.slice(match.index + match[0].length);
  const next = rest.search(/^## /m);
  return next >= 0 ? rest.slice(0, next) : rest;
}

function countRedFlags(section) {
  return section
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- ") || (/^[^`#].{12,}$/.test(line) && !line.endsWith(":")))
    .length;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function scoreGrilling(text) {
  const signals = [
    /Formulation pressure-test/i,
    /Boundary with `discussion-workflows`/,
    /before a decision exists/i,
    /recap, compare, clarify, or persist decisions/i,
  ];
  return {
    lines: lineCount(text),
    approx_tokens: approxTokens(text),
    score: signals.filter((pattern) => pattern.test(text)).length,
    boundary_with_discussion: signals.slice(1).every((pattern) => pattern.test(text)),
  };
}

function summarize(checks) {
  const pass = Object.values(checks).every((check) => check.pass);
  return {
    pass,
    total_checks: Object.keys(checks).length,
    passed_checks: Object.values(checks).filter((check) => check.pass).length,
  };
}

function printHuman(result) {
  const target =
    result.mode === "snapshot-only"
      ? "current snapshot"
      : `against ${result.baseline}`;
  console.log(`Skill entry evaluation (${result.mode}) ${target}`);
  for (const [name, check] of Object.entries(result.checks)) {
    console.log(`\n${name}: ${check.pass ? "PASS" : "FAIL"}`);
    if (check.before?.lines !== undefined) {
      console.log(`  lines: ${check.before.lines} -> ${check.after.lines}`);
      console.log(`  approx tokens: ${check.before.approx_tokens} -> ${check.after.approx_tokens}`);
    }
    if (check.line_reduction_percent !== undefined) {
      console.log(`  line reduction: ${check.line_reduction_percent}%`);
    }
    if (check.before?.score !== undefined) {
      console.log(`  score: ${check.before.score} -> ${check.after.score}`);
    }
    if (check.after?.covered_cases) {
      for (const item of check.after.covered_cases) {
        console.log(`  covered: ${item.phrase} -> ${item.owner}`);
      }
      for (const item of check.after.missing_cases) {
        console.log(`  missing: ${item.phrase} -> ${item.owner}`);
      }
    }
    if (check.after?.per_skill) {
      for (const [skill, item] of Object.entries(check.after.per_skill)) {
        console.log(`  ${item.pass ? "covered" : "missing"}: ${skill} ${item.hits}/${item.required}`);
      }
    }
    if (check.after?.unchanged_skills) {
      console.log(`  unchanged skills: ${check.after.unchanged_skills.join(", ")}`);
      if (check.after.changed_skills.length) console.log(`  changed skills: ${check.after.changed_skills.join(", ")}`);
    }
  }
  console.log(`\nSummary: ${result.summary.passed_checks}/${result.summary.total_checks} checks passed`);
}

function gitShow(ref, path) {
  return execFileSync("git", ["show", `${ref}:${path}`], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function readArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function lineCount(text) {
  return text.split(/\r?\n/).length - (text.endsWith("\n") ? 1 : 0);
}

function approxTokens(text) {
  return Math.ceil(text.length / 4);
}

function percentReduction(before, after) {
  return Math.round(((before - after) / before) * 1000) / 10;
}

main();
