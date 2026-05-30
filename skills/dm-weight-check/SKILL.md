---
name: dm-weight-check
description: Use when a product, app, system, tool, or agent direction starts feeling heavy. Check whether the core is absorbing too many responsibilities, names, settings, debug surfaces, platform behaviors, or future possibilities, then decide what to move out, rename, or defer.
---

# 减重检查

## Overview

这个技能用来回答一个问题：

```text
复杂度是不是正在往不该去的地方回流？
```

它不讨论“能不能做”，而先讨论：

```text
应该归谁
应该放哪一层
现在是不是已经变重了
```

## When to Use

这些情况使用：

```text
核心层开始揽越来越多责任
命名和职责开始发散
一个方案越讨论越像大平台
产品面、状态层、扩展层开始互相混
需要检查某次讨论是不是把复杂度放错地方了
```

这些情况不要用：

```text
问题还停留在“我们想要什么”，还没到复杂度分配
只是需要记录讨论状态，不是在做减重判断
```

## Core Questions

逐项问：

```text
我们是不是因为它看起来重要，就把一个新系统放进核心了？
我们是不是把用户界面的事情说成了中心协调层状态？
我们是不是因为“以后可能有用”保留了太多东西？
我们是不是把授权、加载、放进上下文、允许执行混成了一件事？
我们是不是把扩展入口做成了市场或平台？
我们是不是把调试做成了默认全量追踪？
我们是不是把状态层、知识层或配置层做成了资料库或流程仓库？
我们是不是让自动化、扩展或集成单元拥有了自主后台运行能力？
```

## Warning Signs

常见信号：

```text
核心部分拥有的名词越来越多
一个文档里不断出现 Manager 和 Gateway
流程变成了默认容器
状态层或知识层开始保存完整操作步骤
调试默认要求保留完整原始数据
扩展或集成入口开始像市场
扩展、插件或集成想要自己在后台运行
测试必须依赖真实平台、真实模型或真实外部服务
```

## Default Fixes

发现变重时，优先考虑：

```text
把能力放到外部执行
把平台相关内容放到平台层或宿主层
把可选内容做成扩展、插件或可插拔集成
把调试放到显式开启的路径
把产品细节留到产品讨论
先单独写主题记录，不要立刻做成平台
```

## Output

一次好的减重检查应该留下：

```text
1. 哪些地方仍然清楚、克制
2. 哪些词或职责开始变重
3. 哪些内容应该改名、移动或延后
4. 现在以哪些文档为准
5. 哪些旧文档只能当历史参考
```

## Common Mistakes

```text
把“功能重要”误当成“必须放进核心”
只说方案复杂，不说复杂度到底该归谁
没有把产品面、状态层、扩展层拆开
把调试、市场、自动化平台当成默认方向
发现变重后，继续往原方向补规则，而不是重新分层
```

## Read If Needed

需要更细检查时，再读：

- [audit-checklist.md](references/audit-checklist.md)

## One Line

```text
减重检查就是反复问：我们是在做一个清楚的系统，还是不小心开始做一个大平台？
```
