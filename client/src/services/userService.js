import http from "./httpService";
import { Api } from "../config.json";

const apiUser = Api + "auth/"

export function getInvitations() {
    return http.get(`${apiUser}invitations`)
}

export function getNotifications() {
    return http.get(`${apiUser}notifications`)
}

export function putInvitations(user, category) {
    return http.put(`${apiUser}invitations/${user}/${category}`)
}

export function putNotifications(user, category) {
    return http.put(`${apiUser}notifications/${user}/${category}`)
}

export function deleteInvitations(user, category) {
    return http.delete(`${apiUser}invitations/${user}/${category}`)
}

export function deleteNotifications(user, category) {
    return http.delete(`${apiUser}notifications/${user}/${category}`)
}