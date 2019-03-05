import { get, post } from './axios';

export const login = (params) => post("admin/login", params);

export const logout = () => post("admin/logout");

export const orderList = (status) => get("order/list/" + status);

export const orderDetail = (oid) => get("order/one/" + oid);

export const confirmOrder = (oid) => post("order/confirmOrder/" + oid);

export const deliverOrder = (oid, deliverNo) => post("order/deliverOrder", {
    oid: oid,
    deliverNo: deliverNo,
});

export const categoryList = (cid) => get("category/list/" + cid);

export const categoryOne = (id) => get("category/one/" + id);

export const categoryInsert = (name, parentId) => post("category/insert", {
    parentId: parentId,
    name: name,
});

export const categoryDelete = (id) => post("category/delete/" + id);

export const categoryActive = (id) => post("category/active/" + id);

export const categoryUpdate = (id, name) => post("category/update", {
    id: id,
    name: name,
});

export const bookInsert = (ISBN, name, author, publisher, publishDate, price, picture, description, cid) => post("book/insert", {
    isbn: ISBN,
    name: name,
    author: author,
    publisher: publisher,
    publishDate: publishDate,
    price: price,
    picture: picture,
    description: description,
    cid: cid,
});

export const bookUpdate = (id, description) => post("book/update", {
    id: id,
    description: description,
});

export const bookUpdatePicture = (id, picture) => post("book/updatePicture", {
    id: id,
    picture: picture,
});

export const bookPullOff = (id) => post("book/pullOff/" + id);

export const bookList = (cid, query) => {
    let queryString = "?category=" + cid;

    if (query !== null && query !== '') {
        queryString = queryString + "&query=" + query;
    }

    return get("book/list/1/999" + queryString);
};

export const bookOne = (id) => get("book/one/" + id);