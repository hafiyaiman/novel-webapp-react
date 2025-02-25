export interface Novel {
    id: number;
    title: string;
    author: string;
    publication: string;
    genre: string;
    ratings: number;
    summary: string;
    cover: NovelCover;
}

export interface NovelCover {
    id: number;
    name: string;
    url: string;
    size: number;
    formats: {
        small: ImageFormat;
        medium: ImageFormat;
        thumbnail: ImageFormat;
    };
}

export interface ImageFormat {
    url: string;
    size: number;
    width: number;
    height: number;
}
