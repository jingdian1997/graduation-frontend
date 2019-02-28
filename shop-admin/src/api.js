import { get, post } from './axios';

export const login = (params) => post("admin/login", params);

export const logout = () => post("admin/logout");