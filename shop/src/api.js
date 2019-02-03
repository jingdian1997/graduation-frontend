import { get, post } from './axios';

export const bookIndex = () => get("book/index");

export const categoryList = (cid) => get("category/list/" + cid);

export const bookList = (page, cid, query) => {
    let queryString = "?category=" + cid;

    if (query !== null) {
        queryString = queryString + "&query=" + query;
    }

    return get("book/list/" + page + "/10" + queryString);
};

export const userGet = () => get("user/get");