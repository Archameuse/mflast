/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      gridTemplateColumns: {
        // 'chartable': 'repeat(4, 5rem)',
        'chartable': 'repeat(auto-fit, max(5rem, 100%/4));',
        'playertable': 'repeat(auto-fill, 220px)',
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'cuprum': ['Cuprum', 'Impact', 'sans-serif'],
        'kelly-slab': ['kelly slab', 'Impact', 'sans-serif'],
        }
    },
  },
  plugins: [],
}

