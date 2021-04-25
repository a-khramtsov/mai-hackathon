export const getMediaString = (res: number) => `@media screen and (max-width: ${res}px)`

export const media = {
	max375: getMediaString(375),
	max480: getMediaString(480),
	max768: getMediaString(768),
	max1024: getMediaString(1024),
	max1224: getMediaString(1224),
	max1440: getMediaString(1440),
}
