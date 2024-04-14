//todo: add Type validator
import { AppError } from "../middlewares/appError"

type ValidatorItem = {
    key: string
    label: string
}
export function validator(arr: ValidatorItem[]) {
    return (object: { [key: string]: any }) => {
        let invalidKeys = [] as ValidatorItem[]
        arr.forEach(i => {
            if (!object[i.key]) invalidKeys.push(i)
        })
        if (invalidKeys.length > 0) throw new AppError(`Credenciais incorretas: ${invalidKeys.map(i => i.label).join(', ')}`)
    }
}

export const USER_VALIDATOR: ValidatorItem[] = [
    { key: 'username', label: 'Nome de usuário' },
    { key: 'email', label: 'email' },
    { key: 'CPF', label: 'CPF' },
    { key: 'CEP', label: 'CEP' },
    { key: 'password', label: 'Senha' },
]