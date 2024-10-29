export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category {
    id: string,
    name: string;
    billboard: Billboard;
};

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    description: string;
    quantity: number;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[];
};

export interface Image {
    id: string;
    url: string;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}

export interface Color {
    id: string;
    name: string;
    value: string;
}

export interface Store {
    id: string;
    name: string;
    location: string;
}