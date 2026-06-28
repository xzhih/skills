# Doc-Driven Workflows Skill 设计文档

## 目标

创建一个可复用的 `doc-driven-workflows` skill，用来帮助 agent 保持代码和项目文档同步，同时避免把文档维护变成噪声和形式主义。这个 skill 同时支持初次建档 `bootstrap` 和日常维护 `maintenance`，但核心是方法论，不绑定任何具体项目架构。

## 核心定位

`doc-driven-workflows` 是一个防止文档漂移的 skill。

它不是“看到代码就写文档”的通用触发器。只有当用户明确要求文档驱动、代码/文档同步、架构索引、可追踪文档、全链路文档、UI/UX 操作流程、调用路径图，或项目指导文件明确要求当前类型的代码变更必须维护 doc-driven 文档时，才应该使用。

核心判断问题是：

> 如果未来的人或 agent 在这次代码变化后只阅读现有文档，会不会误解如何操作、集成、运行、修改或信任这个系统？

如果答案是“会”，或者源码证据显示存在值得追踪的不确定性，skill 才行动。否则保持安静。

## 调用门控

调用门控分两层：

- **Skill invocation gate**：是否应该使用这个 skill。
- **Mode eligibility gate**：使用后，当前项目是否具备 `bootstrap` 或 `maintenance` 条件。

存在 `docs/doc-driven-workflows/` 只说明 maintenance 可用，不说明每个普通编码任务都要自动运行这个 skill。

skill 只在以下情况使用：

- 用户显式调用或自然语言明确要求 doc-driven、文档同步、架构索引、全链路文档、操作流、调用路径或疑点 ledger。
- 当前任务正在改代码，且项目指导文件明确要求相关代码变更必须维护 doc-driven 文档。
- 当前任务是 review，且用户要求检查文档是否和代码一致。

skill 不在以下情况使用：

- 只是因为仓库存在 doc-driven 文档目录。
- 只是因为普通代码任务可能理论上影响文档，但项目没有相关指导文件，也没有用户要求。
- 只是因为仓库缺少文档。

Maintenance 判断运行在自然边界：代码改动完成后、review 结论整理时、提交前检查时，或用户明确询问文档同步时。它不在每次读文件、每个小编辑中途或无关任务里反复运行。

## 语言策略

skill 的回复默认使用用户当前语言。新建持久文档时，默认使用用户当前语言；用户明确指定文档语言时，使用指定语言。

维护已有文档时，优先保持目标文档的既有语言和术语风格。只有当目标文档语言混乱、用户明确要求切换语言，或新建文档没有既有语言时，才根据用户当前语言或指定语言确定文档语言。

如果文档服务于多语言团队，agent 在写入持久文件前应先简短复述语言约定。

这是一条 skill 级规则，不是某个项目的特殊规则。skill 不能硬编码中文、英文或任何固定语言。

## 模式

### Bootstrap 模式

Bootstrap 用于创建 doc-driven 文档体系。

Bootstrap 必须要求用户主动表达意图。只有当用户明确要求创建或初始化文档驱动文档、架构文档、全链路文档、源码关联文档、UI/UX 操作文档或类似文档体系时，才执行 bootstrap。

不能因为一个仓库缺少文档就自动 bootstrap。

默认位置：

```text
docs/doc-driven-workflows/
```

用户可以覆盖这个位置。如果仓库已有明确的架构文档 source of truth，agent 只有在确认不与用户要求冲突时，才可以使用已有位置。

Bootstrap 写文档前必须先做轻量取证，而不是凭模板发明架构。取证至少包括：

- 读取项目指导文件，例如 `AGENTS.md`、`CONTRIBUTING.md`、README 或等价文件。
- 识别真实参与者或使用者，例如人类用户、操作者、库消费者、CLI 使用者、服务调用方、自动化系统。
- 识别真实入口，例如页面、命令、包 API、服务接口、消息入口、定时任务、部署入口。
- 识别真实边界，例如模块、包、进程、设备、外部系统、第三方服务、文件或数据存储。
- 识别真实契约和状态，例如函数签名、API、事件、schema、配置、生命周期、错误和恢复路径。

不确定的地方写入 `open-questions.md` 或 pending section，不能写成 confirmed 架构。

### Maintenance 模式

Maintenance 用于在代码变化或 review 过程中维护已有 doc-driven 文档体系。

Maintenance 不能自动 bootstrap。只有当前项目已经存在以下任一条件时，才进入维护判断：

- `docs/doc-driven-workflows/`
- 已有文档索引明确声明自己是 doc-driven source of truth
- 项目指导文件指向了等价的文档体系

如果都不存在，skill 不应偷偷创建文档。它最多简短说明：没有发现 doc-driven 文档，因此跳过 maintenance。

Maintenance 进入前先解析路径：

- `doc_root`：优先使用用户指定路径；其次使用项目指导文件或文档索引声明的位置；最后使用默认 `docs/doc-driven-workflows/`。
- `ledger_path`：优先使用 `doc_root` 下已有疑点 ledger；其次使用文档索引声明的 ledger；最后使用 `doc_root/open-questions.md`。

后续项目指导文件、摘要和记录都引用解析后的真实路径，不硬编码默认路径。

路径检测必须轻量：先检查默认目录是否存在；如不存在，用 `rg` 或等价搜索在项目指导文件和文档索引中查找 `doc-driven`、`doc_root` 或 `docs/doc-driven-workflows` 等指针。检测不应读取整个文档树。

## Maintenance 判断方法

Maintenance 不使用架构形态词作为触发器，例如 frontend、backend、worker、admin、API、billing、app。这些词可以出现在项目文档中，但 skill 的判断方式必须是方法论式的。

agent 应该问：

- 现有文档中的某句话、图、操作步骤、契约、生命周期、不变量、调用路径或风险描述，会不会因为这次改动变得不准确？
- 读者如果按旧文档操作、集成、部署、测试或修改系统，会不会走错？
- 这次改动是否改变了交互路径、系统边界、契约、状态生命周期、失败/恢复方式、信任边界或外部依赖？
- 这次改动是否暴露了一个应该追踪、而不是默默忽略的实现疑点或产品疑点？

这些是判断提示，不是要求最终回答逐条输出的检查表。

## Maintenance 轻量发现流程

Maintenance 判断必须先做最小发现，避免为了得出 no-op 而读取大量文档。

推荐顺序：

1. 查看当前任务的实际变化范围，例如 diff、已修改文件、review 目标或用户点名的文件。
2. 读取 `doc_root/README.md` 或等价索引，了解文档路由。
3. 在 `doc_root` 内搜索 changed paths、符号名、入口名、流程名、契约名或用户点名关键词。
4. 只打开命中的候选文档。
5. 如果命中文档过多，优先打开索引指向的最相关文档；除非用户要求深度审计，否则不要展开全量文档树。

如果无法确定是否影响文档，并且没有明确证据，不要扩大读取范围；优先 no-op 或 record only，并在最终摘要中用一句话说明不确定性。

## 动作强度

Maintenance 有三种动作强度。

### No-op

当改动不会造成文档漂移时，使用 no-op。agent 不应加载大量文档，也不应输出长解释。如果需要报告，只说因为没有已记录行为变化，所以跳过 doc-driven maintenance。

### Small Sync

当文档影响明确、局部、且有源码证据时，使用 small sync。agent 直接更新相关文档，并且只把 confirmed 行为写进 confirmed 文档。

原则性示例：

- 已记录命令改名
- 已记录入口或函数路径改变
- 已记录操作步骤的按钮文案改变
- 已记录状态流改变
- 已记录图表中的某条边已经错误

这些只是例子，不应变成固定触发列表。

### Record Only

当影响范围大、不确定、依赖产品决策，或者把它写进 confirmed 文档会变成推测时，使用 record only。agent 应把问题记录到 open-question ledger 或 pending section，而不是重写 confirmed 架构。

当 agent 在整理文档时发现潜在 bug，但用户当前任务没有要求修复，也应使用 record only。

Small Sync 和 Record Only 的分界规则：如果无法确认应该直接更新 confirmed 文档，优先 Record Only。Confirmed 文档不能包含推测。

## 默认文档集合

Bootstrap 创建的是一组可以改名、合并、拆分、裁剪的默认文档，而不是强制模板。agent 必须根据取证结果实例化文档集合，只创建项目真实需要的文档。

推荐默认结构：

```text
docs/doc-driven-workflows/
  README.md
  system-map.md
  operation-flows.md
  data-and-state-flows.md
  contracts-and-interfaces.md
  call-paths.md
  open-questions.md
```

默认集合保持通用：

- `README.md`：索引、维护规则、当前项目的文档口径。
- `system-map.md`：参与者、模块、运行边界、部署或包边界。
- `operation-flows.md`：真实存在的角色如何操作系统，例如用户、管理员、操作者、CLI 使用者、SDK 使用者、内部人员。
- `data-and-state-flows.md`：持久化数据、状态生命周期、缓存、队列、文件、消息、迁移和恢复行为。
- `contracts-and-interfaces.md`：API、事件、函数签名、CLI 参数、文件格式、配置格式、schema 和外部协议。
- `call-paths.md`：从入口到实现的源码调用路径。
- `open-questions.md`：疑点、过期文档、产品决策和未确认问题。

小项目可以合并文件。大项目可以按真实产品、模块、包或服务边界拆子目录。skill 不能强制 Web/backend/admin 这种分法。

实例化原则：

- 有人类或消费方操作流程时，才创建或维护 `operation-flows.md`。
- 有持久化、生命周期、状态机、文件、消息、缓存或恢复逻辑时，才创建或维护 `data-and-state-flows.md`。
- 有跨边界契约时，才创建或维护 `contracts-and-interfaces.md`。
- 有需要未来 agent 跟踪的源码入口链路时，才创建或维护 `call-paths.md`。
- 项目太小或边界单一时，可以把这些内容合并到 `README.md`。

## Operation Flow 文档

Operation flow 必须从人类或消费方 actor 的角度书写。

只记录相关流程。相关流程指用户可见、操作者关键、消费方依赖、契约承载、失败高发、风险较高，或已经被现有文档记录的流程。

每个相关流程应记录：

- actor 从哪里进入流程
- actor 点击、输入、选择、拖拽、上传、调用或确认什么
- actor 观察到什么反馈或状态变化，例如 GUI 的 loading/disabled/success/error，CLI 的 exit code/stdout/stderr/progress，SDK 的响应结构或错误码，自动化流程的事件或日志
- 成功后出现什么消息、跳转、保存状态、事件或可见结果
- 失败时发生什么，如果源码可确认
- 哪些源码文件负责这个行为

这适用于图形 UI、移动 App、桌面 App、CLI、SDK、Admin 工具、内部工具、自动化入口和人工运维流程。

当项目存在有意义的人类或消费方交互时，skill 不应把这些操作行为埋在底层数据流文档里。

## Open-Question Ledger

不确定发现不能混进 confirmed 架构文档。

ledger 分级：

- `confirmed issue`：源码证据明确显示行为错误。
- `likely issue`：高度可疑，但还需要运行验证或产品确认。
- `question`：实现、产品或文档含义不明确。
- `stale doc`：已有文档和当前代码不一致。
- `product decision needed`：代码可以这样运行，但产品、运营、信任或体验需要明确决策。

证据门槛：

- `confirmed issue` 需要明确证据，例如违反显式契约、测试、schema、不变量，或源码中存在无歧义的错误路径。
- `likely issue` 用于强烈可疑但缺少运行验证、环境验证或产品确认的情况。
- `question` 用于证据不足，只能提出问题的情况。
- `stale doc` 只用于文档与当前源码、配置或真实行为不一致。
- `product decision needed` 用于技术上可行但需要产品、运营、体验、信任或组织决策的问题。

每条记录至少包含：

- 标题
- 等级
- 观察到的现象
- 风险
- 证据路径
- 建议下一步
- 当前状态

状态值至少包括：

- `open`
- `needs verification`
- `deferred`
- `resolved`
- `superseded`

写入规则：

- 优先更新已有相同问题，而不是重复追加。
- 如果存在多个 ledger，优先使用文档索引声明的 ledger；否则使用解析后的 `ledger_path`。
- 修复后应更新状态和证据，不要直接删除历史疑点，除非项目文档已有清理规则。

ledger 应该足够敏感，能捕捉疑点；也要足够精确，不能把所有疑点都写成 bug。

## 项目指导文件更新

Bootstrap 必须更新项目指导文件，例如 `AGENTS.md`、`CONTRIBUTING.md` 或等价 agent/developer guide。

规则应保持简短：

- doc-driven 文档位于 `docs/doc-driven-workflows/`
- 当代码变化会让这些文档失真时，必须同步更新对应文档
- 未解决的疑点或潜在问题记录到 `open-questions.md`

实际写入时应引用解析后的 `doc_root` 和 `ledger_path`，而不是无条件使用默认路径。

Maintenance 应轻量检查这条规则是否仍然存在。检查方式是搜索项目指导文件中是否包含解析后的 `doc_root` 或明确 doc-driven 维护规则；这是一次轻量搜索，不是完整重读。

Maintenance 不应静默修改项目指导文件。只有用户明确要求文档维护、当前任务本身包含文档维护，或 bootstrap 正在执行时，agent 才能补回规则。其它情况下，只在最终摘要中说明规则缺失。

## 噪声策略

skill 默认保持安静。

Maintenance 过程中避免长篇过程叙述。其它 skill 可能也在工作，`doc-driven-workflows` 不应抢占对话。

最终输出使用可追踪摘要：

- 更新了哪些文档
- 这些文档对应了哪些代码或行为变化
- 记录了哪些疑点及等级
- 哪些更新被跳过，以及原因

除非用户询问，不输出大段后续建议。

## 与其它 Skill 的关系

这个 skill 可以和规划、实现、review、多 agent 工作流配合，但不替代它们。

- 设计新的 doc-driven skill 或大型文档体系前，使用 brainstorming。
- 已确认设计后需要实施计划时，使用 writing-plans。
- 只有用户明确要求多 agent 或反复 review/repair 时，使用 multi-agent-orchestration。
- 实际代码修改使用 careful-coding 或其它相关实现 skill。

`doc-driven-workflows` 只负责文档漂移判断和文档同步边界。其它 skill 负责各自领域。

如果当前环境没有这些 companion skills，agent 使用自身能力继续。只有缺失的 skill 会实质影响工作质量时，才在最终摘要中说明。

## 成功标准

skill 成功的表现：

- 没有用户意图或已有 doc-driven 文档体系时，不触发大范围文档工作。
- Bootstrap 能创建清晰、源码关联、可追踪的文档体系。
- Maintenance 只在代码变化会让文档误导读者时更新文档。
- Operation flow 从真实操作者或消费方行为出发，而不只是实现细节。
- 调用路径有源码依据；如果创建或维护 Mermaid 图，图也必须有源码依据。
- 未确认发现进入分级 ledger，不污染 confirmed 文档。
- 项目指导文件告诉后续 agent 和开发者如何维护文档同步。
- 最终输出简洁、可追踪、低噪声。

## 非目标

- 不创建适用于所有项目的固定文档分类学。
- 不强制 Web/backend/admin 术语。
- 不在用户只要求记录疑点时自动修 bug。
- 不在无关任务中加载所有文档。
- 不做表演式文档更新。
- 不硬编码文档语言。
