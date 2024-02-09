import { Document } from "mongoose";

// DB types
export interface userType {
    name?: string,
    email?: string,
    passwd?: string
}

export interface sellerType {
    name?: string,
    email?: string,
    passwd?: string,
    role?: string
}

export interface productType {
    name?: string,
    desc?: string,
    price?: string,
    image?: string,
    arLink?: string,
    keywords?: string[],
    createdAt?: Date
}


export interface userDocType extends Document, userType {
}

export interface sellerDocType extends Document, sellerType {
}


// ..