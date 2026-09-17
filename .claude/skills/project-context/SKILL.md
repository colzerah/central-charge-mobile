---
name: project-context
description: Repo map and conventions for the Central Charge mobile app (Expo Router / React Native EV-charging app). Load this whenever working in this repository — adding a screen, component, Redux slice, API request, or asking "how does X work here" / "how do I add Y" — so changes match existing patterns instead of inventing new ones. Especially important before creating new files under src/app, src/components, src/redux, or src/service, since this repo has strict, non-obvious per-folder conventions (component file triads, DTO-vs-types naming, two parallel component systems) that are easy to violate without reading this first.
---

# Central Charge — project map

"Central Charge" (slug `centralcharge`) is an EV-charging app: vehicles, charging points/map, recharge history, auth. Expo Router (file-based routing), React 19.2, React Native 0.86, TypeScript strict.

**Before writing any Expo/RN API code**, follow the root [AGENTS.md](../../../AGENTS.md): Expo 57 changed a lot — read the versioned docs at https://docs.expo.dev/versions/v57.0.0/ first. This skill covers *this repo's* structure and conventions, not Expo itself; the `expo` plugin enabled in `.claude/settings.json` and AGENTS.md already cover general Expo/SDK-57 guidance — don't duplicate it here.

## Path aliases (tsconfig.json)

- `@/*` → repo root
- `~/*` → `./src/*`
- `@/assets/*` → `./assets/*`

The codebase inconsistently mixes `@/src/...` and `~/...` for the same directory — both resolve. Match whatever a neighboring file in that folder already uses; don't normalize across the repo as a drive-by change.

## Routing (`src/app`, expo-router)

- `src/app/_layout.tsx` — root layout. Loads Inter fonts, then nests: `GestureHandlerRootView` > `KeyboardProvider` > `ThemeProvider` > Redux `Provider` > `BottomSheetModalProvider` > `ModalProvider` > `Stack`.
- `(auth)/` group — `login`, plus `testeCol`/`testeImp` which are scratch/experimental screens, not real features. Don't treat them as patterns to copy.
- `(app)/` group — gated: `(app)/_layout.tsx` reads `isAuthenticated` from Redux and `<Redirect href="/login" />`s if false. Contains `(tabs)/` (`home`, `menu`, `notification`, `recharges`, `scan`) plus `veiculos`, `novo-veiculo`, `menu-teste` (also scratch).
- `(tabs)/_layout.tsx` has both a `.tsx` and a `.native.tsx` file — that's a real platform split, not a duplicate; edit the one matching the platform you're targeting.
- `typedRoutes` and `reactCompiler` experiments are on (see `app.json`) — router paths are typechecked, and you generally shouldn't hand-write `useMemo`/`useCallback` purely for referential stability.

## State (Redux Toolkit)

- `src/redux/store.ts` combines `authSlice` + `appSlice`, exports typed `useAppDispatch`/`useAppSelector` — always use these, not the raw `react-redux` hooks.
- Each slice lives at `src/redux/<name>Slice/index.ts` via `createSlice`. **State shape types live separately** in `src/dtos/<name>SliceDTO.ts` (and `src/dtos/userDTO.ts` for shared entities) — not colocated with the slice. When touching a slice, check its DTO file too.

## Auth flow

- `src/hooks/useAuth.ts` wraps sign-in/out, calling `src/service/requests/authRequests.ts`, which use the shared axios instance `src/service/api.ts`.
- Token persists in `AsyncStorage` under `"@token"`; a separate `"@isAuthenticated"` flag is also persisted and checked on mount to auto-redirect to `/home`.
- `api.ts` currently hardcodes a dev/tunnel `baseURL` (`http://api-carregamento.ddns.net:8082/api/v1`) and its interceptors `console.log` the token/request/response on every call. Both are known rough edges — flag them if asked to productionize; don't copy the `console.log` pattern into new request files.

## Theming

- `src/theme/index.tsx` exports a flat color object `C` (e.g. `C.brand500`, `C.ink0`, `C.error`) plus `colorDark`/`colorLight`, which are currently near-duplicates — dark-mode theming isn't really wired up yet despite the objects existing.
- **Real convention**: components `import { C } from "@/src/theme"` and style with `StyleSheet.create`, hardcoding colors from `C`. NativeWind v5 + `tailwind-variants` are installed but not the dominant pattern in practice — don't introduce Tailwind classNames into a file that's using the `C` + StyleSheet convention; match the surrounding file.
- Fonts (`Inter-Regular`, `Inter-SemiBold`, `Inter-Bold`) load once in the root layout via `@expo-google-fonts/inter` and are referenced by string in `styles.ts` (`fontFamily: "Inter-Bold"`).

## Two component systems — know which one you're in

**`src/components/<Name>/`** — the app-level convention, used consistently (Button, Header, Input, Modal, MenuList, etc.). Every component folder has exactly:
- `index.tsx` — the component
- `<Name>DTO.ts` — the props interface (e.g. `ButtonProps`), **never colocated in index.tsx**
- `styles.ts` — a `StyleSheet.create` export named `styles`

Replicate this exact 3-file shape for any new component here.

**`src/components/shared/ui/`** — lower-level primitives organized atomic-design-style: `base/` (button, radiant-button, stack-aware-tabs), `molecules/` (circle-loader, shimmer, split-view), `organisms/` (dialog, grainy-gradient, mesh-gradient), `blocks/` (signup-v1). These use `types.ts` instead of `<Name>DTO.ts`, sometimes with `conf.ts`/`const.ts`/`helpers.ts` alongside.

The relationship: app-level components often *compose* a shared/ui primitive rather than reimplementing it — e.g. `src/components/Button/index.tsx` wraps `shared/ui/base/button` (imported as `ButtonIX`) and layers app-specific variants/sizing/icons on top. When building a new app-level component, check `shared/ui/` first for a primitive to wrap before writing raw RN elements.

Icons: `lucide-react-native`, typed as `keyof typeof icons` (see `ButtonDTO.ts`), rendered through the local `src/components/Icon` wrapper — use that wrapper, not `lucide-react-native` directly, so icon usage stays centralized.

## Modals

`src/providers/modal-provider.tsx` + `src/hooks/useModal.ts` implement a custom modal system; `ModalProvider` sits near the root of `_layout.tsx`. Preset variants live in `src/components/Modal/` (`ModalSuccess.tsx`, `ModaError.tsx` — yes, missing an "l", `ModalWarning.tsx`). Preserve the `ModaError` filename typo unless the user explicitly asks to rename it — a silent rename would just be unrequested churn.

## Scratch / non-canonical code

These exist in the tree but aren't real features — don't treat their patterns as the ones to follow, and don't be surprised if they're incomplete or later deleted: `(auth)/testeCol`, `(auth)/testeImp`, `(app)/menu-teste`, `src/service/requests/testeRequest.ts`.
