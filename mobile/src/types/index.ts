export enum Status {
    CANCELLED = 0,
    NEW = 1,
    APPROVED_BY_AIRLINE = 2,
    REFUSED_BY_AIRLINE = 3,
    EDITED_BY_AIRLINE = 4,
    APPROVED_BY_DISPATCHER = 5,
    REFUSED_BY_DISPATCHER = 6,
    EDITED_BY_DISPATCHER = 7,
    APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE = 8,
}

export interface Application {
    id: number;
    start_time: string;
    end_time: string;
    status: Status;
    resource: number;
    user: number;
    service_estimation: null;
    worker_estimation: null;
    resource_estimation: null;
    parking_place: number;
}

export interface Resource {
    id: number;
    title: string;
    description: string;
    photo: string;
    geo_lat: number;
    geo_lon: number;
}

export interface ParkingPlace {
    id: number;
    code: string;
    geo_lat: string;
    geo_lon: string;
}
