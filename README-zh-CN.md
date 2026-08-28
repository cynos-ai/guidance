[English](README.md) | [简体中文](README-zh-CN.md)

# Cynos Guidance

面向 AI Agent 的可移植系统指导与高内聚按需 Skills。

Cynos Guidance 是一个 Pi 扩展包，将一小段跨领域常驻系统提示词与独立触发的 Agent Skills 组合在一起。常驻层建立一致的行为和沟通基线；只有任务需要时，Skills 才补充更深入的对话方式或领域判断。

Pi 是首个支持的 Harness。内容本身保持 Harness 中立，未来可以增加其他适配器，而不需要重写提示词或 Skills。

## 使用 Pi 安装和更新

安装 npm 正式版本：

```bash
pi install npm:@cynos-ai/guidance
```

后续更新：

```bash
pi update npm:@cynos-ai/guidance
```

也可以更新所有已安装的 Pi 扩展包：

```bash
pi update --extensions
```

还可以直接安装 GitHub 当前版本：

```bash
pi install https://github.com/cynos-ai/guidance
```

安装后重启 Pi。使用 `pi config` 可以查看或禁用单项资源。

## 如何组合

```text
领域 Skill       → 决定任务工作和证据要求
对话 Skill       → 决定特定对话如何推进
常驻提示词       → 决定每轮回答如何建立依据和组织表达
用户明确要求     → 决定深度、节奏和产物格式
```

各层可以组合，但不互相依赖。例如，软件迁移选择可以同时使用 `engineering-judgment` 和 `decision-support`，购买决策则可能只使用 `decision-support`。

## 常驻提示词

Pi 扩展每轮只注入一次 [`principles/core.md`](principles/core.md)。精简的常驻提示词要求 Agent：

- 基于已有上下文和可发现事实判断；
- 不为了方便的机制而缩窄用户结果；
- 匹配用户的领域水平，先给出有用答案；
- 渐进披露机制和证据；
- 区分事实、推断、建议、未知项和阻塞；
- 用户纠正后重新检查依赖结论；
- 只问会改变路径的问题，避免仪式化确认；
- 保留正式产物规范、安全边界和真实验证结果；
- 满足目标后停止。

## Skills

Pi 会递归发现 `skills/` 下的公开 Skills。

### 沟通

沟通 Skills 不限定领域，按对话意图组织。

| Skill | 职责 |
|---|---|
| [`guided-discovery`](skills/communication/guided-discovery/SKILL.md) | 通过引导式提问澄清模糊目标、问题、想法、需求或结果，必要时维护稳定的端到端模型。 |
| [`decision-support`](skills/communication/decision-support/SKILL.md) | 使用标准、证据、取舍、推荐和有边界的验证需求组织明确决策。 |
| [`stress-test`](skills/communication/stress-test/SKILL.md) | 使用假设探查、不利场景、premortem 或替代方案，挑战已有计划、论点、策略或设计。 |

### 工程

领域 Skills 负责声明领域内的任务判断。

| Skill | 职责 |
|---|---|
| [`engineering-judgment`](skills/engineering/engineering-judgment/SKILL.md) | 把软件设计、修改、诊断、重构、优化、迁移和验证作为一项完整的工程工作来处理。 |

`.pi/skills/` 下的项目维护 Skills 只用于维护 Cynos Guidance 自身，不会进入 npm 包。

## 从 0.1.x 迁移

`0.2.0` 删除 `project-owner-communication`，不提供兼容别名。原职责迁移如下：

| 旧用途 | 新 Owner |
|---|---|
| 普通解释、变更报告和故障说明 | 常驻提示词，不再需要 Skill 命令 |
| 澄清目标、结果或边界 | `guided-discovery` |
| 在选项、供应商、模型或路线之间决策 | `decision-support` |
| 对方案进行 grill、red team 或 premortem | `stress-test` |

`engineering-judgment` 名称保持不变。内部目录变为嵌套路径，不影响 `/skill:engineering-judgment` 或自动触发。

## 扩展包行为

`package.json` 声明一个扩展和一个递归 Skill 根目录：

```json
{
  "pi": {
    "extensions": ["./extensions/pi.js"],
    "skills": ["./skills"]
  }
}
```

扩展只修改系统提示词，不注册工具、不访问网络，也不修改项目文件。提示词只提供指导，不构成安全或授权边界。

## 设计边界

Cynos Guidance 强调：

- 少量常驻基线，加按需加载的详细内容；
- Skills 具备独立触发和独立结果；
- 沟通模式与领域任务判断相互分离；
- 可移植判断，而不是具体技术方案；
- 可观察行为、明确证据边界和停止条件；
- 所有公开系统提示词和 Skill 内容均使用英文。

它不是：

- 完整的 Agent Runtime 或通用 Skill 市场；
- 强制应用于所有请求的固定对话框架；
- 特定框架的工程手册；
- 某个仓库的项目记忆；
- 工作流或审批引擎；
- 测试、权限、沙箱或 Review 的替代品；
- 对所有模型行为一致性的保证。

## 开发

要求 Node.js 22.19 或更高版本。

```bash
npm install
npm run verify
npm run pack:dry-run
```

确定性测试覆盖包结构、提示词注入、Skill 元数据、链接、语言和行为探针结构。[`evaluations/behavior-probes.json`](evaluations/behavior-probes.json) 是定性评审清单；CI 不声称能够测试模型路由或回答质量。

## 发布

项目通过 [`.github/workflows/release.yml`](.github/workflows/release.yml) 使用 npm Trusted Publishing。请在 npm Trusted Publisher 中配置：

- GitHub organization or user：`cynos-ai`；
- repository：`guidance`；
- workflow filename：`release.yml`；
- environment：留空；
- allowed action：`npm publish`。

配置完成后，推送 `vX.Y.Z` 这样的版本标签会自动验证并发布 npm 包，同时创建附带 tarball 的 GitHub Release。

## 许可证

[MIT](LICENSE)
