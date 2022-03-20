import { IPageMetaData } from "./page-metadata";


export interface IRoute {
    route: string;
    component: any;
}

export interface IRouteProp extends IRoute {
    metaData: IPageMetaData
}