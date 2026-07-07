# State And Lifecycle

这个文件只在 `discussion-workflows/SKILL.md` 已触发，并且需要落盘、恢复上下文、维护长期讨论状态或交接时再读。

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
  archive/
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
  原始资料、摘录、链接、外部文档、接口说明、调研笔记、未整理想法、
  还没形成判断的临时输入。这里不是 confirmed truth。

archive/
  被废弃、替换、过期的边界、参考记录、减重检查或历史讨论索引。
  默认不作为当前讨论真相，只用于追溯。
```

## File Rules

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
Inbox 晋升：inbox 只能通过 discussion synthesis、references 对照、boundary
确认或 doc-driven refinement 晋升。不要从 inbox 原样复制到
docs/doc-driven-workflows/，也不要从 inbox 直接派生实现结论。
未确认建议：先写 session 的 proposed/draft，不要写进 boundary 的 current definition。
归档：当 boundary/reference/complexity/session 不再代表当前有效判断，但仍需追踪时，移动到 archive/ 对应子目录或在原文件头部标记 Archived，并从 index 的 active 区移除。
```

读取顺序：

```text
1. 先读 docs/discussion-workflows/index.md。
2. 再按索引读取相关 boundaries/*.md。
3. 需要过程原因时，再读最近的 sessions/*.md。
4. 只有需要原始证据时才读 inbox/。
5. 只有追溯历史、解释改判或 active 文档显式链接时才读 archive/。
```

## Archive Rules

归档不是删除。出现以下情况时归档：

```text
边界定义被新 boundary 替代
参考对照已经过期或被新比较取代
减重检查不再适用于当前方案
session 记录包含已废弃方向，继续放在 active index 会误导恢复
inbox 原始材料已经整理完但仍需留痕
```

归档文件头部加：

```text
Archived: <YYYY-MM-DD>
Status: superseded | abandoned | obsolete | wrong-assumption | completed-history
Reason:
Replaced by:
Do not use as active truth because:
```

`index.md` 可以保留 `Archived` 链接区，但 active confirmed/draft/open 区不能指向
archive 作为当前真相。

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
   - 把原始外部资料、摘录、接口文档或调研链接放入 inbox/，但只把精炼后的
     约束、判断和 open questions 写入 active 文档
   - 更新 index.md

9. Handoff
   说明本轮更新了哪些文件，以及下一轮参与者应该先读哪些文件。
```

## Persistence Decision

写入文件：

```text
用户明确要求记录、讨论已经变长、用户纠正改变了判断、或下一轮需要继续。
```

先落盘再继续推进：

```text
用户已经纠正过关键边界、名称或判断
连续形成 5 条左右可复用判断
正在定义新的长期工作流、复杂方案、协作流程或跨参与者流程
用户问“之前讨论出什么了”或指出你开始遗忘
子主题已经成型，下一步需要回到整体问题
```

可以不写文件：

```text
只是一个短小判断、没有形成可复用结论、用户只要口头建议。
```

回答里说明未落盘原因。

## Boundary File Shape

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

## Session File Shape

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
