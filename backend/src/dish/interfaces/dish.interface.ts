export interface Dish {
  _id: string;
  title: string;
  img: string;
  recipe: string;
  ingredients: { ingredient: string; proportion: string }[];
  rating: number;
  groups: string[];
  products: string[];
}
