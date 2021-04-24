export type ApplicationType = {
	id: number
	description: string
	start_time: string
	end_time: string
	status: ApplicationFiltersEnum
	resource: number
	user: number
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
}

export enum FilterForRequestEnum {
	CANCELLED = 0,
	NEW = 1,
	APPROVED = 'approved',
	REFUSED = 'refused',
	EDITED = 'edited',
	HISTORY = 'history'
}