import {gl} from "../context";



export interface VertexPointer {
    size: number
    type: number
    normalize: boolean
    stride: number
    offset: number
}