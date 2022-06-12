export enum EIPCEventName{
    SET_LOGIN_ITEMS = 'setLoginItems',
    GET_LOGIN_ITEMS = 'getLoginItems'
}

export const isElectron = process.env.IS_ELECTRON