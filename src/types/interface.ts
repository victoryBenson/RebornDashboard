export interface DataState {
    users?: ProductState[],
    isLoading?: boolean,
    isError?:  unknown | string,
    user?: string
}

export interface ProductState {
    brand?: string;
    rating?: number;
    id?: number; 
}