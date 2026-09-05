# xzhih skills

[English](README.md) | 简体中文

可独立调用、按需串联的个人 skills。默认由当前模型完成工作，不要求多 agent、阶段签核或固定文档套件。

## 安装

```sh
npx skills add xzhih/skills --list
npx skills add xzhih/skills --all
```

按需安装单项，例如：

```sh
npx skills add xzhih/skills --skill agent-grilling
```

完整开发主线需要安装下列七项；只用某一阶段时可以单独安装它：

```sh
npx skills add xzhih/skills --skill dev-flow agent-requirements-analysis agent-spec agent-plan agent-eval steady-coding agent-review
```

## 开发主线

```text
需求分析 → 行为与边界 → 计划 ↔ 验收评估 → 执行与验证 → Review → 必要的修复复查
```

`dev-flow` 串联已授权的阶段，并复用已有需求、Spec 或计划。单独调用阶段 skill 就在该阶段结束，不自动执行后续工作。阶段接受清晰的用户描述，不要求上游文档经过正式命名或签核。验收标准在执行前明确，计划与评估可以互相修订。

| Skill | 职责 |
|---|---|
| `dev-flow` | 选择起点、推进完整流程、依据证据收尾 |
| `agent-requirements-analysis` | 从需求生长候选树，比较并裁剪分支，输出需求文档、Mermaid 和重要取舍原因 |
| `agent-spec` | 定义可观察行为、范围、非目标与关键异常边界 |
| `agent-plan` | 从当前源码与需求形成最小可执行步骤 |
| `agent-eval` | 定义验收标准、失败条件与验证证据，不执行测试 |
| `steady-coding` | 按范围实现、调试、验证与修复 |
| `agent-review` | 审查具体产物的正确性、遗漏与多余范围，明确自审及证据限制 |

需求树在行为足够明确、进入实现细节、分支被裁剪或需要关键用户决策时停止继续展开。模型依据证据解决局部选择，仅把影响方向且无法推断的问题交给用户。需求分析可以按需使用 grilling，不存在强制深挖或辩论关卡。

## 独立能力

| Skill | 职责 |
|---|---|
| `agent-improve` | 用户需要时审计代码库或分支，排序改进建议后停止，不自动进入 dev-flow |
| `agent-grilling` | 深挖隐藏需求、设计假设或故障根因，以证据区分解释；独立调查不自动修复 |
| `doc-driven-workflows` | 根据源码维护长期技术文档 |
| `codex-image-gen` | 通过配置的图片 API 生成和编辑图片 |

## 记录与恢复

普通任务留在对话中。用户要求文件或需要后续恢复时，优先使用项目既有位置，否则一份 `docs/dev-flow/<slug>.md` 保存需求、边界、计划、验收、证据和下一步；确有需要才拆分。长期技术文档沿用项目结构。

本次治理移除了 self-driving、runtime、lanes、integration-review、debate、project-context 和 discussion-workflows 独立入口。取舍、上下文读取与讨论结论保留在实际需要它们的阶段中。旧版维护记录位于 `docs/skill-evals/archive/`，不是当前流程规范。更新已有安装时，应检查安装器是否保留了已删除的旧 skill；本仓库变更不会自动清理本机安装目录。
