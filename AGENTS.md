This is an Expo/React Native mobile application (Cura Sync — a doctor-booking app). Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Current phase: UI and frontend flow only

**There is no end-to-end API consumption. The backend is not running and must not be relied on.** Current work is limited to screens, navigation, forms, validation, theming, localisation, list rendering, and mock data.

- Do not attempt to make requests succeed, do not wire up real endpoints, and do not "fix" the API integration. That is a later phase.
- `EXPO_PUBLIC_BASE_URL` / `EXPO_PUBLIC_BASE_VERSION` in `.env` are intentionally empty, so `httpClient`'s `baseURL` is `undefined/undefined` and every call fails immediately. Leave them empty.
- Mock data (`services/dummy.ts`, hardcoded lists) is the intended data source. Extend it rather than adding a network call.
- `router.push(...)` running **before** `mutate(...)` in the auth pages is deliberate: the flow must navigate regardless of the never-sent request.
- Mocks must still mirror the real backend contract — `snake_case` fields, the `{data, errors, message, status}` envelope, real enum values — so the wiring phase is a deletion rather than a rewrite.
- Verify work with `npx expo lint`, `npx tsc --noEmit`, and by driving the flow in the dev build/simulator. Never report a task as working because a request "should" succeed.
- State plainly, in your summary, which parts are still mocked.

## Backend: read it as a contract, never call it

Sibling repo: `/home/vaddshah/Documents/projects/CuraSync/backend` — API-only Laravel (routes in `routes/api.php`, controllers in `app/Http/Controllers/V1`, its own `AGENTS.md`). It is a **read-only reference** for the shape of the API. Do not edit it from this repo, and do not depend on it running.

Read it whenever you need ground truth for:

- endpoint paths, verbs, and middleware (`auth:sanctum`, `role:patient`, `role:doctor`) — `routes/api.php`
- request validation rules → mirror them in the Zod schema (`app/Http/Requests/**`)
- response field names, relations, and enum values → mirror them in `types` (`app/Models/**`, `app/Enums/**`, `app/Http/Resources/**`)

Current surface, all under the `v1` prefix (full paths `/api/v1/…`):

| Method      | Path                                                                 | Notes                                                                                                     |
| ----------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/login`                                                        | `email`, `password`                                                                                       |
| POST        | `/auth/register/patient`                                             | `name`, `email`, `password`, `password_confirmation`                                                      |
| POST        | `/auth/register/doctor`                                              | same, plus doctor fields; `status` defaults to `PENDING_VERIFICATION`                                     |
| GET         | `/me`                                                                | sanctum                                                                                                   |
| PATCH       | `/patients/profile`                                                  | role:patient — `name`, `phone_number`, `profile_url`, `date_of_birth`, `gender` (`M`/`F`), `blood_type`   |
| PATCH       | `/doctors/profile`                                                   | role:doctor — `name`, `phone_number`, `profile_url`, `license_number`, `standard_consultation_fee`, `bio` |
| apiResource | `/patients/{allergies,conditions,contacts}`                          | role:patient                                                                                              |
| apiResource | `/doctors/{qualifications,schedules,schedule-overrides}`             | role:doctor; `/doctors/specialties` is store + destroy only                                               |
| GET         | `/public/specializations`, `/public/doctors`, `/public/doctors/{id}` | unauthenticated                                                                                           |

Every response body is `{data, errors, message, status}`. Paginated lists nest `data` + `meta` (`currentPage`, `perPage`, `total`, `lastPage`, `hasMorePages`, `nextPageUrl`, `previousPageUrl`) inside `data`. Enum columns are `UPPER_SNAKE` (`ACTIVE`, `PENDING_VERIFICATION`, `MILD`, `UNAVAILABLE`, …). Match these in mock data and types.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json` (currently `~57.0.25`).
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

Note the API often differs _within_ an SDK line: `expo-router/native-tabs` (SDK 58+) vs `expo-router/unstable-native-tabs` (SDK 54–57). This project uses the headless `expo-router/ui` tabs — check the installed version before changing navigators.

## Commands

This project uses **npm** (`package-lock.json` is checked in, no `bun.lock`), so use `npx`.

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo run:ios|android    # local dev build (ios/ and android/ are gitignored, generated by CNG)
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run `npx expo lint` and `npx tsc --noEmit` before declaring any task done. There is no test suite and no Prettier — do not add either unless asked.

## Tech stack

| Concern      | Choice                                               |
| ------------ | ---------------------------------------------------- |
| Runtime      | Expo SDK 57, React Native 0.86, React 19.2, Hermes   |
| Navigation   | Expo Router (typed routes enabled)                   |
| Styling      | Uniwind (Tailwind v4) — `className`, no `StyleSheet` |
| Server state | TanStack Query v5                                    |
| HTTP         | Axios with a single intercepting client              |
| Forms        | React Hook Form + Zod v4 via `@hookform/resolvers`   |
| Lists        | `@shopify/flash-list`                                |
| Modals       | `react-native-modal`                                 |
| Dates        | `dayjs` + `react-native-ui-datepicker`               |
| i18n         | i18next / react-i18next, `expo-localization`         |
| Icons        | `lucide-react-native`                                |
| Build        | EAS (`appVersionSource: "remote"`)                   |

`app.json` enables two experiments you must respect: `typedRoutes` (route hrefs are string-literal checked) and `reactCompiler` (no manual `memo`/bailout hacks needed or wanted).

## Project structure

```
src/
  app/                    # Expo Router routes — the ONLY place routes live
    _layout.tsx           # providers: SafeArea, QueryClient, i18n, global.css, StatusBar
    index.tsx             # welcome / entry screen
    auth/                 # Stack: login, register, register-doctor, *-profile
    patient/              # Headless Tabs: home, search, profile (profile is a nested Stack)
  domain/                 # feature modules, one folder per feature
    <feature>/
      pages/              # screen-level components (PascalCase .tsx)
      components/         # feature-local presentational components (+ one sub-folder per sub-feature)
      queries/            # TanStack Query hooks — index.ts, or <sub-feature>.ts
      services/           # API calls — index.ts, or <sub-feature>.ts (+ shared dummy.ts)
      types/              # feature-scoped types — index.ts, or <sub-feature>.ts
      validations/        # Zod schemas (one file per form)
  common/                 # cross-feature infrastructure
    api/                  # apiClient.ts, queryClient.ts
    hooks/                # useTheme.ts
    localisation/         # i18n.ts, utils.ts, locales/*.json
    types/                # shared API types (index.d.ts)
    utils/                # auth.ts (token storage)
  shared/components/      # reusable UI primitives (Button, TextField, DatePickerField, ...)
  assets/images/          # in-app images (distinct from root assets/ used for app icons)
  global.css              # Uniwind entry + theme CSS variables
```

`src/domain/doctor/` exists but is empty — the doctor area is unbuilt.

### Sub-features get their own file per layer

When a domain carries several sibling resources (allergies, conditions, contacts, …), **each resource gets one file per layer instead of growing a shared `index.ts`**. See `domain/patient/profile` for the reference implementation:

```
domain/patient/profile/
  pages/ConditionsPage.tsx                  # one screen per resource
  pages/AllergiesPage.tsx
  components/condition/ConditionCard.tsx    # components grouped per resource
  components/condition/ConditionFormSheet.tsx
  components/condition/ConditionDeleteSheet.tsx
  components/condition/StatusField.tsx
  types/condition.ts                        # Allergy + AllergySeverity live in types/allergy.ts
  validations/condition.ts                  # <Resource>Validator + <Resource>Schema, + <Resource>Id on update
  services/condition.ts                     # class ConditionService, default-exported instance
  queries/condition.ts                      # useGet/useCreate/useUpdate/useDelete hooks
  services/dummy.ts                         # <resource>Store mocks, shared by every service in the domain
```

- `index.ts` stays for the domain's own concern (here: `profileService` + `useGetProfile` / `useUpdateProfile`) and is not a dumping ground.
- `services/dummy.ts` holds one `<resource>Store` per resource — `{ list, create, update, remove }` over a module-level array, with `//!` comment marking it as a UI-phase stand-in. Mutations invalidate the list query key, so CRUD visibly works with no server.
- Resources that share a control (severity chips, status chips) keep it resource-local; promote to `shared/components` only when a second _domain_ needs it.

### Path aliases

`tsconfig.json` defines `@/* → ./src/*` and `@/assets/* → ./assets/*`.

- Cross-directory imports use `@/…` (e.g. `import useTheme from "@/common/hooks/useTheme"`).
- **Gotcha:** `@/assets/*` points at the _root_ `assets/` (app icon, splash icon), not `src/assets/`. App images in `src/assets/images` are currently imported relatively.
- Within a `src/domain/<feature>` folder, sibling imports are relative (`../queries`, `./Heading`). From inside `components/<sub-feature>/` that means `../../types/<sub-feature>`, `../../queries/<sub-feature>`, and `./` for its own siblings.

## Code structure conventions

### Components

- One component per file. Filename matches the component name in PascalCase.
- Arrow function body, `export default Component` at the bottom.
- `type Props = { ... }` declared **above** the component, above any helper consts. Extend third-party prop types with intersections (`} & TextInputProps;`) rather than re-declaring.
- No `React` import needed; no prop-types.
- Optional props use `?:` with a default in the destructuring (`disabled = false`). Prop names follow the underlying primitive: `onPress`, `onChange`, `error`, `label`, `className`.
- Variant maps are `export const variants = { ... } as const` next to a `type ButtonVariant = …` union (see `shared/components/Button.tsx`).
- Never add comments unless asked. If a non-obvious decision must be recorded, use a `//?` or `//!` comment — that is the only style present in the codebase.

### Styling

- Tailwind classes via `className` on React Native primitives. No `StyleSheet.create` anywhere.
- Semantic theme tokens only: `bg-background`, `bg-surface`, `bg-primary`, `border-border`, `text-primary`, `text-secondary`, `text-text-primary|secondary|tertiary`, plus Tailwind scales (`text-2xl`, `p-3`, `gap-4`, `rounded-2xl`, `mt-8`).
- Screen padding convention: root is `className="flex-1 bg-background px-3"` with `style={{ paddingTop: insets.top + 8 }}` (or `+ 16` on auth screens) from `useSafeAreaInsets()`.
- `style` is allowed only where Tailwind cannot express the value: safe-area insets, `elevation`, and colors pulled from the theme map.
- Vertical rhythm between sections is `mt-8`; card surfaces are `bg-surface` + `rounded-2xl`/`rounded-xl` + `border border-border`.

### Theming (four themes, two files to keep in sync)

Themes are `light`, `dark`, `ocean-light`, `ocean-dark`.

1. `src/global.css` — one `@variant <name>` block per theme defining `--color-primary`, `--color-secondary`, `--color-background`, `--color-surface`, `--color-border`, `--color-text-{primary,secondary,tertiary}`.
2. `src/common/hooks/useTheme.ts` — a `ColorScheme` object + `textLight`/`textDark` + `themeMap` mirroring the same hex values, and the `themes` array (name, label, icon) consumed by the theme picker.

**Adding or editing a theme means editing both files.** `useTheme` also persists the selection to AsyncStorage under the `theme` key and re-applies it on mount. `metro.config.js` lists the non-default theme names in `extraThemes` — add new ones there too.

Use `useTheme()` for anything that cannot take a className — icon colors (`text.primary` / `text.secondary` / `colors.primary` / `colors.secondary`), `DateTimePicker` styles, and the root `StatusBar` `barStyle`. Note the codebase sometimes passes a literal `"white"` for icons on top of a `bg-primary` surface; prefer `text.primary` or an explicit contrast color.

### Icons

`import { ChevronLeft } from "lucide-react-native"` — lucide only, even though `expo-symbols` is installed. Icon color comes from `useTheme()`, never from a className.

### Lists

Use `FlashList` for any data-backed list (`vertical` or `horizontal`). Header/footer go through `ListHeaderComponent` / `ListFooterComponent`. `ScrollView` is only for short static content. Always set `showsVerticalScrollIndicator={false}` / `showsHorizontalScrollIndicator={false}` to match the app's chrome-less look.

### Bottom-sheet modals

`react-native-modal` with `style={{ justifyContent: "flex-end", margin: 0 }}` and `backdropColor="#0C0C0C"`, with `onBackdropPress` and `onBackButtonPress` closing it. Sheet body is `bg-background` → `bg-surface` header (title + absolute-positioned `X` close button) → options → footer with a full-width `Button text="Done"`. Follow this shape in `DatePickerField`, `BloodTypeField`, and `LanguageSwitch`.

The same shape carries the resource CRUD sheets in `domain/patient/profile/components/{allergy,condition}/`:

- `…FormSheet` — `{ isVisible, <resource>?, onClose }`, adds `avoidKeyboard` for the inputs, scrolls the body, and owns its own `useForm` + create/update mutation. It resets the form in a `useEffect` keyed on `[isVisible, <resource>]` so create and update share one component.
- `…DeleteSheet` — `{ <resource>: <T> | null, onClose }`, `isVisible={!!<resource>}`, confirms then calls the delete mutation.
- The page holds the visibility state (`isFormVisible`, `selected`, `removing`) and passes callbacks down; `onBackdropPress` just closes.
- Fields that need a picker render it inline (`SeverityField` row, `StatusField` chips) rather than opening a second modal.

## Data layer

Follow the existing four-layer chain per feature: `pages/components` → `queries` → `services` → `httpClient`. Never call `httpClient` from a component. This is the target wiring for the later API phase; during the UI phase the `services` layer returns mock data and the `httpClient` code below it stays unwired.

**`src/common/api/apiClient.ts`** — a single axios instance. Request interceptor attaches `Bearer <token>`; response interceptor returns `res.data` (the response body) and rejects with `error.response` on failure. Base URL is `EXPO_PUBLIC_BASE_URL` + `/` + `EXPO_PUBLIC_BASE_VERSION` from `.env` (see `.env.example`; only `EXPO_PUBLIC_`-prefixed vars reach the bundle).

**`services/<feature>.ts`** — a class per feature, instantiated once and default-exported:

```ts
class AuthService {
  async login(input: LoginSchema) {
    const response = await httpClient.post<AuthResponse>("/auth/login", input);
    return response.data; // backend wraps payloads in a `data` key
  }
}
export default authService;
```

**`queries/<feature>.ts`** — one hook per endpoint, always explicitly typed, with an `ApiError` error type:

```ts
export const useLogin = () =>
  useMutation<AuthResponse, ApiError, LoginSchema>({
    mutationKey: ["login"],
    mutationFn: authService.login
  });
```

Keys are kebab-case string arrays. Query functions that take arguments must be wrapped (`queryFn: () => homeService.getDoctors(id)`) and the arguments belong in the `queryKey` — see `useGetDoctors` in `domain/patient/home/queries`.

**`queryClient.ts`** sets global defaults (5-minute `staleTime`, no refetch on focus, 2 retries except on 401). Don't override these per hook without a reason.

### Resource CRUD screens

`AllergiesPage` / `ConditionsPage` are the template for any profile resource list: back chevron + title + subtitle, a `FlashList` of `<Resource>Card` (whole card opens the update sheet, trailing trash opens the delete sheet), `ItemSeparatorComponent={() => <View className="h-3" />}`, a `ListEmptyComponent` with an icon plus two lines of copy, and an absolutely positioned `bg-primary` circular `Plus` `Pressable` that opens the create sheet. Both sheets are rendered unconditionally; the page owns `isFormVisible` / `selected` / `removing` state.

## Forms

Every form follows the same shape (see `LoginPage`, `RegisterPage`, `DoctorProfilePage`, `ConditionFormSheet`):

1. A Zod schema in `validations/<form-name>.ts` exporting `<Name>Validator` and `type <Name>Schema = z.infer<typeof <Name>Validator>`. Use Zod v4 top-level string formats (`z.email()`), not `z.string().email()`.
2. `useForm<<Name>Schema>({ resolver: zodResolver(<Name>Validator), defaultValues: … })` with a `defaultValues` block covering every field.
3. One `Controller` per field, rendering a `shared/components` field (`TextField`, `PasswordField`, `DatePickerField`, `BloodTypeField`) or a custom `Pressable` group (see the gender toggle in `PatientProfilePage`).
4. Field values are passed as `value={value ?? ""}` because the profile schemas use `nullable()`.
5. Submit button gets `disabled={isSubmitting || isPending}`.
6. The schema mirrors the backend `FormRequest` field-for-field, including limits.

Naming: use `.ts` for validation modules.

## Routing

- Routes live in `src/app/`. Every file there is a screen; `_layout.tsx` files define navigators. Never put components, hooks, or utils in `src/app/`.
- **Route files are thin wrappers.** They import a domain page and render it — no markup, no logic:

  ```tsx
  // src/app/patient/home.tsx
  import PatientHomePage from "@/domain/patient/home/pages/HomePage";
  const PatientHome = () => <PatientHomePage />;
  export default PatientHome;
  ```

- Declare every screen in its `_layout.tsx` with `options={{ headerShown: false }}`; the app draws its own headers.
- Import `Link`, `router`, `useLocalSearchParams`, `usePathname` from `expo-router`. Use `router.push()` for imperative navigation and `<Link href>` for inline text affordances. Wrap a back chevron in `{router.canGoBack() ? … : null}`.
- Adding a route invalidates the generated route types: `.expo/types/router.d.ts` is produced by the dev server, so `npx tsc --noEmit` will reject `router.push("/patient/profile/conditions")` until `npx expo start` has run once with the new file in place. Start the server (or let the user run it) instead of loosening the `tsconfig` types.
- Docs: https://docs.expo.dev/router/introduction.md

## Types

- Shared API envelope types (`ApiError`, `PaginatedResponse<T>`, `User`, `UserProfile`, `Doctor`, `Patient`) live in `src/common/types/index.d.ts` and are imported as values from `@/common/types`.
- Feature-specific response shapes go in `src/domain/<feature>/types/` — one `index.ts` per feature, or `<sub-feature>.ts` when the feature has several resources.
- Backend field names are `snake_case`; keep them as-is in types and form schemas, and do the conversion at the API boundary.
- Be careful: `Doctor` is declared twice with different shapes (in `common/types` (profile type for doctor) and in `domain/patient/home/types` (public doctor entity type)). Don't add a third; consolidate when you touch it.

## Localization

- Locales: `src/common/localisation/locales/en.json` and `mm.json`. **Both must be updated in the same commit** — keys are grouped by namespace: `index`, `auth`, `profile`, `home`, then one namespace per resource screen (`allergies`, `conditions`), then shared `labels`, `options`, `actions`.
- `i18n.ts` initializes i18next with the device language and exports the `languages` array (`id`, `name`, `flag`) used by the language switcher. Register new locales there and in `resources`.
- Persisted choice: `getLocale` / `setLocale` in `localisation/utils.ts` (AsyncStorage key `locale`), re-applied by the root layout on mount.
- In components: `const { t } = useTranslation();` then `t("labels.email")`. Shared components take already-translated `label` props.
- Do not translate form input placeholders.

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `npx eas-cli@latest <command>`; substitute that for bare `eas` in docs examples. Profiles: `development`, `preview`, `production`.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
- Keep placeholders explicit. Where a feature is stubbed (hardcoded doctor names, `services/dummy.ts`, `console.log` in mutation handlers), say so in your summary rather than shipping it as if it were wired up. See "Current phase" above.

## Known issues — do not propagate these

Fix them if you are already editing the file; never copy the pattern.

- Auth pages call `router.push(...)` **before** `mutate(...)`, because the backend server is not available right now, and we are only doing UI development, so navigation happens regardless of whether the request succeeds.
- `domain/patient/home/services/index.ts` returns `docs` / `specs` from `dummy.ts` before its real `httpClient` calls, which are dead code below the early return since development right now is UI only, no end-to-end api bindings.
- The same early-return shape is in `domain/patient/profile/services/{allergy,condition}.ts`, so `npx expo lint` reports one `no-unreachable` warning per method there. Those warnings are expected during this phase — do not "fix" them by deleting the real `httpClient` calls.
- `domain/auth/services/index.ts` posts to `/auth/register-patient` and `/auth/register-doctor`; the backend routes are `/auth/register/patient` and `/auth/register/doctor`. Correct the paths when the API is wired, not before.
