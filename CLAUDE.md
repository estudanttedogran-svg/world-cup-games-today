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
