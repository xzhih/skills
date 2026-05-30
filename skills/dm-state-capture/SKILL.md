---
name: dm-state-capture
description: Use when a discussion is long, corrected repeatedly, likely to continue later, or too important to leave only in chat. Capture the current truth, user corrections, settled decisions, deferred questions, stale references, and source-of-truth pointers into durable files.
---

# 记录讨论状态

## Overview

这个技能用来防止长讨论丢状态。

它的目标不是先写漂亮文档，而是保证下一轮还能从真实进度继续，而不是重新猜一遍。

## When to Use

这些情况使用：

```text
对话已经很长
用户做过多次纠正
旧名称被新名称替换了
并行调研返回了有用内容
对话可能被压缩
用户要求落盘
下一轮讨论依赖已经说清楚的细节
```

这些情况不要用：

```text
当前只是一个很短的小问题
还没有形成任何值得保留的判断
```

## What to Capture

存在时必须记录：

```text
哪些判断变了
现在以什么为准
哪些只是历史参考
哪些以后再说
哪些不要无意识重开
用户纠正过什么
当前还没解决什么
```

## File Split

使用两层保存：

```text
inbox/ 或类似目录：
  原始资料、文章、代码摘录、调研整理、还没定论的笔记

docs/ 或类似目录：
  当前结论、主题记录、架构记录、复盘、阶段记录
```

原始资料和当前判断不要混在一起。

## Default Output

按需要创建：

```text
讨论记录：
  记录这轮讨论怎么推进、哪里发生转向

主题记录：
  一个重要边界或结论一个文件

阶段记录：
  当前判断、当前依据、以后再说什么、还有哪些问题

复盘记录：
  多个主题记录之间是否一致、命名是否已经更新
```

## Minimal Checkpoint Template

长对话里，阶段记录至少写：

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

## Common Mistakes

```text
只记标题，不记判断具体怎么变了
没有写“现在以什么为准”
新旧名称混着留，后续无法搜索
原始资料和当前结论放在同一个文件里
以为下轮还能记得，于是不落盘
```

## One Line

```text
把长讨论里的真实判断持续写下来，让下一轮能从真实进度继续。
```
