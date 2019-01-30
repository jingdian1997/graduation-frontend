import { get, post } from './axios';

export const bookIndex = () => get("book/index");

export const categoryList = (cid) => get("category/list/" + cid);