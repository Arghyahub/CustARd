import { atom } from "recoil";

import { UserDataType } from "@/types/types";

const userDataAtom = atom({
    key: 'user', // unique ID (with respect to other atoms/selectors)
    default: { name: '', email: '', _id: '' } as UserDataType, // default value (aka initial value)
});

const screenWidthAtom = atom({
    key: 'screenwidth',
    default: window.innerWidth
})

interface toastParamType {
    title: string,
    desc: string,
    hasFunc: boolean,
    func?: () => void
}
const toastParamAtom = atom({
    key: 'toastParam',
    default: {title: '', desc: '', hasFunc: false, func: () => {}} as toastParamType
})


const loadingAtom = atom({
    key: 'loading',
    default: {open: false, text: ''} as {open:boolean, text?:string}
})


export {
    userDataAtom,
    screenWidthAtom,
    toastParamAtom,
    loadingAtom,

}