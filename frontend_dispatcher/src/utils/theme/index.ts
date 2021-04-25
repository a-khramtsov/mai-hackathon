import { DefaultTheme } from 'styled-components'
import { getMediaString } from 'utils/theme/media'

export const defaultTheme: DefaultTheme = {
	colors: {
		text: {
			black: '#222222',
			dark: '#45464A',
			default: '#94979E',
			light: '#E5E5E5',
		},
		background: {
			black: '#000',
			white: '#fff',
			dark: '#1c1c1c',
			light: '#F8F9FA',
		},
		border: {
			default: '1px solid rgba(0, 0, 0, 0.15)',
		},
		other: {
			yellow: '#F3DF74',
			red: '#E66F1A',
			blue: '#5e95ff',
		},
	},
	siteWidth: '1400px',
	fontFamily: {
		rfDewi: 'RF Dewi',
		rfDewiExpanded: 'RF Dewi Expanded',
		rfDewiExtended: 'RF Dewi Extended',
	},
	media: {
		max375: getMediaString(375),
		max480: getMediaString(480),
		max768: getMediaString(768),
		max1024: getMediaString(1024),
		max1224: getMediaString(1224),
		max1440: getMediaString(1440),
	},
}
