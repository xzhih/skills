---
name: discussion-workflows
description: Use when a long, corrected, or decision-heavy discussion needs recap, boundary or scope clarification, reference comparison, complexity checks, drift control, or durable state under docs/discussion-workflows.
---

# Discussion Workflows

## Overview

这个技能是一套复杂讨论和决策收敛工作流，不限定领域，不是实现指南。

适用对象不限定领域。只要讨论需要持续收敛、保留判断、区分已确认和未确认内容、防止跑偏，就可以使用。具体领域只是例子；重点是让讨论保持可决策、可延续、不跑偏。

目标是把讨论从发散收回到：

```text
当前边界
责任归属
参考对象能借什么、不能借什么
方案是否变重
哪些结论已经够用
哪些只是草案
哪些问题仍开放
哪些状态需要落盘
```

不要默认把所有动作都跑一遍。先判断当前最阻塞的问题，再按需要组合。

## Routing

按当前任务选择：

```text
有参考对象、竞品、旧方案、同类案例、外部实践：
  compare references

正在讨论边界、范围、分层、责任归属、复杂度应该归谁：
  clarify boundaries

方案开始变重、中心承担太多责任、规则或流程变大、配置或调试面变大：
  check complexity

用户问“现在讨论到哪了”、“先复盘”、“接下来讨论什么”，或需要决定下一步：
  recap current state

子主题越挖越深、开始偏离总目标、一个局部遮住整体问题：
  check subtopic drift

讨论很长、用户纠正过多次、需要落盘、需要防止下一轮丢状态：
  capture discussion state
```

如果同时命中多个，按当前最阻塞的问题选择第一个。

常见组合：

```text
先借鉴参考对象，再收口判断：
  compare references -> capture discussion state

先定边界和责任，再检查是否变重：
  clarify boundaries -> check complexity

讨论已经变长，而且边界还没定：
  clarify boundaries -> capture discussion state

参考对象让方案变重：
  compare references -> check complexity

一个子主题已经成型，需要回到总目标：
  recap current state -> check subtopic drift
```

## General Workflow

每轮按这个顺序推进：

```text
1. 先确认当前讨论点，不要把目标、边界、执行、交付、后续计划混成一团。
2. 如果项目已有 source of truth，先读当前有效材料。
3. 选择一个或多个动作，不要复述整套方法。
4. 给出可拍板判断：已确认、草案、开放问题、理由、不要走的方向、下一步。
5. 讨论变长或用户要求时，把当前判断写入 docs/discussion-workflows/。
```

完整的多轮讨论按 Discussion Lifecycle 推进。短问题可以只跑前几步，不要为了流程而制造文档。

## Minimal Discussion Form

用最小足够形式推进讨论。

```text
短问题：
  直接回答，可不建文件。

有复用价值的判断：
  标出 confirmed / draft / open，必要时更新 index 或 session。

长讨论、用户多次纠正、主题会延续：
  进入 lifecycle 并落盘。
```

不要因为有 lifecycle、模板或目录结构，就把短讨论变成重流程。

## Storage Layout

默认在当前项目内保存到：

```text
docs/discussion-workflows/
  index.md
  boundaries/
  references/
  complexity-checks/
  sessions/
  inbox/
```

如果用户指定其他根目录，使用用户指定目录，但保留同样的子目录结构。

目录语义：

```text
index.md
  总索引。列 confirmed decisions、working drafts、open questions、当前有效边界、最近讨论记录。

boundaries/<slug>.md
  一个边界或关键定义一个 canonical 文件。这里保存当前有效结论，可以持续更新。

references/<YYYY-MM-DD>-<slug>.md
  一次参考对象对照记录。记录参考了谁、借什么、不借什么、最后判断。

complexity-checks/<YYYY-MM-DD>-<slug>.md
  一次减重检查记录。记录哪里变重、复杂度应该移动到哪里、哪些内容延后。

sessions/<YYYY-MM-DD>-<slug>.md
  讨论过程记录。记录用户纠正、转向、争议、阶段判断和为什么改变判断。

inbox/<YYYY-MM-DD>-<slug>.md
  原始资料、摘录、未整理想法、还没形成判断的临时输入。
```

文件名规则：

```text
<slug> 使用 2-6 个英文小写词，kebab-case。
日期使用本地日期 YYYY-MM-DD。
同一天同主题已有文件时，优先更新已有文件；确实是独立讨论再加 -2、-3。
```

修改规则：

```text
边界定义：更新同一个 boundaries/<slug>.md，不为每次小改创建新边界文件。
讨论过程：每个连续讨论阶段创建或追加一个 sessions/<YYYY-MM-DD>-<slug>.md，长期保留，不覆盖旧 session。
参考对照：每次重要参考比较保留 dated record；同一轮比较可以更新同一个文件。
减重检查：每次明确检查保留 dated record；后续复查新建 dated record。
索引：每次写入或更新任何文件后，都更新 index.md。
原始资料：先放 inbox/；形成判断后，在 index 或具体文件里链接，不把原始材料混进 canonical 边界定义。
未确认建议：先写 session 的 proposed/draft，不要写进 boundary 的 current definition。
```

读取顺序：

```text
1. 先读 docs/discussion-workflows/index.md。
2. 再按索引读取相关 boundaries/*.md。
3. 需要过程原因时，再读最近的 sessions/*.md。
4. 只有需要原始证据时才读 inbox/。
```

## Discussion Lifecycle

用于多轮、会延续、边界不清、用户多次纠正，或需要落盘的讨论。

```text
1. Start
   明确本轮讨论点、用户想要的输出、当前最阻塞的问题。

2. Restore Context
   如果 docs/discussion-workflows/index.md 存在，先读 index。
   再按需读相关 boundaries、最近 sessions、references 或 complexity-checks。

3. Frame The Round
   用一句话说清：这轮是在做参考对照、边界澄清、减重检查、状态记录，还是组合动作。

4. Explore
   按选中的动作推进。只在真正阻塞时问最小澄清问题。
   始终拆开目标、边界、执行、交付、后续计划和文件落盘。

5. Propose Decision
   给出可拍板判断：已确认约束、建议结论、理由、明确不走的方向、未解决问题。

6. Handle Correction
   如果用户纠正，先复述变化后的当前真相。
   标记旧说法已过期，不要继续沿用旧名称、旧边界或旧判断。

7. Close The Round
   标记每个主题状态：现在够用 / 以后再说 / 有冲突再重开。
   不追求一次定完所有未来问题。

   如果刚推进了一个子主题，检查它是否遮住了总目标。

8. Persist
   需要延续时写入 docs/discussion-workflows/：
   - 更新相关 boundaries/<slug>.md 作为当前有效结论
   - 创建或追加 sessions/<YYYY-MM-DD>-<slug>.md 记录讨论过程
   - 按需创建 references/ 或 complexity-checks/ dated record
   - 更新 index.md

9. Handoff
   说明本轮更新了哪些文件，以及下一轮参与者应该先读哪些文件。
```

落盘判断：

```text
用户明确要求记录、讨论已经变长、用户纠正改变了判断、或下一轮需要继续：
  写入文件。

出现以下任一情况，先落盘再继续推进：
  - 用户已经纠正过关键边界、名称或判断
  - 连续形成 5 条左右可复用判断
  - 正在定义新的长期工作流、复杂方案、协作流程或跨参与者流程
  - 用户问“之前讨论出什么了”或指出你开始遗忘
  - 子主题已经成型，下一步需要回到整体问题

只是一个短小判断、没有形成可复用结论、用户只要口头建议：
  可以不写文件，但回答里要说明没有落盘。
```

不要在用户还没确认时把讨论草案写成 canonical boundary。可以先写 session 或 inbox；边界定义只保存当前确认后的有效判断。

## Recap Current State

用于用户要求复盘、讨论进入新阶段、或者执行者发现上下文开始变重。

复盘只做状态整理，不新增设计。

输出按这个顺序：

```text
Confirmed:
  已经确认、可以作为当前依据的判断。

Draft:
  已提出但还没拍板的建议。

Open:
  还需要讨论或用户决定的问题。

Drift Check:
  当前讨论是否偏向某个子主题，是否需要回到总边界。

Next:
  1-3 个下一步候选，并推荐一个。
```

如果已有 `docs/discussion-workflows/index.md`，复盘前先读 index；需要原因时再读最近 session。

## Check Subtopic Drift

用于某个局部、流程、模板、审查机制、缓存机制、文档结构等讨论过深时。

判断：

```text
这是整体关键问题，还是一个局部主题？
这个局部现在是否已经够用？
继续深入会不会推迟更阻塞的整体问题？
是否需要先把当前判断落盘，再回到总问题？
```

输出：

```text
Subtopic:
  当前深入的子主题。

Current Value:
  已经得到什么有效判断。

Risk:
  继续深入会造成什么偏移。

Return Point:
  应该回到哪个总问题。
```

## Compare References

用于参考对象、竞品、旧方案、同类案例、外部实践或历史材料。

先回答本地问题：

```text
这个讨论对象想成为什么？
这个讨论对象不要成为什么？
当前主题的本地约束是什么？
哪些结论已经确认？
哪些只是历史材料？
```

再看参考对象：

```text
1. 明确当前讨论点。
2. 选择最相关的 1-2 个参考对象。
3. 对每个参考对象说明它怎么做。
4. 明确哪些做法不该直接搬。
5. 放回当前边界后给出建议判断。
```

如果任务很大，并且独立参与者可用，可以分别检查不同参考对象；否则直接检查。

不要把参考对象当模板。它只是镜子，用来帮助当前讨论对象做判断。

## Clarify Boundaries

用于边界、分层、责任归属或复杂度放置不清时。

先说清楚：

```text
讨论对象想成为什么
讨论对象不要成为什么
哪些现在必须定
哪些以后再说
```

讨论新概念时，判断它属于哪一层：

```text
目标和原则
边界和责任
决策归属
执行路径
外部依赖或参考对象
可选扩展
用户或受众体验
记录和证据
```

默认规则：

```text
不要先把复杂度压进中心。
能放外面、能晚点定、能做成可选内容的，不要过早内建。
```

每个大主题至少问：

```text
这个复杂度到底该归谁？
这件事更像目标问题、执行问题，还是记录/协作问题？
是不是因为“以后可能有用”才把它放进来了？
这是不是其实属于外部依赖、可选能力或后续阶段？
现在不定会不会真的阻塞下一步？
```

## Check Complexity

用于方案开始变重时。它不先问“能不能做”，而是先问复杂度是否放错地方。

检查信号：

```text
中心部分拥有的名词越来越多
一个文档里不断出现 Manager、Gateway、Workflow、Platform 这类词
流程变成默认容器
状态层或知识层开始保存完整操作步骤
调试默认要求保留完整原始数据
扩展或集成入口开始像市场
可选能力想要自己在后台运行
测试必须依赖真实平台、真实模型或真实外部服务
```

发现变重时，优先考虑：

```text
把能力放到外部执行
把环境相关内容放到环境层、执行层或后续阶段
把可选内容做成扩展、插件、附录或后续能力
把调试放到显式开启的路径
把领域细节留到对应领域讨论
先单独写主题记录，不要立刻做成平台
```

输出至少包含：

```text
哪些地方仍然清楚、克制
哪些词或职责开始变重
哪些内容应该改名、移动或延后
现在以哪些文档为准
哪些旧文档只能当历史参考
```

## Capture Discussion State

用于对话很长、用户多次纠正、旧名称被新名称替换、讨论可能之后继续，或者用户要求落盘时。

优先写入 `docs/discussion-workflows/`。不要只写聊天总结；必须让下一轮参与者能从项目文件恢复当前判断。

必须记录存在的事实：

```text
哪些判断变了
现在以什么为准
哪些已经确认
哪些只是草案
哪些只是历史参考
哪些以后再说
哪些不要无意识重开
用户纠正过什么
当前还没解决什么
```

使用两层保存：

```text
docs/discussion-workflows/inbox/
  原始资料、文章、代码摘录、调研整理、还没定论的笔记

docs/discussion-workflows/
  当前结论、主题记录、边界记录、复盘、阶段记录
```

原始资料和当前判断不要混在一起。

阶段记录至少写：

```text
当前目标
明确不要走的方向
最新名称
现在以哪些文档为准
confirmed decisions
working drafts
open questions
已经说到够用的主题
明确以后再说的主题
还没解决的问题
可能误导后续的旧文档或旧说法
```

边界文件建议结构：

```text
# <Boundary Name>

## Current Definition
当前有效定义。

## Responsibilities
这一层负责什么。

## Non-Goals
明确不负责什么。

## Ownership
复杂度归属、相关层级、外部依赖。

## Open Questions
还没定的问题。

## Evidence
链接相关 sessions/references/complexity-checks 文件。
```

session 文件建议结构：

```text
# <Session Title>

## Context
这轮为什么开始。

## Turns
关键讨论、用户纠正、重要转向。

## Decisions
这轮实际定下来的判断。

## Drafts
还没拍板、不能写成 canonical boundary 的建议。

## Deferred
明确以后再说的问题。

## Follow-Up Writes
本轮更新了哪些 index/boundaries/references/complexity-checks 文件。
```

## Concepts To Split

这些概念最容易混在一起。发现混淆时，先拆开再继续：

```text
注册、授权、加载、放进上下文、允许执行
状态、权限、能力、用户看到的展示
引用、生成文件、上下文注入
知识、操作步骤、自动化流程
已安装、可用、本次任务允许使用
真实状态、用户看到的展示
当前执行状态、plan 本体
overview、detail transcript
debug 能力、developer console
参考对象的习惯、当前讨论对象该采用的判断
```

## Evidence Check

重要讨论中要反向检查：

```text
不用真实平台、真实外部服务、真实账号、真实模型，
这套关键判断能不能验证？
```

好信号：

```text
关键判断可以用已有材料、轻量证据、有限样本、假的关键依赖或明确推理链验证
```

坏信号：

```text
必须启动真实平台或真实 UI 环境
必须依赖真实外部服务
必须登录真实账号
必须绑定真实扩展或集成
```

## Read If Needed

需要更细提示时再读：

- [boundary-prompts.md](references/boundary-prompts.md): 短句推进边界和责任讨论
- [discussion-checkpoints.md](references/discussion-checkpoints.md): 长讨论阶段记录
- [watchouts.md](references/watchouts.md): 常见跑偏和高风险词
- [audit-checklist.md](references/audit-checklist.md): 减重检查清单

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
