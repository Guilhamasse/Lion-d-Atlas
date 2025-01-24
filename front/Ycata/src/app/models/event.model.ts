
export interface Event {
date: string|number|Date;
zone: any;
type: any;
    id: string;
    name: string;
    description: string;
    start_time: Date;
    end_time: Date;
    severity: string;
    level: number;
    magnitude: number;
    event_type_id: number;
    zone_id: number;
    updatedAt: Date;
    createdAt: Date;
}
