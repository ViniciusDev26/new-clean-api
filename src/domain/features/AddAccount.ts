import { Account } from '../models/Account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (addAccountModel: AddAccountModel) => Promise<Account>
}
