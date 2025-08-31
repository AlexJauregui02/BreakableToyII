
export interface apiResponse<T> {
    meta: meta;
    data: T[];
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