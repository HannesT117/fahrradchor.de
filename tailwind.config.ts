import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				cpc: {
					100: '#cef5d1',
					300: '#8aea92',
					500: '#54dc60',
					700: '#3cb749',
					900: '#1c842b'
				},
				cpcAnalog: {
					100: '#bbf2da',
					300: '#4de1aa',
					500: '#00cf84',
					700: '#00ab6a',
					900: '#007845'
				}
			},
			fontFamily: {
				sans: ['Mulish', 'ui-sans-serif', 'system-ui']
			},
			backgroundImage: {
				choir: "url('$lib/img/cpc_konzert_small.webp')"
			},
			gridTemplateColumns: {
				konzerte: 'repeat(1, minmax(0, 1fr)) 50px'
			},
			spacing: {
				px: '1px',
				0: '0px',
				0.5: '2px',
				1: '4px',
				1.5: '6px',
				2: '8px',
				2.5: '10px',
				3: '12px',
				3.5: '14px',
				4: '16px',
				5: '20px',
				6: '24px',
				7: '28px',
				8: '32px',
				9: '36px',
				10: '40px',
				11: '44px',
				12: '48px',
				14: '56px',
				16: '64px',
				20: '80px',
				24: '96px',
				28: '112px',
				32: '128px',
				36: '144px',
				40: '160px',
				44: '176px',
				48: '192px',
				52: '208px',
				56: '224px',
				60: '240px',
				64: '256px',
				72: '288px',
				80: '320px',
				96: '384px'
			}
		}
	},

	plugins: [typography, containerQueries]
} satisfies Config;
