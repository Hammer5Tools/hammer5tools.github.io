# SmartProp Editor

Procedural placement systems in Source 2 which enable level designers to create complex, rule-based prop arrangements. 

## Key Concepts

*   **Elements**: Building blocks defining what gets placed and how.
*   **Evaluation State**: Current transform, color, and properties during evaluation.
*   **Selection Criteria**: Rules determining if an element is valid (expressions, weights).
*   **Modifiers**: Operations like translation, rotation, and scaling.
*   **Variables**: Named values exposed as parameters in Hammer.

## Interface

### Explorer & File Actions
| Action | Description | Hotkey |
| --- | --- | --- |
| Save | Saves the current .vsmart file | Ctrl + S |
| New File | Creates a new SmartProp file | Ctrl + N |
| Open As | Select and open an existing file | Ctrl + O |
| Real-time save | Auto-saves file on every change | - |

### Hierarchy Actions
| Action | Description | Hotkey |
| --- | --- | --- |
| New Element | Opens the element creation menu | Ctrl + F |
| Duplicate | Duplicates selected elements | Ctrl + D |
| Copy / Paste | Clipboard operations for elements | Ctrl + C / V |
| Paste with Repl. | Replace text during pasting | Ctrl + Shift + V |

## Placement & Distribution

The editor supports several sophisticated placement methods:

- **PlaceInSphere**: Circular or spherical distribution.
  - **UNIFORM**: Evenly spaced.
  - **POISSON**: Natural clustering avoidance.
- **PlaceOnPath**: Distribute along path entities from Hammer.
- **Layout2DGrid**: N×N grid patterns.

## Coordinate Spaces
Understanding the space is crucial for correct placement:
- **WORLD_SPACE**: Ignors all transforms; uses absolute coordinates.
- **OBJECT_SPACE**: Relative to the SmartProp's location in Hammer.
- **ELEMENT_SPACE**: Relative to the current element (the most common).

> [!NOTE] 
> **Performance Tip**
> Always enable `m_bDetailObject` for small, repeating decorative props to provide automatic LOD transitions and better performance.

> [!TIP]
> Use POISSON distribution for more natural-looking rock or foliage scatter.
