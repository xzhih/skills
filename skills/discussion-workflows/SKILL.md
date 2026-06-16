---
name: discussion-workflows
description: Use when a product, architecture, tool, or agent discussion needs to stay decision-ready. Route and combine discussion actions for comparing reference products or systems, clarifying boundaries and ownership, checking whether a direction is becoming too heavy, and capturing long or corrected discussions into durable files under docs/discussion-workflows.
---

# Discussion Workflows

## Overview

这个技能是一套产品和架构讨论工作流，不是实现指南。

目标是把讨论从发散收回到：

```text
当前边界
责任归属
参考对象能借什么、不能借什么
方案是否变重
哪些结论已经够用
哪些状态需要落盘
```

不要默认把所有动作都跑一遍。先判断当前最阻塞的问题，再按需要组合。

## Routing

按当前任务选择：

```text
有参考产品、参考系统、竞品、旧项目、同类实现：
  compare references

正在讨论架构边界、分层、责任归属、复杂度应该归谁：
  clarify boundaries

方案开始变重、核心揽太多责任、功能像平台化、配置或调试面变大：
  check complexity

讨论很长、用户纠正过多次、需要落盘、需要防止下一轮丢状态：
  capture discussion state
```

如果同时命中多个，按当前最阻塞的问题选择第一个。

常见组合：

```text
先借鉴参考对象，再收口判断：
  compare references -> capture discussion state

先定架构边界，再检查是否变重：
  clarify boundaries -> check complexity

讨论已经变长，而且边界还没定：
  clarify boundaries -> capture discussion state

参考对象让方案变重：
  compare references -> check complexity
```

## General Workflow

每轮按这个顺序推进：

```text
1. 先确认当前讨论点，不要把产品、架构、实现、版本计划混成一团。
2. 如果项目已有 source of truth，先读当前有效材料。
3. 选择一个或多个动作，不要复述整套方法。
4. 给出可拍板判断：已确认约束、判断、理由、不要走的方向、下一步。
5. 讨论变长或用户要求时，把当前判断写入 docs/discussion-workflows/。
```

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
  总索引。列当前有效边界、最近讨论记录、参考对照、减重检查、未解决问题。

boundaries/<slug>.md
  一个边界或核心定义一个 canonical 文件。这里保存当前有效结论，可以持续更新。

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
```

读取顺序：

```text
1. 先读 docs/discussion-workflows/index.md。
2. 再按索引读取相关 boundaries/*.md。
3. 需要过程原因时，再读最近的 sessions/*.md。
4. 只有需要原始证据时才读 inbox/。
```

## Compare References

用于参考产品、参考系统、竞品、旧项目或同类实现。

先回答本地问题：

```text
这个项目想成为什么？
这个项目不要成为什么？
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
5. 放回本项目当前边界后给出建议判断。
```

如果任务很大，并且 subagents 可用，可以让独立 subagent 分别看参考对象；否则直接检查。

不要把参考对象当模板。它只是镜子，用来帮助本项目做判断。

## Clarify Boundaries

用于边界、分层、责任归属或复杂度放置不清时。

先说清楚：

```text
系统想成为什么
系统不要成为什么
哪些现在必须定
哪些以后再说
```

讨论新概念时，判断它属于哪一层：

```text
核心契约
中心协调层
外部能力、集成或扩展
宿主应用、平台壳或部署环境
安装和更新
可选扩展点
用户界面
持久化存储
```

默认规则：

```text
不要先把复杂度压进核心。
能放外面、能晚点定、能做成可选能力的，不要过早内建。
```

每个大主题至少问：

```text
这个复杂度到底该归谁？
这件事更像产品界面，还是中心协调层责任？
是不是因为“以后可能有用”才把它放进来了？
这是不是其实属于外部能力、扩展或平台层？
现在不定会不会真的阻塞下一步？
```

## Check Complexity

用于方案开始变重时。它不先问“能不能做”，而是先问复杂度是否放错地方。

检查信号：

```text
核心部分拥有的名词越来越多
一个文档里不断出现 Manager 和 Gateway
流程变成默认容器
状态层或知识层开始保存完整操作步骤
调试默认要求保留完整原始数据
扩展或集成入口开始像市场
扩展、插件或集成想要自己在后台运行
测试必须依赖真实平台、真实模型或真实外部服务
```

发现变重时，优先考虑：

```text
把能力放到外部执行
把平台相关内容放到平台层或宿主层
把可选内容做成扩展、插件或可插拔集成
把调试放到显式开启的路径
把产品细节留到产品讨论
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

优先写入 `docs/discussion-workflows/`。不要只写聊天总结；必须让下一轮 agent 能从项目文件恢复当前判断。

必须记录存在的事实：

```text
哪些判断变了
现在以什么为准
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
  当前结论、主题记录、架构记录、复盘、阶段记录
```

原始资料和当前判断不要混在一起。

阶段记录至少写：

```text
当前目标
明确不要走的方向
最新名称
现在以哪些文档为准
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
系统真实状态、用户界面展示
当前执行状态、plan 本体
overview、detail transcript
debug 能力、developer console
参考对象的习惯、当前产品该采用的判断
```

## Testing Check

架构讨论中要反向检查：

```text
不用真实平台、真实外部服务、真实账号、真实模型，
这套核心路径能不能测试？
```

好信号：

```text
核心路径可以用假的关键依赖、假的执行器、假的存储、假的事件接收器跑通
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

- [architecture-prompts.md](references/architecture-prompts.md): 短句推进架构讨论
- [discussion-checkpoints.md](references/discussion-checkpoints.md): 长讨论阶段记录
- [watchouts.md](references/watchouts.md): 常见跑偏和高风险词
- [audit-checklist.md](references/audit-checklist.md): 减重检查清单

## Common Mistakes

```text
把这个技能当成必须完整执行的流程
只看参考，不先校准本地边界
一上来就讨论接口字段、UI 或版本计划
把“功能重要”误当成“必须放进核心”
讨论还没拍板，就偷偷回写主文档
只在聊天里说，不持续落盘
```

## One Line

```text
先选对讨论动作，再把参考、边界、减重和状态记录组合成可拍板、可延续的判断。
```
