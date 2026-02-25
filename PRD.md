# Planning Guide

A gym routine tracker that automatically displays today's workout and helps users track their sets with an integrated rest timer.

**Experience Qualities**: 
1. **Focused** - Clear visual hierarchy that keeps attention on the current exercise without distraction
2. **Motivating** - Bold colors and satisfying interactions that encourage completion and celebrate progress
3. **Efficient** - Quick access to timer controls and set tracking without unnecessary taps or navigation

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-view application with timer functionality and checklist state management, but doesn't require complex navigation or data manipulation beyond tracking completion state.

## Essential Features

**Auto Day Selection**
- Functionality: Detects current day of week and displays corresponding workout
- Purpose: Eliminates manual navigation, user sees their workout immediately
- Trigger: App load
- Progression: App opens → Detects current day → Displays matching workout from routine JSON
- Success criteria: Correct workout shown for current day (Monday = Espalda, Tuesday = Pecho, etc.)

**Exercise Set Tracking**
- Functionality: Track completion of individual sets within each exercise
- Purpose: Provides clear progress visibility and prevents losing track mid-workout
- Trigger: User taps on a set indicator
- Progression: User views exercise → Taps set circle → Set marked complete → Visual confirmation
- Success criteria: Each set can be toggled independently, visual state persists during session, all sets can be completed

**Rest Timer**
- Functionality: Countdown timer for rest periods between sets
- Purpose: Optimize workout timing and recovery
- Trigger: User completes a set or manually starts timer
- Progression: Set completed → Timer auto-starts (configurable duration) → Countdown displays → Audio/visual alert at completion → Ready for next set
- Success criteria: Timer counts down accurately, can be paused/resumed/reset, provides clear notification when complete

**Progress Visualization**
- Functionality: Show overall workout completion percentage
- Purpose: Motivate user to complete full routine
- Trigger: Automatic as sets are marked complete
- Progression: Sets completed → Progress bar updates → Visual milestone at 100%
- Success criteria: Accurate calculation of completed vs total sets

## Edge Case Handling

- **Weekend Days**: Display motivational rest day message or next scheduled workout preview
- **Invalid/Missing Data**: Show error state with clear messaging if routine JSON is malformed
- **Mid-Workout Refresh**: Preserve completion state using useKV to prevent data loss
- **Timer Running During Navigation**: Timer continues in background, state preserved
- **Rapid Set Toggling**: Debounce or handle quick repeated taps gracefully
- **Custom Rep Values**: Support both numeric reps (12) and text values ("al límite", "pasillos")

## Design Direction

The design should feel like a personal trainer—energetic, bold, and supportive. It should evoke intensity and focus during the workout while remaining calm and readable. Think athletic performance apps with strong color blocking, generous spacing, and clear typographic hierarchy that works in a gym environment (visible at arm's length, readable with quick glances).

## Color Selection

Athletic performance aesthetic with high-energy accents and strong contrast for gym readability.

- **Primary Color**: `oklch(0.45 0.15 265)` - Deep energetic purple/blue that communicates strength and focus without being aggressive
- **Secondary Colors**: 
  - Background: `oklch(0.98 0.01 265)` - Near-white with subtle purple tint for cohesion
  - Card surfaces: `oklch(1 0 0)` - Pure white for exercise cards to stand out
- **Accent Color**: `oklch(0.65 0.22 145)` - Vibrant energetic green for completion states and active timers, represents achievement and go-signal
- **Foreground/Background Pairings**: 
  - Primary on Background `oklch(0.45 0.15 265)` on `oklch(0.98 0.01 265)` - Ratio 7.2:1 ✓
  - Foreground on Background `oklch(0.20 0.02 265)` on `oklch(0.98 0.01 265)` - Ratio 12.8:1 ✓
  - Accent on Card `oklch(0.65 0.22 145)` on `oklch(1 0 0)` - Ratio 4.9:1 ✓
  - White on Primary `oklch(1 0 0)` on `oklch(0.45 0.15 265)` - Ratio 7.2:1 ✓
  - White on Accent `oklch(1 0 0)` on `oklch(0.65 0.22 145)` - Ratio 4.9:1 ✓

## Font Selection

Strong, athletic typography that communicates confidence and is easily readable during physical activity.

- **Typographic Hierarchy**: 
  - H1 (Day Header): Space Grotesk Bold/32px/tight tracking (-0.02em)
  - H2 (Muscle Group): Space Grotesk SemiBold/24px/normal
  - H3 (Exercise Name): Space Grotesk Medium/18px/normal
  - Body (Set/Rep Info): Space Grotesk Regular/16px/relaxed (1.5)
  - Timer Display: Space Grotesk Bold/48px/tighter (-0.03em) for clear visibility
  - Small Text (Labels): Space Grotesk Medium/14px/wide tracking (0.02em)

## Animations

Animations should feel athletic and responsive—quick, punchy, and satisfying like completing a rep.

- **Set Completion**: Scale and color transition (100ms) when marking sets complete, with a subtle bounce for satisfaction
- **Timer Countdown**: Pulsing animation on final 5 seconds to create urgency
- **Progress Bar**: Smooth width transition (300ms) with elastic easing when sets are completed
- **Card Appearance**: Subtle staggered fade-in (50ms delay between cards) on initial load
- **Button Press**: Quick scale-down (100ms) on tap for tactile feedback

## Component Selection

- **Components**: 
  - Card for exercise containers with subtle shadow for depth
  - Progress component for overall workout completion
  - Button for timer controls (start/pause/reset) with primary variant
  - Badge for muscle group tags with secondary styling
  - Separator between exercises for visual grouping
  
- **Customizations**: 
  - Custom set indicator circles (not in Shadcn) with tap targets and completion states
  - Custom timer display component with large typography and control buttons
  - Custom exercise card with integrated set tracking
  
- **States**: 
  - Set circles: Empty (border only), Completed (filled with accent color), Hover (scale slightly)
  - Timer button: Rest state (primary), Running (accent), Paused (muted)
  - Exercise cards: Default, All Sets Complete (subtle green tint)
  
- **Icon Selection**: 
  - Play/Pause from @phosphor-icons for timer controls
  - Check for completed sets
  - ArrowCounterClockwise for timer reset
  - Calendar for day indicator
  - Barbell or activity icon for muscle groups
  
- **Spacing**: 
  - Container padding: p-6 on mobile, p-8 on desktop
  - Card gaps: gap-4 for exercise list
  - Internal card padding: p-6
  - Set circle gaps: gap-2
  - Timer controls gap: gap-3
  
- **Mobile**: 
  - Single column layout throughout
  - Timer fixed to bottom of viewport on mobile for thumb access
  - Larger tap targets (min 44px) for set circles
  - Sticky header with day/muscle group
  - Exercise cards stack with full width
