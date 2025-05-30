import {Review} from "./review";

export interface ProductDetails {
  id: number,
  name: string,
  description: string,
  fullDescription: string,
  category: string,
  price: number,
  salePrice: number,
  currency: string,
  image: string,
  slug: string,
  reviews: Review[]
}
