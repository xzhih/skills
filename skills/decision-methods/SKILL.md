---
name: decision-methods
description: "Use only when the user explicitly invokes this skill as an entry point for the Decision Methods skill set. After loading, inspect the current conversation and route to the most relevant dm-* skill: dm-reference-lens, dm-boundary-pass, dm-weight-check, or dm-state-capture."
---

# Use Decision Methods

## Overview

这个技能是 Decision Methods 的入口，不直接替代具体方法。

用户主动调用它时，你要根据当前对话判断应该接着使用哪个 `dm-*` 技能，而不是把所有方法都展开一遍。

## Routing

按当前任务选择：

```text
有参考产品、参考系统、竞品、旧项目、同类实现：
  使用 dm-reference-lens

正在讨论架构边界、分层、责任归属、复杂度应该归谁：
  使用 dm-boundary-pass

方案开始变重、核心揽太多责任、功能像平台化、配置或调试面变大：
  使用 dm-weight-check

讨论很长、用户纠正过多次、需要落盘、需要防止下一轮丢状态：
  使用 dm-state-capture
```

如果同时命中多个，按当前最阻塞的问题选择第一个。

常见组合：

```text
先借鉴参考对象，再收口判断：
  dm-reference-lens -> dm-state-capture

先定架构边界，再检查是否变重：
  dm-boundary-pass -> dm-weight-check

讨论已经变长，而且边界还没定：
  dm-boundary-pass -> dm-state-capture
```

## How to Continue

加载这个入口后：

```text
1. 用一句话说明你选择哪个 dm-* 技能，以及为什么。
2. 立即按那个技能的规则继续工作。
3. 不要停留在解释这套技能是什么。
4. 如果当前上下文不足以判断，就先问一个最小澄清问题。
```

## Common Mistakes

```text
把这个入口当成新的总方法
一次性加载或复述全部 dm-* 技能
明明应该进入具体技能，却继续泛泛讨论
用户没有主动调用时也自动使用这个入口
```

## One Line

```text
这是 Decision Methods 的手动入口：用户调用后，先判断当前任务，再切到最合适的 dm-* 技能。
```
