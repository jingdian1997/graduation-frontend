import { get, post } from './axios';

export const bookIndex = () => get("book/index");

export const newBooks = () => get("book/news");

export const categoryList = (cid) => get("category/list/" + cid);

export const bookList = (page, cid, query) => {
    let queryString = "?category=" + cid;

    if (query !== null) {
        queryString = queryString + "&query=" + query;
    }

    return get("book/list/" + page + "/999" + queryString);
};

export const userGet = () => get("user/get");

export const userChangeInfo = (user) => post("user/changeInfo", user);

export const userChangeTel = (tel) => post("user/changeTel", {tel: tel});

export const userChangeMail = (mail) => post("user/changeMail", {mail: mail});

export const userChangePwd = (pwdModel) => post("user/changePwd", pwdModel);

export const bookComments = (bid) => get("comment/bookComments/" + bid + "/1/999");

export const bookOne = (bid) => get("book/one/" + bid);

export const createVisit = (bid) => post("visit/create/" + bid, null);

export const addCart = (bid) => post("cart/addTo/" + bid, null);

export const focusFocus = (bid) => post("focus/focus/" + bid, null);

export const ifFocused = (bid) => get("focus/ifFocused/" + bid);

export const userLogin = (params) => post("user/login", params);

export const userRegister = (params) => post("user/register", params);

export const userLogout = () => post("user/logout");