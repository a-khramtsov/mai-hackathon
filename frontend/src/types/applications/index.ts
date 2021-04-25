import { MeType } from "types/me";

export type ApplicationType = {
	id: number
	description: string
	start_time: string
	end_time: string
	status: ApplicationFiltersEnum
	resource: {
		id: number
		title: string,
		description: string,
		photo: string,
		geo_lat: number
		geo_lon: number
	}
	parking_place: {
		id: number
		code: string
	}
	user: MeType
	worker_estimation: number
}

export enum ApplicationFiltersEnum {
	CANCELLED = 0,
	NEW = 1,
	APPROVED_BY_AIRLINE = 2,
	REFUSED_BY_AIRLINE = 3,
	EDITED_BY_AIRLINE = 4,
	APPROVED_BY_DISPATCHER = 5,
	REFUSED_BY_DISPATCHER = 6,
	EDITED_BY_DISPATCHER = 7,
	APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE = 8
}

export enum FilterForRequestEnum {
	CANCELLED = 0,
	NEW = 1,
	APPROVED = 'approved',
	REFUSED = 'refused',
	EDITED = 'edited',
	HISTORY = 'history'
}