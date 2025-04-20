# App Guidelines

This document outlines the conventions, rules, and patterns for building and maintaining this Next.js app. Follow these guidelines to ensure consistency, scalability, and maintainability across the codebase.

---

## 1. Component Structure & Location

- Place reusable UI components in the `components/` directory, organized by feature or type (e.g., `components/button/Button.tsx`).
- Use clear, generic names for shared components (e.g., `Button`, `Card`, `Modal`).
- Keep feature-specific components close to their usage when not intended for reuse.

## 2. Styling

- Use [Tailwind CSS](https://tailwindcss.com/) utility classes for all styling.
- Use [class-variance-authority (cva)](https://cva.style/) for managing component variants, states, and composable class logic.
  - Define variants (e.g., `primary`, `ghost`, `outline`) and states (e.g., `isLoading`) in the cva config.
  - Use `VariantProps<typeof ...>` for type safety and autocompletion.

## 3. Component API & Props

- Use TypeScript interfaces for all component props.
- Accept all standard HTML props for flexibility (e.g., `ButtonProps` extends `ButtonHTMLAttributes`).
- Use sensible defaults for props and variants.

## 4. Button & Link Patterns

- Use a single `Button` component for all button and link needs.
- If an `href` prop is provided, render a Next.js `<Link>` for internal navigation; otherwise, render a native `<button>`.
- Maintain consistent styling and behavior for both cases.
- Support an `isLoading` prop to disable interaction and show a spinner.

## 5. State & Loading

- Use explicit props for loading and disabled states (e.g., `isLoading`, `disabled`).
- Visually indicate loading/disabled states and prevent interaction.

## 6. Accessibility

- Always ensure components are accessible:
  - Use `aria-disabled` and `tabIndex={-1}` on links when disabled or loading.
  - Ensure keyboard accessibility for all interactive elements.
  - Use semantic HTML elements where possible.

## 7. Extensibility

- Design components to be composable and easily extensible.
- Use cva for scalable variant and state management.
- Accept children and all relevant props for flexibility.

## 8. Example: Button Usage

```tsx
<Button variant="primary">Primary Button</Button>
<Button variant="ghost" href="/signup">Sign Up</Button>
<Button variant="outline" isLoading>Loading</Button>
```

## 9. Form Components & Input Patterns

- Use `react-hook-form` for all form handling with consistent validation patterns.
- Create reusable input components in `components/input/` directory.
- Input components should follow these conventions:
  - Accept standard HTML input props plus any specialized props.
  - Use consistent styling and error display.
  - Implement appropriate keyboard handling for specialized inputs.
  - Support focus states with consistent visual feedback.

### Input Component Examples:

```tsx
// Standard text input
<Input id="email" type="email" placeholder="Email address" {...register('email')} />

// Phone input with country selection
<Input type="phone" value={field.value} onChange={field.onChange} country={country} />

// Pin input for verification codes
<PinInput value={code} onChange={setCode} length={6} />
```

---

_Adhering to these guidelines will help keep the codebase clean, maintainable, and accessible as the app grows._
