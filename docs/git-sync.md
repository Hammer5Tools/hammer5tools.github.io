# Git Sync & VMAP Merge

Built-in version control integration and intelligent 3-way merge driver designed specifically for Counter-Strike 2 `.vmap` level files.

---

## Overview

Collaborating on Source 2 maps in a team using traditional Git repositories is notorious for causing merge conflicts. Because `.vmap` files are large KeyValues3 text/binary documents with hundreds of entity nodes, standard line-based `git merge` often corrupts node trees or deletes changes made by one mapper when another mapper touches the same file.

Hammer5Tools solves this with:
1. **Integrated Git Sync Toolbar**: Live repository state, ahead/behind indicators, unstaged change badges, and one-click Commit / Pull / Push.
2. **Dedicated `.vmap` 3-Way Merge Driver (`gitvmapmerge.py`)**: An intelligent merge algorithm that understands Source 2 map structure, merging world geometry, entity property updates, and newly added nodes cleanly from concurrent branches.
3. **Interactive Conflict Resolver**: A visual dialog to resolve conflicts in non-map assets (materials, scripts, sounds).

---

## The Git Sync Toolbar Button

Located directly beside the Addon Selector in the Hammer5Tools bottom bar, the **Sync Button** provides continuous visual feedback:

| Visual State | Meaning |
|---|---|
| **Clean (Green / In Sync)** | Local branch matches remote `origin`. No uncommitted changes. |
| **Pending Changes (Blue Badge)** | You have uncommitted or untracked changes in the active addon folder. |
| **Ahead (Up Arrow `↑N`)** | You have local commits that need to be pushed to the remote repository. |
| **Behind (Down Arrow `↓N`)** | Remote repository has new commits that need to be pulled. |
| **Conflict (Red Alert)** | Merge conflict detected requiring manual resolution. |

---

## Sync Workflow

### 1. Committing Changes
1. Click the **Sync Button** (or choose **Commit** from the sync dropdown).
2. The commit dialog displays a summary of all modified, created, and deleted files in your addon.
3. Enter a descriptive commit message (or use the auto-generated conventional commit suggestion).
4. Click **Commit**.

### 2. Pulling Remote Changes
1. When the down arrow (`↓`) indicates remote changes, click **Sync Button > Pull**.
2. Hammer5Tools executes `git pull --rebase` (or standard merge based on settings).
3. If teammates modified the `.vmap` file concurrently, the custom **VMAP Merge Driver** automatically reconciles their edits with yours.

### 3. Pushing Changes
1. Click **Sync Button > Push** to upload your commits to GitHub / GitLab / self-hosted Git servers.

---

## The `.vmap` 3-Way Merge Driver

Hammer5Tools includes `src/gitvmapmerge.py`, which is registered as a custom merge driver in `.gitconfig` or `.git/config`:

```ini
[merge "vmapmerge"]
    name = Valve Source 2 VMAP 3-way merge driver
    driver = python "path/to/Hammer5Tools/src/gitvmapmerge.py" %O %A %B %P
```

### How the Merge Driver Works
When a conflict occurs:
1. **Ancestor Base (`%O`)**: The common base commit.
2. **Current Branch (`%A`)**: Your local changes.
3. **Incoming Branch (`%B`)**: Your teammate's changes.

The driver parses all three files into structured node hierarchies:
- **Entity Identity Tracking**: Matches entities and nodes by persistent GUIDs (`id`) rather than line numbers.
- **Additive Property Merging**: If User A moved `light_environment` and User B adjusted its brightness, both changes are combined into the final entity without conflict.
- **Node Insertion & Deletion**: New mesh nodes or props added in either branch are inserted cleanly into the parent world node list.
- **Conflict Isolation**: Only if both users edit the *exact same property* of the *same entity* to different values will a conflict marker be placed around that specific node.

---

## Conflict Resolution Dialog

If a conflict occurs in non-map files (e.g. conflicting text in `soundevents_addon.vsndevts` or script files):
1. The **Conflict Dialog** opens automatically.
2. Displays the conflicting file paths and diffs.
3. Choose **Keep Ours**, **Keep Theirs**, or **Open in External Merge Tool** (such as VS Code, WinMerge, or KDiff3).
4. Mark conflicts as resolved and finalize the merge with one click.
