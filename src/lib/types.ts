import { FC } from "react";

export interface IProducts {
  id: number,
  name: string,
  description: string,
  price: string,
  stock: number
}

type EmailIconProps = React.ComponentProps<'svg'>;
export type IconType = FC<EmailIconProps>

export interface IUser {
  id: number;
  email: string;
}

export interface ILoginResponse {
  data: ILoginResponse;
  user_data: IUser;
  token: string;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  message: string;
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IProductsResponse extends IPaginatedResponse<IProducts> { }

export enum TableCols {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
  PRICE = 'price',
  STOCK = 'stock'
}