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