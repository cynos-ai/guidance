[English](README.md) | [简体中文](README-zh-CN.md)

# Cynos Guidance

面向 AI 编码 Agent 的可移植工程判断与项目沟通指导。

Cynos Guidance 是一个 Pi 扩展包，将一小段常驻系统提示词与高内聚的 Agent Skills 组合在一起。它提供可迁移的判断原则，而不是规定某种框架、仓库结构或详细工程流程。

Pi 是首个支持的 Harness。提示词和 Skills 保持 Harness 中立，未来可以增加其他适配器，而不需要重写内容本身。

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

## Pi 扩展包如何工作

`package.json` 声明一个扩展和公开 Skills：

```json
{
  "pi": {
    "extensions": ["./extensions/pi.js"],
    "skills": ["./skills"]
  }
}
```

扩展会把 [`principles/core.md`](principles/core.md) 注入系统提示词，并用稳定标记避免重复注入。Pi 会自动发现 `skills/` 下的两个标准 Agent Skills。

该扩展不注册工具、不访问网络，也不修改项目文件。提示词只提供指导，不构成安全或授权边界。

## 包含的内容

### 常驻原则

精简的常驻提示词要求 Agent：

- 先检查项目真实上下文，不依赖猜测；
- 把修改放在已有职责边界内；
- 选择最简单但完整的方案；
- 保留安全、兼容性和明确的错误处理；
- 如实报告验证结果，满足目标后停止；
- 从用户可观察行为出发，再逐步深入实现细节。

### Skills

| Skill | 职责 |
|---|---|
| [`engineering-judgment`](skills/engineering-judgment/SKILL.md) | 把软件设计、修改、诊断、重构、优化、迁移和验证作为一项完整的工程工作来处理。 |
| [`project-owner-communication`](skills/project-owner-communication/SKILL.md) | 面向懂行业但不依赖代码和内部名称理解系统的项目所有者，解释、调研、共同塑造、决策或压力测试项目方向。 |

沟通 Skill 由一套结果优先的表达内核和按需对话模式组成，覆盖苏格拉底式探索与决策、技术调研简报，以及 grill 或 premortem 等严格压力测试。这避免了多个 Skills 在同一段对话中争夺提问节奏。

两个公开 Skills 仍相互独立：一个规范工程工作，一个规范面向 Owner 的沟通。它们可以同时触发，但不互相依赖。

`.pi/skills/` 下的项目维护 Skills 只用于维护 Cynos Guidance 自身，不会进入 npm 包。

## 设计边界

Cynos Guidance 强调：

- 可移植判断，而不是具体技术方案；
- 少量常驻提示词，加按需加载的详细内容；
- 按用户意图组织高内聚 Skills；
- 可观察行为、明确边界和停止条件；
- 所有系统提示词和 Skill 内容均使用英文。

它不是：

- 完整的编码 Agent Runtime；
- 特定框架的最佳实践手册；
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

测试覆盖 Pi 系统提示词注入、Skill 元数据与职责边界、触发场景、提示词和 Skills 的纯英文要求，以及 npm 公开包内容。

## 发布

项目通过 [`.github/workflows/release.yml`](.github/workflows/release.yml) 使用 npm Trusted Publishing。请在 npm Trusted Publisher 中配置：

- GitHub organization or user：`cynos-ai`；
- repository：`guidance`；
- workflow filename：`release.yml`；
- environment：留空；
- allowed action：`npm publish`。

配置完成后，推送 `v0.1.0` 这样的版本标签会自动验证并发布 npm 包，同时创建附带 tarball 的 GitHub Release。

## 许可证

[MIT](LICENSE)
