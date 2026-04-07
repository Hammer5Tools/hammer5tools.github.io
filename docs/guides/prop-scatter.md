# Selection: Randomized Prop Scatter

Natural-looking scatter for props like rocks, trash, or debris.

## 1. Setup Elements
Use a **PlaceInSphere** element for circular or spherical distribution.
- Set `m_PlacementMode` to `CIRCLE`.
- Use a `m_nCountMin/Max` of 50-80 for a dense patch.

## 2. Distribution
Change the `m_DistributionMode` from `UNIFORM` to `POISSON`. 
- This ensures a natural distribution while preventing props from overlapping too much.

## 3. Configuration
Add **TraceInDirection** to drop all props to the ground below.
- Set `m_vTraceDirection` to `[0, 0, -1]`.
- Set `m_flSurfaceUpInfluence` to `1.0` if you want props to align to the ground's slope.

> [!TIP]
> **Variation**
> Add a `PickOne` child under the scatter element and place several rock variations inside it. SmartProps will pick a different one for each point.
