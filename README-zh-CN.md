[English](README.md) | [简体中文](README-zh-CN.md)

# Cynos Guidance（已归档）

> 本项目已于 2026-08-30 退役，不再维护。

请使用仍在维护的 [Cynos Rules](https://github.com/cynos-ai/rules)，其中包含工程、沟通、项目文件和 Git 规则。

## 对使用者的影响

已发布的 `@cynos-ai/guidance` npm 版本继续保留，仅用于避免现有安装立即失效。所有版本均已标记 deprecated，不再提供新功能、修复或安全更新，不建议新安装。

GitHub 仓库、tag、Release 和源码历史继续以只读方式保留。

## 迁移

从 Pi 移除旧包：

```bash
pi remove npm:@cynos-ai/guidance
```

然后打开 [Cynos Rules README](https://github.com/cynos-ai/rules#readme)，把其中的安装或更新提示词交给能够访问目标项目的 AI。Rules 会合并到项目原生规则入口和 `docs/rules/**`，不再使用 npm 包或运行时提示词注入。

## 为什么退役

- `engineering-judgment` 与现有工程规则大量重复；
- Guidance 0.1 中有价值的输出组织思想已进入 `docs/rules/communication.md`；
- Guidance 0.2 把沟通扩展成了本目标不需要的对话工作流；
- 项目自行保存的 Markdown 规则比为不同 AI 宿主维护运行时 Adapter 更容易迁移和更新。

## 历史版本

- `v0.1.1`：原始的精简工程判断和项目负责人沟通设计；
- `v0.2.0`：拆分沟通 Skills 后的最后一个正式版本。

历史版本安装到 Pi 后仍会注入提示词并注册 Skills。deprecated 不会关闭已经安装的本地包；需要显式移除才能停止该行为。

## License

[MIT](LICENSE)
