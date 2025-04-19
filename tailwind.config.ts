import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const svgToDataUri = require("mini-svg-data-uri");


const config: Config = {
	darkMode: 'class',
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	container: {
    		center: true,
    		padding: {
    			DEFAULT: '20px',
    			lg: '80px'
    		},
    		screens: {
    			sm: '375px',
    			md: '768px',
    			lg: '1200px'
    		}
    	},
    	screens: {
    		sm: '375px',
    		md: '768px',
    		lg: '1200px'
    	},
    	extend: {
    		keyframes: {
    			hide: {
    				from: {
    					opacity: '1'
    				},
    				to: {
    					opacity: '0'
    				}
    			},
    			slideDownAndFade: {
    				from: {
    					opacity: '0',
    					transform: 'translateY(-6px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			slideLeftAndFade: {
    				from: {
    					opacity: '0',
    					transform: 'translateX(6px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			slideUpAndFade: {
    				from: {
    					opacity: '0',
    					transform: 'translateY(6px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			slideRightAndFade: {
    				from: {
    					opacity: '0',
    					transform: 'translateX(-6px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			accordionOpen: {
    				from: {
    					height: '0px'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			accordionClose: {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0px'
    				}
    			},
    			dialogOverlayShow: {
    				from: {
    					opacity: '0'
    				},
    				to: {
    					opacity: '1'
    				}
    			},
    			dialogContentShow: {
    				from: {
    					opacity: '0',
    					transform: 'translate(-50%, -45%) scale(0.95)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translate(-50%, -50%) scale(1)'
    				}
    			},
    			'shimmer-slide': {
    				to: {
    					transform: 'translate(calc(100cqw - 100%), 0)'
    				}
    			},
    			'spin-around': {
    				'0%': {
    					transform: 'translateZ(0) rotate(0)'
    				},
    				'15%, 35%': {
    					transform: 'translateZ(0) rotate(90deg)'
    				},
    				'65%, 85%': {
    					transform: 'translateZ(0) rotate(270deg)'
    				},
    				'100%': {
    					transform: 'translateZ(0) rotate(360deg)'
    				}
    			}
    		},
    		animation: {
    			hide: 'hide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    			slideDownAndFade: 'slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    			slideLeftAndFade: 'slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    			slideUpAndFade: 'slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    			slideRightAndFade: 'slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    			accordionOpen: 'accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)',
    			accordionClose: 'accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)',
    			dialogOverlayShow: 'dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    			dialogContentShow: 'dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
    			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		}
    	}
    },
	plugins: [addVariablesForColors, function ({ matchUtilities, theme }: any) {
		matchUtilities(
		  {
			"bg-dot-thick": (value: any) => ({
			  backgroundImage: `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
			  )}")`,
			}),
		  },
		  { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
		);
	  }, require("tailwindcss-animate"), require("@tailwindcss/forms")],
};

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}

export default config;
