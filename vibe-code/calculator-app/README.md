# Vue3 Calculator App with TypeScript

A modern calculator application built with Vue3 and TypeScript.

## Features

- ✨ Clean, modern UI with gradient background
- 🧮 Basic arithmetic operations (addition, subtraction, multiplication, division)
- ➕ Additional functions:
  - Percentage calculation
  - Toggle sign (+/-)
  - Clear display
  - Decimal support

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **CSS3** - Modern styling with flexbox and grid

## Project Structure

```
calculator-app/
├── src/
│   ├── components/
│   │   └── Calculator.vue    # Main calculator component
│   ├── App.vue               # Root component
│   ├── main.ts               # Application entry point
│   └── style.css             # Global styles
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:

```bash
npm run build
```

## Preview Build

Preview the production build:

```bash
npm run preview
```

## Usage

1. Click on numbers (0-9) to input values
2. Click on operators (+, -, ×, ÷) to perform operations
3. Click = to calculate the result
4. Use the following special buttons:
   - **C** - Clear the display
   - **+/-** - Toggle the sign of the current number
   - **%** - Convert to percentage

## Component Details

### Calculator.vue

The main calculator component handles:
- Number input
- Decimal point handling
- Operator selection
- Calculation logic
- Display management

**State Management:**
- `display` - Current display value
- `previousValue` - Value from before operator
- `currentOperator` - Currently selected operator
- `shouldResetDisplay` - Flag to reset display on next input

## Styling

The calculator uses:
- Grid layout for button arrangement
- Color scheme with purple gradient background
- Responsive design
- Hover and active states for better UX
