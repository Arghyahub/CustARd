import { Document } from "mongoose";

// DB types
export interface userType {
    name?: string,
    email?: string,
    passwd?: string
}
export interface userDocType extends Document,userType {
}


// ..



