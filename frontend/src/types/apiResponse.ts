
export interface apiResponse<T> {
    meta: meta;
    data: T[];
    dictionaries?: dictionary;
}  

interface meta {
    count: number;
    links: metaLink;
}

interface metaLink {
    self?: string;
    next?: string;
    previous?: string;
    last?: string;
    first?: string;
    up?: string;
}

interface dictionary {
    locations?: {
        [iataCode: string]: locationValue;
    };
    aircraft?: {
        [code: string]: string;
    };
    currencies?: {
        [code: string]: string;
    };
    carriers?: {
        [code: string]: string;
    };
}

interface locationValue {
    cityCode?: string;
    countryCode?: string;
}