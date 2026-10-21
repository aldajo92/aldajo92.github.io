# AngySim mini playground

Author: Alejandro Daniel José Gómez Flórez.
Source: https://github.com/AngySimXYZ/AngySim

`arena.json` is copied unchanged from
`angysim_app/public/scenarios/lidar-keyboard.json` in the local AngySim checkout.
`public/angysim/mark.svg` is copied from `LogoDesign/angysim-mark-64.svg`.
The original license is retained at `public/angysim/LICENCE.txt`.

The joystick is adapted from `src/design/primitives/Joystick.tsx`. Vehicle
motion uses the heading-first unicycle integration documented by
`src/simulation/physics/KinematicVehicleMotionRuntime.ts`. The scenario's
forward/reverse/angular speeds and sensor offset are retained.

This standalone React/SVG adaptation adds collision blocking for the arena
walls and pillars. It computes 120 ideal geometric rays as the vehicle moves,
with a 30 Hz view. The full source scenario specifies 361 rays at 10 Hz with
sensor noise. Noise, ROS, the full simulation engine, and its UI shell are not
included. No backend settings or credentials are copied.
