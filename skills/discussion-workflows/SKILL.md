---
name: discussion-workflows
description: Use when a long, corrected, or decision-heavy discussion needs recap, boundary or scope clarification, reference comparison, complexity checks, drift control, or durable state under docs/discussion-workflows.
---

# Discussion Workflows

## Overview

这个技能用于让复杂讨论保持可决策、可延续、不跑偏。它不是实现指南；它只负责把发散讨论收回到当前边界、责任归属、可借鉴参考、复杂度位置、confirmed/draft/open 状态，以及是否需要落盘。

不要默认把所有动作都跑一遍。先找当前最阻塞的问题，再选择最小足够动作。

## Routing

按当前任务选择一个主动作，必要时组合第二个动作：

```text
有参考对象、竞品、旧方案、同类案例、外部实践：
  compare references

边界、范围、分层、责任归属、复杂度归属不清：
  clarify boundaries

方案开始变重，中心承担太多责任，规则/流程/状态/调试面变大：
  check complexity

用户问“讨论到哪了”“先复盘”“下一步是什么”，或上下文开始变重：
  recap current state

局部主题越挖越深，开始遮住总目标：
  check subtopic drift

讨论很长、用户多次纠正、下一轮需要恢复上下文、用户要求记录：
  capture discussion state
```

常见组合：

```text
compare references -> clarify boundaries
clarify boundaries -> check complexity
clarify boundaries -> capture discussion state
recap current state -> check subtopic drift
capture discussion state -> handoff
```

如果多个动作同时命中，选择最能解除当前阻塞的动作。不要把短问题变成重流程。

## Core Loop

每轮按这个顺序推进：

1. **Frame.** 说清本轮是在做参考对照、边界澄清、减重检查、复盘、漂移检查，还是状态记录。完成条件：目标、边界、执行、交付、后续计划没有混成一团。
2. **Restore.** 如果项目已有 `docs/discussion-workflows/index.md` 或其他 source of truth，先读当前有效材料。完成条件：知道哪些是 confirmed、draft、open、历史参考。
3. **Explore.** 执行选中的动作，只在真正阻塞时问最小澄清问题。完成条件：得到一个可拍板判断、明确草案，或明确开放问题。
4. **Close.** 标记每个主题状态：现在够用、以后再说、有冲突再重开。完成条件：没有继续沿用被用户纠正过的旧名称、旧边界或旧判断。
5. **Persist when needed.** 触发落盘条件时写入 `docs/discussion-workflows/` 并更新索引。完成条件：下一轮参与者能从项目文件恢复当前判断。

## Persistence Gate

短问题可以只回答，不建文件。需要复用但还不重的判断，至少在回答中标出 `confirmed / draft / open`。

出现以下任一情况，先落盘再继续深入：

- 用户明确要求记录
- 讨论已经变长或可能被压缩
- 用户纠正改变了关键边界、名称或判断
- 连续形成约 5 条可复用判断
- 正在定义长期工作流、复杂方案、协作流程或跨参与者流程
- 用户问之前讨论出什么，或指出你开始遗忘
- 子主题已经成型，下一步需要回到整体问题

不要在用户还没确认时把草案写成 canonical boundary。草案先写 session 或 inbox；边界定义只保存当前确认后的有效判断。

## Action Patterns

顶层只保留触发和完成条件。需要具体输出格式时读 `references/action-patterns.md`。

- `recap current state`: 只整理状态，不新增设计。完成条件：输出 confirmed、draft、open、drift check、next。
- `check subtopic drift`: 判断局部主题是否已经够用。完成条件：指出 current value、risk、return point。
- `compare references`: 参考对象只是镜子，不是模板。完成条件：说明借什么、不借什么、放回本地边界后的判断。
- `clarify boundaries`: 先拆目标、边界、责任、执行路径和后续计划。完成条件：知道复杂度该归谁，以及哪些现在不必定。
- `check complexity`: 先问复杂度是否放错地方，而不是能不能做。完成条件：指出变重信号、应移动/延后内容、当前以哪些文档为准。
- `capture discussion state`: 让下一轮能恢复判断，不写聊天流水账。完成条件：记录变更、当前依据、confirmed、draft、open、deferred、不要无意识重开的内容。

## Reference Routing

按需要读取，不要预加载全部：

- `references/action-patterns.md`: recap、drift、reference comparison、boundary clarification、complexity check、state capture 的输出形状和判断问题。
- `references/state-lifecycle.md`: `docs/discussion-workflows/` 布局、文件命名、读取顺序、discussion lifecycle、落盘模板。
- `references/boundary-prompts.md`: 用短句推进边界、责任、范围或复杂度讨论。
- `references/discussion-checkpoints.md`: 长讨论阶段记录，尤其是用户纠正、上下文压缩、并行调研后。
- `references/watchouts.md`: 跑偏、过早进入执行细节、中心方案变重时的警示词。
- `references/audit-checklist.md`: 更细的减重检查清单。

## Completion Gate

结束一轮讨论前确认：

- 当前回答区分了 `confirmed / draft / open`
- 若用户纠正过旧判断，旧判断已标记过期，不再沿用
- 若引用了参考对象，已说明本地约束和不能照搬的部分
- 若方案变重，已说明复杂度应移动、延后或留在外部的位置
- 若触发落盘，已更新 index 和相关 session/boundary/reference/complexity 文件
- 若未落盘，回答里说明这是短小判断或暂不需要持久化

## Common Mistakes

```text
把这个技能当成必须完整执行的流程
只看参考，不先校准本地边界
一上来就讨论接口字段、UI、格式或版本计划
把“内容重要”误当成“必须放进中心”
讨论还没拍板，就偷偷回写主文档
只在聊天里说，不持续落盘
用户要求复盘时继续新增设计
子主题已经够用后还继续深入，忘了回到总问题
index 只堆判断，不区分 confirmed / draft / open
把模板当成每次必须完整执行的流程
```

## One Line

```text
先选对讨论动作，再把参考、边界、减重、复盘和状态记录组合成可拍板、可延续的判断。
```
