# xzhih skills

[English](README.md) | 简体中文

六个 skill 都可以单独安装。按想拿到的结果选择入口，并说明希望工作停在哪里。

## 安装

以下命令分别列出可用 skill、为 Codex 安装全部六项，以及只安装其中一项。

```sh
npx skills add xzhih/skills --list
npx skills add xzhih/skills --agent codex --skill '*'
npx skills add xzhih/skills --agent codex --skill agent-plan
```

从本地仓库安装时，将 `xzhih/skills` 换成 `.`。

## 选择入口

| 入口 | 什么时候用 | 做到哪里停 |
|---|---|---|
| `$steady-coding` | 自动处理日常请求，例如改提示词、写实用指南、改一处配置或查一个故障 | 提示词可以直接复制，指南让读者离开对话也能照做。只查原因时，交付证据、能确定的原因和仍需区分的解释。 |
| `$dev-flow` | 点名为任务选择流程，或接着已有交接往下做 | 按需讲解、排查、修复、重构、优化或交付。小修直接改并验证，只要求维护文档就交付相应页面。 |
| `$explain` | 想看懂已有功能、改动、设计选择或 UI 结构 | 沿同一次操作，从控件和状态归属讲到事件处理和界面结果。区分有记录的设计理由与推断。默认在对话里讲，要求留档时再写。 |
| `$team-orchestration` | 想讨论分工、并行交付、比较同题多解，或让多人分头审查 | 讨论止于分工、依赖和验收。Worker 开工前读指定 skill。负责人验证集成结果，用同一组标准比较候选方案，或汇总所有有证据的审查发现。 |
| `$agent-plan` | 点名梳理需求、写行为规格、选架构、排实施步骤或设计验收 | 可以只要其中一项。重要架构选择用同一调用方和故障比较两种结构。复杂需求用 Mermaid 树标出保留、暂定和舍弃的分支及理由。旧计划按现状修订，已确认但缺条件的验收保持待验证。 |
| `$agent-review` | 审查指定计划、PR 或结果，或在仓库、分支、指定范围内寻找改进机会 | 通常一人查明问题、严重程度和覆盖缺口。要求多人审查时，针对同一版本按风险出题。复审核对修复证据，改进审计给机会排序，两者都停在报告。 |

在 Codex 中，`steady-coding` 和 `agent-review` 支持按自然语言自动选择，其余四个入口需要点名调用。已启动的 `$dev-flow` 也会按需读取已安装的对应 skill。单独安装时可以使用随附的四份流程手册。

写代码和审代码都从调用方的约束出发，选择最简单且正确的实现。纯重构在修改前后用同一批输入跑真实入口，比较输出、错误和副作用。修改共享协议时，`$agent-review` 还会检查间接使用方，例如拿旧版生成的文件走一遍新版导入流程。[纯重构](skills/dev-flow/playbooks/deliver.md#refactor-with-the-same-behavior) · [审查规则](skills/agent-review/SKILL.md#review-a-specified-artifact)

有可量化的优化目标时，用相同条件对比原版和候选版（A/B），再从候选版一次撤掉一项改动（消融实验）。报告提速前，核对完成的工作量、错误数和用户真正等待的时间。要求持续优化时，`$dev-flow` 先固定工作负载、指标、正确性检查和停止条件，每轮只测一个假设。[优化检查](skills/steady-coding/references/engineering-checks.md#compare-optimizations) · [持续优化](skills/dev-flow/playbooks/optimize.md#sustained-optimization)

排查故障时，`$steady-coding` 先看已有的采样或故障记录。基于同一假设修了两次、仍过不了同一项检查，就直接验证那个假设。已授权修复且有便宜的测试时，先让测试重现错误，修完再跑同一个测试。[故障诊断](skills/steady-coding/references/engineering-checks.md#distinguish-the-cause)

同类错误反复出现时，`$steady-coding` 先看能否用架构或类型消除出错机会，再考虑 lint、CI 检查或回归测试。需要人工判断的事项写明由谁检查、检查什么。`$agent-review` 核对自动检查能否拦住一个真实旧错，并放行正确用法。[防复发流程](skills/steady-coding/references/engineering-checks.md#prevent-a-recurring-error)

设计选哪条路取决于一个可实测的问题时，`$agent-plan` 写出最小实验，以及什么结果支持各方案。涉及重试或恢复时，还会写清必须始终成立的规则，以及最可能打破它的操作顺序。想实际验证选择，就点名 `$dev-flow` 跑临时原型。大型迁移优先验证一旦出错会推翻最多后续工作的假设。[行为规格](skills/agent-plan/SKILL.md#behavior-specification) · [设计实验](skills/dev-flow/playbooks/deliver.md#settle-a-design-choice)

“`$dev-flow` 改掉这个错字”会直接修改并验证。“`$explain` 讲讲为什么旧搜索结果没显示”会从输入框讲到哪一行决定接收或丢弃响应。“`$team-orchestration` 先讨论这次迁移怎么分工”只交付分工方案。[流程选择](skills/dev-flow/SKILL.md) · [路由用例](docs/skill-evals/routing-cases.md)

公共实现较重时，由一位负责人先发布协议、mock 和可运行的用例，各消费方就能并行。途中发现的协议变更可单独合入。真实实现接通后，由集成人逐一验证受影响的入口。多个 Worker 复跑同一检查时，共用一份已验证的说明，写清如何准备数据、判断就绪、操作真实入口，以及核对结果和副作用。多人审查由负责人复核证据、合并同根因问题，并列出还没查到的风险。[编排流程](skills/team-orchestration/SKILL.md) · [可复跑的验收](skills/dev-flow/playbooks/deliver.md#hand-off-a-repeatable-check)

暂停或换班时，更新现有交接记录，写清还在跑的任务由谁负责、用哪个编号查询、上次看到什么状态，以及淘汰方案的证据和接手后的第一步。恢复时先查原任务的实时状态。项目首次需要持久交接时，使用一份 `docs/dev-flow/<slug>.md`。[暂停与恢复](skills/dev-flow/SKILL.md#handoff-and-resume)

## 迁移旧调用

| 已合并的入口 | 现在怎么调用 |
|---|---|
| `agent-requirements-analysis` | 用 `$agent-plan` 并说明“只梳理需求和范围” |
| `agent-spec` | 用 `$agent-plan` 并说明“只写行为规格” |
| `agent-eval` | 用 `$agent-plan` 并说明“只设计验收” |
| `agent-improve` | 用 `$agent-review` 并说明要在什么范围查找、排序改进项 |
| `agent-grilling` | 需求和设计假设交给 `$agent-plan`，故障查因交给 `$steady-coding` |
| `doc-driven-workflows` | 讲解功能或保存教学说明用 `$explain`。编写、维护操作手册或接口文档用 `$dev-flow`。 |

把已保存提示中的旧入口名换成对应的新名称。已有项目记录可以原地复用。仓库更新后，旧安装目录可能仍在本机保留。[历史维护记录](docs/skill-evals/README.md)
