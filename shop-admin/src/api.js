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