import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for proper Tailwind class merging
 * 
 * @param {...any} inputs - Class names or conditional class objects
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to create responsive text classes
 * @param {string} size - Size variant (sm, md, lg, xl)
 * @returns {string} - Responsive text classes
 */
export function getResponsiveText(size = 'md') {
  const sizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg md:text-xl',
    lg: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    xl: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
  };
  
  return sizes[size] || sizes.md;
}

/**
 * Utility function to get property badge classes
 * @param {string} type - Property type (sale, rent, featured)
 * @returns {string} - Badge classes
 */
export function getPropertyBadgeClasses(type) {
  const baseClasses = 'property-badge';
  
  switch (type?.toLowerCase()) {
    case 'sale':
      return cn(baseClasses, 'sale');
    case 'rent':
      return cn(baseClasses, 'rent');
    case 'featured':
      return cn(baseClasses, 'featured');
    default:
      return cn(baseClasses, 'bg-gray-100 text-gray-800');
  }
}

/**
 * Utility function to get button variant classes
 * @param {string} variant - Button variant (primary, secondary, outline, ghost)
 * @param {string} size - Button size (sm, md, lg)
 * @returns {string} - Button classes
 */
export function getButtonClasses(variant = 'primary', size = 'md') {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };
  
  return cn(
    baseClasses,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md
  );
}

/**
 * Utility function to get form input classes with validation states
 * @param {boolean} hasError - Whether the input has an error
 * @param {boolean} isDisabled - Whether the input is disabled
 * @returns {string} - Input classes
 */
export function getInputClasses(hasError = false, isDisabled = false) {
  return cn(
    'form-input',
    {
      'border-red-500 focus:ring-red-500 focus:border-red-500': hasError,
      'bg-gray-100 cursor-not-allowed opacity-60': isDisabled
    }
  );
}

/**
 * Utility function to get card classes with variants
 * @param {string} variant - Card variant (default, property, hover)
 * @returns {string} - Card classes
 */
export function getCardClasses(variant = 'default') {
  const baseClasses = 'card';
  
  const variants = {
    default: '',
    property: 'card-property',
    hover: 'hover-lift hover-glow'
  };
  
  return cn(baseClasses, variants[variant]);
}