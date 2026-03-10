# React Date Picker

A React calendar component that allows users to select a **single date** or a **date range**, with optional **time selection**.

## Demo

![DatePicker Demo](https://react-datepicker-psi.vercel.app/)

## Features

- Single date selection
- Date range selection
- Optional date inputs
- Optional time selection
- 12h / 24h time formats
- Lightweight and easy to integrate

## Dependencies

This component uses the following dependencies:

- react
- clsx
- date-fns

## Installation

Currently the component is not published to npm.
Clone the repository and copy the `src/datepicker` directory into your project.

```bash
git clone repo_url
```

Then install dependencies:

```bash
pnpm install
```

## Usage

Default (Single date)

```tsx
<DatePicker />
```

Single date with input

```tsx
<DatePicker hasInputs />
```

Single date with date and time inputs

```tsx
<DatePicker hasInputs hasTime />
```

Single date with 24h time format

```tsx
<DatePicker hasInputs hasTime timeFormat="24h" />
```

Range selection

```tsx
<DatePicker isRange />
```

Range selection with inputs

```tsx
<DatePicker isRange hasInputs />
```

Range selection with date and time

```tsx
<DatePicker isRange hasInputs hasTime />
```

Range selection with 24h time format

```tsx
<DatePicker isRange hasInputs hasTime timeFormat="24h" />
```

## Types

```ts
type DateSingle = {
  date: Date | null;
};

type DateRange = {
  from: Date | null;
  to: Date | null;
};

type TimeFormat = "12h" | "24h";

type DatePickerProps = {
  single?: DateSingle;
  range?: DateRange;
  isRange?: boolean;
  isDueDate?: boolean;
  hasInputs?: boolean;
  hasTime?: boolean;
  timeFormat?: TimeFormat;
  onSingleChange?: (value: Date | null) => void;
  onRangeChange?: (value: DateRange) => void;
  onClear?: () => void;
};
```

## Props

| Prop             | Type                                       | Description                        |
| ---------------- | ------------------------------------------ | ---------------------------------- |
| `isRange`        | `boolean`                                  | Enables date range selection       |
| `isDueDate`      | `boolean`                                  | Enables due date behavior          |
| `hasInputs`      | `boolean`                                  | Shows date input fields            |
| `hasTime`        | `boolean`                                  | Enables time selection             |
| `single`         | `{ date: Date \| null }`                   | Default single value               |
| `range`          | `{ from: Date \| null; to: Date \| null }` | Default range value                |
| `timeFormat`     | `"12h" \| "24h"`                           | Time format                        |
| `onSingleChange` | `(value: Date) => void`                    | Callback for single date change    |
| `onRangeChange`  | `(value: DateRange) => void`               | Callback for range change          |
| `onClear`        | `() => void`                               | Callback when selection is cleared |

## Development

```bash
pnpm run dev
```
