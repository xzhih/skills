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

只安装推荐的用户入口 skills：

```sh
npx skills add xzhih/skills --skill steady-coding codex-image-gen dev-flow discussion-workflows doc-driven-workflows agent-debate agent-review agent-lanes
```

## Skills

用户入口 skills：

- `steady-coding`：稳定、扎实地完成实现、调试、重构、验证和可审查的代码修改。
- `codex-image-gen`：通过 Responses API 的 `image_generation` 工具生成或编辑图片，并自动检测认证方式（API key / Codex custom provider / ChatGPT 登录）。
- `dev-flow`：显式的开发生命周期路由器，用于需求、Spec、Eval、Plan、执行、review/test、repair/recheck、上下文恢复、文档、lane 和更重的多 agent 工作流。
- `discussion-workflows`：显式的讨论治理入口，用于长讨论、被纠正过的讨论、决策密集讨论的复盘、边界、复杂度、漂移控制和持久化状态。
- `doc-driven-workflows`：显式的项目文档治理入口，用于 source-backed 架构文档、operation-flow、call-path、代码/文档同步和 open-question ledger。
- `agent-debate`：显式调用的同题多 agent 辩论，用于需求、产品摩擦、简单性、必要性、可用性、用户流程和决策清晰度。
- `agent-review`：显式调用的同 artifact 多 agent 审查，用于 Spec、Eval、plan、design、PR、diff、实现、证据包或最终结果。
- `agent-lanes`：显式的并行 lane 执行，用于安全批次的 subagent/worktree 工作。

内部流程 skills：

- `project-context`：恢复权威项目指令、handoff 文档、coordination 状态、决策、验证约定和冲突风险。
- `agent-grilling`：在计划或分发前，对不清晰的目标、假设和拆分方式做 agent pressure test。
- `integration-review`：审查返回的 lanes，归一化声明，检查证据，分类 blockers，并在可行时推进下一批安全工作。
- `multi-agent-orchestration`：高级/内部 dispatcher，用于 Spec/Eval、外部 agent、反复 review-repair 和多 agent 收敛。

## 使用地图

直接调用入口 skills。入口 skills 会在流程需要时路由到内部流程 skills。

### 入口 Skills

| Skill | 什么时候用 | 会发生什么 |
| --- | --- | --- |
| `steady-coding` | 目标明确的代码工作：实现、调试、重构、测试或可审查的代码修改。 | 读取代码库、修改文件、验证行为并汇报结果。由 agent 在任务需要 grounded implementation 时自行判断加载。 |
| `codex-image-gen` | 生成或编辑 raster 图片、图标、视觉素材、产品 mockup、概念图或基于参考图的变体。 | 使用图片生成流程，返回图片资产或编辑结果。 |
| `dev-flow` | 想继续推进开发项目，涉及需求、Spec、Eval、Plan、执行、review/test、repair、上下文恢复、文档、lane 或更重的 review。 | 只恢复必要状态，识别当前 lifecycle phase 和缺失 gate，然后路由到 focused workflow skills。它不冒充 owner skill。 |
| `discussion-workflows` | 讨论本身需要治理：复盘、边界、范围、复杂度检查、漂移控制、confirmed/draft/open 状态或持久化讨论记录。 | 把混乱或被纠正过的讨论整理成可决策状态，区分 confirmed、draft 和 open；只有持久化有价值时才写入 `docs/discussion-workflows/`。 |
| `doc-driven-workflows` | 项目文档治理：source-backed 架构、tech-stack、operation-flow、call-path、code/docs sync、alignment review 或 open-question ledger。 | 先判断 doc-driven gate 是否真的满足，再基于当前源码证据更新、记录或跳过文档；不会因为“有 docs”就重写文档。 |
| `agent-debate` | 多个 agent 应该讨论同一份材料和同一个问题：需求、产品摩擦、简单性、必要性、用户流程或方案是否太重。 | 让每个 agent 拿到同一主题和同一材料，综合分歧，把冲突输入后续轮次，只提升有证据支持的结论或开放问题。 |
| `agent-review` | 多个 agent 应该审查同一个 artifact：Spec、Eval、plan、design、PR、diff、实现、证据包或最终结果。 | 收集 blocker/major/minor/question，归一化声明，核验证据，并在需要时做 rebuttal 或 recheck。 |
| `agent-lanes` | 多个 agent 应该分别做不同的独立任务，并且边界清楚：不同文件、模块、文档、调查方向或 worktree。 | 做 collision check，创建 lane packet，分发或准备 handoff，然后把返回结果交给 integration review，避免直接相信 worker 总结。 |

### 内部流程 Skills

| Skill | 什么时候被用 | 会发生什么 |
| --- | --- | --- |
| `project-context` | 入口 workflow 依赖 handoff、coordination、spec、lane 状态、项目规则、验证命令或 source-of-truth docs。 | 恢复真实项目状态，识别当前决策、活跃 lanes、冲突风险和验证约定。 |
| `agent-grilling` | 目标、假设、计划分支或 lane 拆分还不适合直接计划或分发。 | 用 agents 提问并回答 formulation 问题，pressure-test 选项，返回候选判断和真正需要问用户的问题。 |
| `integration-review` | `agent-lanes` workers 返回，或 lane 的证据、范围、冲突、blockers、下一批选择需要审查。 | 按范围和证据检查返回工作，分类 blockers，识别冲突，决定什么能合并或下一批能安全运行什么。 |
| `multi-agent-orchestration` | 高强度流程显式需要 Spec/Eval、外部 agent、model-diverse convergence、反复 review-repair 或高级多 agent dispatch。 | 作为高级 dispatcher 和控制面。它可能路由到 `agent-debate`、`agent-review`、`agent-lanes`，或进入更重的 Spec/Eval/review-repair 生命周期。 |

速记：

```text
写代码                         -> steady-coding
生成或编辑图片                  -> codex-image-gen
不确定下一步流程                -> dev-flow
治理长讨论                     -> discussion-workflows
治理项目文档                   -> doc-driven-workflows
多个 agent 辩论同一个问题       -> agent-debate
多个 agent 审查同一个 artifact  -> agent-review
多个 agent 分头做独立任务       -> agent-lanes
```

## 开发生命周期

对于非平凡开发任务，`dev-flow` 默认使用这条生命周期作为控制主线：

```text
1. 讨论需求
2. 锁定 Spec
3. 锁定 Eval
4. 写 Plan
5. 执行 Plan
6. Review + Test
7. Repair + Recheck
8. Close / Handoff
```

每个阶段都有退出条件：

| 阶段 | 退出条件 |
| --- | --- |
| 讨论需求 | confirmed、draft、open 分清楚；目标、非目标、产品摩擦和约束没有混在一起。 |
| 锁定 Spec | 目标、范围、非目标、用户可见行为、约束和影响面足够清楚，可以 review 或实现。 |
| 锁定 Eval | 验收检查、测试点、人工检查点、失败条件和证据要求说明了如何证明正确。 |
| 写 Plan | 执行顺序、涉及文件/模块、风险、验证命令、停止或回滚条件明确。 |
| 执行 Plan | 变更保持在 plan 边界内，并留下“改了什么/没改什么”的证据。 |
| Review + Test | 实现按 Spec 和 Eval 检查，并有可查看的测试或人工验证证据。 |
| Repair + Recheck | 已接受的 blocker/major 被修复并复查，或有证据地拒绝、非阻塞延期、升级为 blocked。 |
| Close / Handoff | 最终状态、证据、残留风险、文档影响和下一 owner 清楚。 |

按任务规模控制流程重量：

```text
小任务：
  一句话需求 -> 合并 Spec/Eval -> 简短 Plan -> 实现 -> 验证

中任务：
  在推理或简短记录里分开 Spec、Eval、Plan；只 review 有风险的 gate

大任务：
  明确产出 Spec、Eval、Plan；必要时每个 gate 都用 agent-review

高风险任务：
  review Spec、Eval、Plan、实现和最终结果；使用 repair -> recheck
```

Review 不只是最后一步。当 Spec、Eval、Plan、实现或最终结果影响较大，且单一视角可能漏问题时，用 `agent-review`。

文档治理也是生命周期 gate：当锁定的 Spec、已接受的实现或 review finding 会让未来的人或 agent 被 source-of-truth docs 误导时，用 `doc-driven-workflows`。

## 场景入口

使用同一条生命周期，然后根据场景选择入口和流程重量：

```text
理解/讨论 -> Spec -> Eval -> Plan -> 执行 -> Review/Test -> Repair/Recheck -> Close
```

| 场景 | 从哪里开始 | 后续怎么走 | 通常跳过或压缩什么 |
| --- | --- | --- | --- |
| 新项目 | 用 `$discussion-workflows` 澄清目标、用户、边界、非目标、产品流程和复杂度位置。方向或复杂度需要同题挑战时，用 `$agent-debate`。 | 用 `$dev-flow` 进入 Spec、Eval、Plan、执行、review/test、repair 和收口。需要长期 source-of-truth docs 时，用 `$doc-driven-workflows`。 | 不跳过前期发现，但在风险需要前保持产物轻量。 |
| 新需求 | 用 `$dev-flow` 恢复项目上下文，并识别缺失的 lifecycle gate。 | 需求不清楚时用 `$discussion-workflows`，取舍有争议时用 `$agent-debate`，Spec/Eval/Plan/diff/result 需要审查时用 `$agent-review`，能独立并行时用 `$agent-lanes`，文档会漂时用 `$doc-driven-workflows`。 | 需求和 Eval 已清楚时，跳过长讨论。 |
| 修复 | 小而可复现的 bug 可以直接描述。原因、影响面、复现条件或风险不清楚时，用 `$dev-flow`。 | 边界或设计混乱时用 `$discussion-workflows`，修复路径有竞争时用 `$agent-debate`，高风险 diff 或最终证据需要检查时用 `$agent-review`，多个独立修复可并行时用 `$agent-lanes`，修复改变文档行为时用 `$doc-driven-workflows`。 | 小修复压缩 Spec/Plan，但保留 Eval/复现和验证。 |
| 更新 | 小更新可以直接描述。行为、架构、范围或风险变化时，用 `$dev-flow`。 | 范围或复杂度取舍用 `$discussion-workflows`，方向有争议用 `$agent-debate`，变更后的 Spec/Eval/Plan/diff/result 用 `$agent-review`，独立更新面用 `$agent-lanes`，source-of-truth docs 会过期时用 `$doc-driven-workflows`。 | 小更新压缩执行流程；行为改变时不要跳过 Eval。 |

速记：

```text
新项目 -> discussion-workflows -> dev-flow -> 需要持久文档时 doc-driven-workflows
新需求 -> dev-flow；缺哪个 gate 再加 discussion/debate/review/lanes/docs
修复   -> 小而可复现直接说；不清楚或高风险用 dev-flow
更新   -> 小更新直接说；行为、范围、架构或风险变化用 dev-flow
```

## 路由指南

| 工作听起来像... | 优先使用 | 避免 |
| --- | --- | --- |
| 普通编码、调试、重构或可审查实现 | `steady-coding` | 除非任务确实需要，否则不要进入工作流编排 |
| 恢复项目 handoff、coordination、spec、lane 或 source-of-truth 状态 | `$dev-flow`，它会内部使用 `project-context` | 默认读取整棵 docs 树 |
| 为复杂开发任务选择 workflow owner | `dev-flow` | 把所有 workflow 都调用一遍 |
| 非平凡开发需要需求、Spec、Eval、Plan、执行、review/test、repair 和收口 | `$dev-flow` | 没有 Eval gate 就从讨论直接跳到实现 |
| 长讨论或被纠正过的讨论需要复盘、边界控制或持久决策 | 直接用 `$discussion-workflows`，如果它是更大开发路由的一部分则用 `$dev-flow` | 过早当成实现计划 |
| 模糊目标需要 agent 辅助 formulation、假设或 lane pressure-testing | `$dev-flow` 或 `$agent-debate`，它们可能内部使用 `agent-grilling` | 把 formulation 当成 implementation planning |
| 一个 focused reviewer、researcher 或 fresh-eyes agent 应该检查一个 bounded artifact 或问题 | `agent-review` | `agent-lanes`，后者用于两个或更多独立 lanes |
| 多个 agents 应该基于同一材料辩论需求、产品摩擦、简单性、必要性或用户流程 | `agent-debate` | 在所有 agent 审查统一主题前按章节拆给不同 agent |
| 两个或更多明确独立的 work lanes 可以安全并行 | `agent-lanes` | 除非明确需要 Spec/Eval、外部 agents 或 review-repair，否则不要用 `multi-agent-orchestration` |
| 返回的 lane 工作需要证据、范围、冲突和 blocker 分类 | `$agent-lanes`，它会内部使用 `integration-review` | 不检查证据就相信 worker 总结 |
| 显式 Spec/Eval delivery、model-diverse review、外部 agent policy 或反复 review-repair | `$dev-flow` 或 `$multi-agent-orchestration` 做高级控制 | 常规 lane batching 或轻量 goal/path pressure-testing |
| Source-backed 架构、operation-flow、call-path 或 code/docs drift maintenance | 直接用 `$doc-driven-workflows`，如果它是更大开发路由的一部分则用 `$dev-flow` | 因为 docs 存在就更新 docs |

常见模糊说法：

| 用户说... | 先路由到 |
| --- | --- |
| “Ask agents to make this goal clear”, “pressure-test the idea”, “先问透” | `$agent-debate` 或 `$dev-flow` |
| “Where did the discussion land?”, “recap this thread”, “先复盘” | `$discussion-workflows` |
| “Get another agent to look”, “fresh eyes”, “one reviewer”, “one researcher” | `agent-review` |
| “Let agents debate”, “same topic”, “is this too heavy”, “is this necessary”, “simple/easy to use”, “符合心流” | `agent-debate` |
| “Restore project state”, “continue from handoff”, “先恢复上下文” | `$dev-flow` |
| “Continue this feature”, “follow the development flow”, “先定 spec/eval/plan 再做” | `$dev-flow` |
| “Sync code/docs”, “code/docs synchronization”, “docs may drift” | `$doc-driven-workflows` |
| “Use two agents in parallel on two separate parts” | `agent-lanes`，除非用户要求 Spec/Eval、adversarial review、反复 repair 或外部 agent policy |
| “The lanes came back; decide what can merge” | `$agent-lanes` |

内部流程 skills 只应在入口 skill 路由后使用。不要让用户为了常规工作去选择 `project-context`、`agent-grilling` 或 `integration-review`。

`discussion-workflows` 和 `doc-driven-workflows` 是显式治理入口，不是多 agent 内部件。用户可以直接调用它们；当讨论或文档治理是更大开发流程中的一步时，`dev-flow` 也可以路由进去。

Workflow skills 都是显式入口：通过名称调用，或者由已经加载的 workflow 路由进去。它们不应因为普通提到 review、discussion、lanes、docs 或 agents 就隐式激活。

多 agent 辩论默认保持统一主题：每个 agent 每轮都拿到同一份 source material 和同一个问题。分类或章节只是每个 agent 都要检查的 checklist，不是分给不同 agent 的 ownership，除非用户明确要求独立 work lanes。

## 目录结构

```text
skills/
  steady-coding/
  project-context/
  codex-image-gen/
  dev-flow/
  discussion-workflows/
  doc-driven-workflows/
  agent-grilling/
  agent-debate/
  agent-review/
  agent-lanes/
  integration-review/
  multi-agent-orchestration/
```
