---
name: dm-reference-lens
description: Use when a product discussion has reference products, systems, or projects. First calibrate the local product boundary, then compare what the references do, explain what should not be copied, and turn the comparison into decision-ready recommendations.
---

# 用参考项目驱动产品讨论

## Overview

这个技能用来处理这种工作：

```text
不是闭门猜产品
也不是看到参考就直接照搬
而是：
先校准本地边界，再对照参考对象，最后给出可拍板判断
```

它既适用于从零开始的项目，也适用于已有文档和阶段结论的项目。

## When to Use

这些情况使用：

```text
用户说要参考某个产品、系统或项目
当前主题需要“参考做法 + 本地判断”
项目里有一个或多个可用参照物
用户想看的是可拍板建议，不是资料堆积
```

这些情况不要用：

```text
用户只是问一个孤立产品小问题
当前没有可用参照物，而且用户也不需要比较
用户要你直接实现
```

## Local First

在看参考前，先回答：

```text
这个项目想成为什么
这个项目不要成为什么
当前这个主题的本地约束是什么
哪些结论已经确认
哪些只是历史材料
```

如果项目已经有 source of truth，就先读它。

如果没有，就先建立最小状态记录，不要裸聊到最后。

## Choose References

参考对象可以是：

```text
直接竞品
相邻领域产品
同类交互系统
内部旧项目
更成熟的历史版本
架构原型
同公司另一个产品
```

选择原则：

```text
优先选和当前主题真的有关的
优先选能形成对照的
不要为了显得充分而拉一堆参考
```

默认建议：

```text
最好 2 个参考对象
如果只有 1 个可用，也可以继续
如果超过 2 个，先挑最相关的 2 个
```

## Default Workflow

每个主题都按这个顺序推进：

```text
1. 明确当前讨论点
2. 选参考对象
3. 每个参考对象开一个 subagent
4. 你自己并行看本地材料
5. 汇总：
   - 哪些是参考做法
   - 哪些不该直接搬
   - 放回本项目当前边界后怎么收
6. 给用户一版可直接拍板的讨论内容
7. 用户同意后，再回写 source of truth
```

## Response Shape

每一轮尽量保持这个结构：

```text
1. 已确认约束
2. 参考对象 A 的做法
3. 参考对象 B 的做法
4. 放回当前项目后哪些该学、哪些不该搬
5. 我的建议判断
```

如果只有一个参考对象，也尽量保留结构感。

## What Must Stay Separate

讨论时先检查当前主题里有没有这些混淆：

```text
当前执行状态 != plan 本体
复杂任务 != 自动外显 plan
外部服务账号状态 != 全局 account center
message 里的结果对象 != inspector 里的全量浏览
overview != detail transcript
轻量 control != 应该命令化的一切
debug 能力 != developer console
参考对象的习惯 != 当前产品该采用的判断
```

## When Not to Copy the Reference

这些情况要明确说“不适合直接搬”：

```text
做法明显绑定某种宿主
做法明显绑定某种产品心智
做法明显来自 workflow builder 逻辑
做法明显依赖 trace/debug-first 姿态
做法明显会让当前项目变重
做法和当前项目已确认边界冲突
```

不要只说“我们也可以这样”，要说明为什么放回当前项目后不一定成立。

## Two Phases

这个技能最重要的是两阶段纪律：

### 阶段一：讨论

```text
逐题给用户看：
- 已确认约束
- 参考做法
- 哪些该学
- 哪些不该搬
- 建议结论
```

### 阶段二：合并

```text
用户明确同意后：
- 回写当前项目的 source of truth
- 更新相关 topic docs / index / review notes（如果这些对象存在）
- 清理残留 open question wording
```

不要把讨论和合并混在一起。

## Default Heuristics

如果当前主题触及设置、控制或管理面，优先用这条判断：

```text
只要不是极快、极明确、低歧义的动作，
就优先自然语言，而不是命令或表单。
```

如果当前主题触及状态、结果、history、inspector、debug，优先用这条判断：

```text
默认只显示用户当前需要理解的最小信息。
更深内容按需下钻。
任何 surface 都不要轻易滑向：
  workflow builder
  trace viewer
  developer console
  global manager
```

## Common Mistakes

```text
只看参考，不先校准本地边界
把参考对象当模板，而不是镜子
讨论还没拍板，就偷偷回写主文档
把所有“能配置的东西”都命令化
没有指出哪些做法不适合直接搬
```

## One Line

```text
先校准本地边界，再对照参考对象，逐题拍板，用户同意后再把结论合并回当前项目。
```
