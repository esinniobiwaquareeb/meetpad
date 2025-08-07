// MeetPad Brand Colors
export const colors = {
  // Primary brand color (from MeetPad logo)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main brand color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Secondary colors
  secondary: {
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    yellow: {
      50: '#fefce8',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  }
};

// Color utility functions
export const getColor = (colorPath: string) => {
  const path = colorPath.split('.');
  let current: any = colors;
  
  for (const key of path) {
    if (current[key] === undefined) {
      console.warn(`Color path "${colorPath}" not found`);
      return colors.primary[500]; // fallback to primary
    }
    current = current[key];
  }
  
  return current;
};

// Common color combinations
export const colorSchemes = {
  primary: {
    bg: colors.primary[50],
    text: colors.primary[600],
    border: colors.primary[200],
    hover: colors.primary[100],
  },
  button: {
    primary: {
      bg: colors.primary[500],
      text: 'white',
      hover: colors.primary[600],
    },
    secondary: {
      bg: colors.secondary.gray[900],
      text: 'white',
      hover: colors.secondary.gray[800],
    },
    outline: {
      bg: 'transparent',
      text: colors.secondary.gray[700],
      border: colors.secondary.gray[300],
      hover: colors.secondary.gray[50],
    }
  },
  status: {
    success: {
      bg: colors.secondary.green[100],
      text: colors.secondary.green[800],
    },
    warning: {
      bg: colors.secondary.yellow[100],
      text: colors.secondary.yellow[800],
    },
    error: {
      bg: colors.secondary.red[100],
      text: colors.secondary.red[800],
    }
  }
};

// Tailwind CSS classes for common use cases
export const colorClasses = {
  primary: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
  },
  button: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
  },
  status: {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  }
}; 