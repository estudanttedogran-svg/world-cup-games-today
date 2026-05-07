# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## GitHub Repository

Este projeto está sincronizado com o GitHub em:
**https://github.com/estudanttedogran-svg/world-cup-games-today**

## Auto-sync com GitHub

A cada arquivo criado ou editado (via Write ou Edit), um hook do Claude Code executa automaticamente:
```
git add -A && git commit -m "Auto-update: <data>" && git push
```

Isso garante que todas as alterações feitas pelo Claude sejam enviadas ao GitHub sem intervenção manual.

O hook está configurado em `.claude/settings.json` e usa shell bash.

## Regra de Continuidade Obrigatória

Nunca recomece o projeto do zero sem autorização explícita.
Antes de qualquer nova tarefa, leia CURRENT_STATUS.md, PROJECT_BRIEF.md e IMPLEMENTATION_PLAN.md.
Continue apenas a próxima fase indicada.
Ao terminar uma fase, atualize CURRENT_STATUS.md e pare — aguarde autorização do usuário para continuar.

## Configurações do ambiente

- **GitHub CLI:** instalado em `C:\Program Files\GitHub CLI\gh.exe`
- **Usuário GitHub:** `estudanttedogran-svg`
- **Git user.email:** `davi.dalciano86@gmail.com`
- **Git user.name:** `estudanttedogran-svg`
- **Branch principal:** `master`
- **Arquivo local não versionado:** `.claude/settings.local.json` (listado no `.gitignore`)
