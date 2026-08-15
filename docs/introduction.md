# Introduction

Welcome to the **Hammer 5 Tools** documentation. Hammer 5 Tools is a comprehensive, open-source desktop suite engineered to streamline the Counter-Strike 2 Workshop workflow for level designers, environment artists, audio designers, and technical modders.

![Hero Video](videos/hero.mp4)

> [!NOTE]
> **Built for Source 2 & Counter-Strike 2**
> Hammer 5 Tools is purpose-built to operate alongside the Counter-Strike 2 Workshop Tools, interfacing directly with Valve's KeyValues3 (KV3), VPK, and compiled asset formats.

---

## Core Toolkit Architecture

Hammer 5 Tools unifies multiple specialized editors and utilities into a single integrated environment:

### Visual Editors
- **[SmartProp Editor](#smart-prop-editor)**: Node-based visual editor for procedural props (`.vsmart`), supporting real-time 3D viewport previews, expressions, and deformers.
- **[SoundEvent Editor](#sound-editor)**: Comprehensive editor for `soundevents_addon.vsndevts`, featuring live NetConsole playback, curve visualizers, and base game soundevent decompilation.
- **[Audio Editor](#audio-editor)**: Built-in audio editor for inspecting waveforms, setting RIFF cue loop points, and applying DSP volume and fade ramps.
- **[DetailProp Editor](#detail-prop-editor)**: Visual management of `scripts/detail_prop_types.vdata` for procedural grass, rocks, and clutter bound to material layers.
- **[AssetGroup Maker](#asset-group-maker)**: Batch asset generator creating hundreds of Source 2 materials, models, and batch compile scripts from templates.
- **[Hotkey Editor](#hotkey-editor)**: Customizable shortcut manager and preset switcher for Hammer, ModelDoc, and other Source 2 tools.
- **[Loading Editor](#loading-editor)**: Multi-resolution loading screen screenshot generator, history timeline, and map icon / description manager.

### Build & Migration Pipeline
- **[Map Builder](#map-builder)**: Fast, full, and batch compile manager for `.vmap` files with live telemetry (CPU/RAM) and automated cubemap baking via NetConsole.
- **[UnrealPorter](#unreal-porter)**: Full-featured bridge converting Unreal Engine 5 levels, meshes, PBR materials, textures, and lights into Source 2 assets.
- **[SourcePorter](#source-porter)**: Automated porting suite converting GoldSrc and Source 1 BSP maps, models, materials, and textures into Source 2 with issue auto-repair.
- **[Git Sync & VMAP Merge](#git-sync)**: Team collaboration system with an intelligent 3-way merge driver specifically built for Source 2 `.vmap` files.
- **[Addon Manager & Exporter](#addon-manager)**: Package, export, import, and organize CS2 addon projects with dependency resolution and clean release archiving.
- **[Cleanup Tool](#cleanup)**: Sweeps unused assets from the addon content directory and purges the `_vrad3` lightmap cache.

---

## Explore Community Assets

<a href="vsmart-library.html" class="btn btn-primary" style="display: inline-flex; align-items: center; text-decoration: none; padding: 0.6rem 1.2rem; border-radius: 6px; font-weight: 600; background: var(--color-primary); color: white;">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  Explore VSmart Library
</a>
