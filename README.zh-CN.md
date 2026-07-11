# xzhih skills

[English](README.md) | [简体中文](README.zh-CN.md)

用于通过 `npx skills` 安装的个人 Codex/agent skills。

## 安装

列出可安装的 skills：

```sh
npx skills add xzhih/skills --list
```

安装全部 skills：

```sh
npx skills add xzhih/skills --all
```

安装推荐 workflow 集合，包括入口 skills 和必需的内部依赖：

```sh
npx skills add xzhih/skills --skill steady-coding codex-image-gen dev-flow discussion-workflows doc-driven-workflows agent-self-driving agent-runtime agent-requirements-analysis agent-spec agent-eval agent-plan agent-debate agent-review agent-lanes agent-grilling integration-review project-context
```

## Skills

用户入口 skills：

- `steady-coding`：稳定、扎实地完成实现、调试、重构、验证和可审查的代码修改。
- `codex-image-gen`：通过 Responses API 的 `image_generation` 工具生成或编辑图片，并自动检测认证方式（API key / Codex custom provider / ChatGPT 登录）。
- `dev-flow`：显式的开发生命周期路由器，用于需求、Spec、Eval、Plan、执行、review/test、repair/recheck、上下文恢复、文档、lane 和更重的多 agent 工作流。
- `discussion-workflows`：显式的讨论治理入口，用于长讨论、被纠正过的讨论、决策密集讨论的复盘、边界、复杂度、漂移控制和持久化状态。
- `doc-driven-workflows`：显式的项目文档治理入口，用于 source-backed 架构文档、operation-flow、call-path、代码/文档同步和 open-question ledger。
- `agent-self-driving`：显式的长任务自动化控制器，用于新项目、新需求、MVP 交付、模型多样化 review/repair、外部 agent 和需要持续推进到完成或真正用户决策的多 agent 交付。
- `agent-requirements-analysis`：显式的需求分析入口，先锚定核心问题并扩展可遍历候选树，再通过对抗做需求收敛与范围剪枝，最终在 Spec 前发布带 Mermaid 的 Requirements Baseline。
- `agent-spec`：显式的 Spec 产物入口，用于从治理过的需求生成可实现 Spec。
- `agent-eval`：显式的 Eval 产物入口，用于从锁定 Spec 生成验收标准和证据要求。
- `agent-plan`：显式的 Plan 产物入口，用于从锁定 Spec + Eval 生成实施任务、拆分和 lane 候选。
- `agent-debate`：显式调用的同题多 agent 辩论，用于需求、产品摩擦、简单性、必要性、可用性、用户流程，以及按分支进行精简的需求收敛与范围剪枝。
- `agent-review`：显式调用的单 reviewer 或多 agent 同 artifact 审查，用于 Spec、Eval、plan、design、PR、diff、实现、证据包或最终结果。
- `agent-lanes`：显式的并行 lane 执行，用于安全批次的 subagent/worktree 工作。

内部流程 skills：

- `project-context`：恢复权威项目指令、handoff 文档、coordination 状态、决策、验证约定和冲突风险。
- `agent-runtime`：内部 agent/model runtime 规则；记录放在 `docs/dev-flow/capabilities/`。
- `agent-grilling`：在 Requirements、Spec、计划或分发前，通过持续追问和挑战主动挖掘尚未想到的需求、假设、边界、边缘情况和连带影响；拷问是深挖手段，不是压力测试关卡。
- `integration-review`：审查返回的 lanes，归一化声明，检查证据，分类 integration
  状态，并把下一批 eligibility 返回给 `agent-lanes`。

`agent-self-driving` 可以调用内部流程 skills，但在显式调用长任务自动化时也是直接入口。

## 产品侧 vs 实施侧

Workflow skills 按职责分成两条线，用交接产物串起来（需求 → Spec → Eval →
Plan → 代码/证据）。这不是两套安装包，而是两类工作：产品判断与交付执行分开，
避免混在一个 skill 里。

```text
产品线（做什么 / 为什么 / 怎样算好）
  讨论、grilling、debate、requirements、Spec、Eval、长期文档

实施线（怎么做 / 谁改哪里 / 改得是否够好）
  Plan、lanes、编码、收回集成、模块/代码 review

控制面（路由、续跑、多 agent 运行时）
  dev-flow、agent-self-driving、project-context、agent-runtime

共享审查器（不是第三套产品哲学）
  agent-review — Spec/Plan 合同与模块 diff 共用同一工具
```

| 问题类型 | 侧 | 典型 skills |
| --- | --- | --- |
| 要不要做、范围、行为、取舍、是否过重？ | 产品 | `discussion-workflows`、`agent-grilling`、`agent-debate`、`agent-requirements-analysis`、`agent-spec`、`agent-eval`、`doc-driven-workflows` |
| 任务怎么拆、文件/接口、并行、模块质量、能否合入？ | 实施 | `agent-plan`、`agent-lanes`、`steady-coding`、`integration-review`，以及对 diff/代码的 `agent-review` |
| 下一阶段是谁、从 Spec 续跑、长任务闭环？ | 控制 | `dev-flow`、`agent-self-driving`、`project-context`、`agent-runtime` |

**产品线** 负责意图、边界、用户可见行为，以及如何证明正确。产出是给人决策、
给下游当合同的内容，而不是文件级改动清单。

**实施线** 负责拆分、owned surfaces、执行，以及对照合同做验证。产出是任务、
diff、测试、证据和 merge/lane 状态。

**`agent-review`** 是对「一份具体 artifact」的共享关卡：Spec、Eval、Plan、PR、
模块 diff、实现切片或最终包都可以审。它不是 `agent-debate`（产品取舍），也不是
`integration-review`（lane 返回后的批次状态）。Spec 与 Plan 在进入 Eval 或
执行/lanes 之前，默认必须各做一轮 `agent-review`，除非用户显式放弃。

**深挖、收敛与基线可以组合（产品）：** `agent-grilling` 返回候选增量与修改；
`agent-requirements-analysis` 负责组装并版本化完整候选需求集；`agent-debate` 对同一候选集
做对抗，为每个分支给出 `keep`、`modify`、`cut`、`defer` 或 `user-decision`；
`agent-requirements-analysis` 负责精简剪枝账本和最终 Requirements
Baseline。非平凡分析记录已通过的 gate evidence，并在需要时消费当前同范围的深挖与收敛
snapshot，避免重复。需求树、取舍图
和功能流程用 Mermaid 做简略全局视图；Markdown 保存详细需求、证据、原因、约束和重开
条件。最终行为树和功能包只呈现 Core Version；想过但剪掉的内容在取舍图与精简账本中
分别承担“看全局”和“记原因”的职责。阻塞性决策会暂停交接。
**自动驾驶** 可从已到达的任意阶段启动（例如已有 Spec），只跑剩余交付，无故不应倒退
重做产品阶段。

## 开发生命周期

对于非平凡开发任务，`dev-flow` 默认使用这条生命周期作为控制主线：

```text
1. 分析需求
2. 锁定 Spec
3. 锁定 Eval
4. 锁定 Plan
5. 执行 Plan
6. Review + Test
7. Repair + Recheck
8. Close / Handoff
```

每个阶段都有退出条件：

| 阶段 | 退出条件 |
| --- | --- |
| 分析需求 | 核心问题已明确；当前同范围的 `agent-grilling` 深挖与 `agent-debate` 收敛关卡已满足；每个重要候选都有 keep/modify/cut/defer/user-decision 结果；剪枝记录精简；Mermaid 树没有高影响可回答前沿或阻塞决策；仅可实施且已确认的保留流程进入功能包；产物已成为 Requirements Baseline。 |
| 锁定 Spec | 目标、范围、非目标、用户可见行为、约束和影响面清楚；整份 Spec 的强制 `agent-review` 已关闭（或用户放弃）后再进 Eval。 |
| 锁定 Eval | 验收检查、测试点、人工检查点、失败条件和证据要求说明了如何证明正确。 |
| 锁定 Plan | 执行顺序、涉及文件/模块、风险、验证命令、lane 候选、停止或回滚条件明确；整份 Plan 的强制 `agent-review` 已关闭（或用户放弃）后再执行或开 lanes。 |
| 执行 Plan | 变更保持在 plan 边界内，并留下“改了什么/没改什么”的证据。 |
| Review + Test | 实现按 Spec 和 Eval 检查，并有可查看的测试或人工验证证据。 |
| Repair + Recheck | 已接受的 blocker/major 被修复并复查、以证据拒绝，或因真正的用户决策/必需依赖不可用而保持 paused。只有 minor、out-of-scope 或 future item 在 owner artifact 与 trace 更新后才可延期。 |
| Close / Handoff | 最终状态、证据、残留风险、文档影响和下一 owner 清楚。 |

对于持久化、高风险或多 agent 工作，生命周期保留覆盖链：

```text
需求 -> Spec 行为 -> Eval 证据 -> Plan 任务 -> evidence
```

这条链用于防止执行时漏需求：`agent-plan` 必须让任务覆盖可追溯到需求和证据；
`agent-lanes` 必须把这条 trace 放进 lane packet；`integration-review` 必须检查每个
非延期 trace item 是否有证据、blocker 或明确 deferral。

可执行任务用 checkbox 管进度：

```text
- [ ] 未开始
- [x] 已完成且有证据
- [!] blocked 或需要修复
- [-] 已延期且有原因
```

Checkbox 只表示任务状态；coverage trace 说明任务为什么存在，以及什么证据能关闭它。

按任务规模控制流程重量：

```text
小任务：
  一句话需求 -> 紧凑的行为/证据合同 -> 实现 -> 验证

中任务：
  在推理或简短记录里分开需求、Spec、Eval、Plan；整份 Spec 与 Plan 的强制
  review 保持紧凑

大任务：
  明确产出需求分析、Spec、Eval、Plan；完成整份 Spec 与 Plan 的强制 review，
  其他 gate 仅在风险需要时增加 review

高风险任务：
  review 需求、Spec、Eval、Plan、实现和最终结果；使用 repair -> recheck
```

Review 不只是最后一步。`agent-spec` 与 `agent-plan` 在进入 Eval 或执行前必须对整份产物做 `agent-review`。Eval、实现模块、diff 或最终结果在风险需要或需要独立视角时，也用 `agent-review`。

文档治理也是生命周期 gate：当锁定的 Spec、已接受的实现或 review finding 会让未来的人或 agent 被 source-of-truth docs 误导时，用 `doc-driven-workflows`。

文档 owner 保持单一：

```text
持久架构 / operation / call-path 真相 -> doc-driven-workflows
Requirements -> docs/dev-flow/requirements/
Spec -> docs/dev-flow/specs/
Eval -> docs/dev-flow/evals/
Plan -> docs/dev-flow/plans/
Evidence / handoff -> docs/dev-flow/evidence/ 和 docs/dev-flow/handoffs/
私有 orchestration 状态 -> agent-self-driving
```

其他 workflow 文档只是 coordination、discussion state、review state、evidence
或指向 owner artifact 的链接，不应该变成第二套项目真相。

## 产出文档

中型、大型、高风险、self-driving、多 agent 或可能跨线程继续的工作，会把生命周期
artifact 落到：

```text
docs/dev-flow/
  index.md
  requirements/
  specs/
  evals/
  plans/
  capabilities/
  evidence/
  handoffs/
  archive/
```

`docs/dev-flow/index.md` 是恢复入口，链接当前 Requirements、Spec、Eval、Plan、
适用的 runtime profile/capability/session 记录、evidence、handoff、当前阶段、状态
和下一 owner。不要在 index 里复制完整 artifact。

默认文件命名：

```text
requirements/<YYYY-MM-DD>-<slug>-requirements.md
specs/<YYYY-MM-DD>-<slug>-spec.md
evals/<YYYY-MM-DD>-<slug>-eval.md
plans/<YYYY-MM-DD>-<slug>-plan.md
evidence/<YYYY-MM-DD>-<slug>-evidence.md
handoffs/<YYYY-MM-DD>-<slug>-handoff.md
```

`agent-self-driving` 的私有自动化状态单独放：

```text
docs/agent-self-driving/
  index.md
  blackboards/
  discussions/
  agent-outputs/
  reviews/
  evidence/
```

它只链接 `docs/dev-flow/` artifacts，不复制它们。

长期项目真相仍然放在 `docs/doc-driven-workflows/` 或声明的 doc-driven root。
讨论状态仍然放在 `docs/discussion-workflows/`。

原始资料和长期真相分开：

```text
docs/discussion-workflows/inbox/  原始资料、外部 API 文档、摘录、链接、调研笔记
docs/doc-driven-workflows/        精炼后的 source-backed 长期项目真相
```

`inbox/` 不是 confirmed truth，也不是直接实现依据。外部接口文档、供应商文档、
agent 原始输出或调研摘录需要先经过 discussion synthesis、references 对照或
confirmed/draft/open 收束，再把项目真正需要长期维护的 contract、operation-flow、
call-path、constraint、risk 或 open question 写入 `doc-driven-workflows`。

归档约定：

```text
docs/dev-flow/archive/              旧 lifecycle artifacts
docs/discussion-workflows/archive/  旧 discussion state
docs/doc-driven-workflows/archive/  旧长期文档和 ledger 批次
docs/agent-self-driving/archive/    旧 orchestration state
```

Archive 文件不是当前真相，必须记录 `Archived`、`Status`、`Reason`、
`Replaced by`，以及为什么不能作为当前真相。正常恢复上下文时跳过 archive，
除非 active artifact 显式链接它，或需要追溯历史。

## 目录结构

```text
skills/
  steady-coding/
  project-context/
  codex-image-gen/
  dev-flow/
  discussion-workflows/
  doc-driven-workflows/
  agent-requirements-analysis/
  agent-spec/
  agent-eval/
  agent-plan/
  agent-grilling/
  agent-debate/
  agent-review/
  agent-lanes/
  agent-runtime/
  integration-review/
  agent-self-driving/
```
