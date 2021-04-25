export type MeType = {
	id: number
	email: string
	username: string,
	first_name: string,
	last_name: string,
	avatar: string
	airline: AirlineType
	estimation: number
}

type AirlineType = {
	id: number
	logo: string
	name: string
}

export enum RoleEnum { }
