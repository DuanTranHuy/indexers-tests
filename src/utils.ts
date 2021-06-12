import { Address } from '@graphprotocol/graph-ts'
import { ERC20 } from '../generated/Factory/ERC20'
import { Account } from '../generated/schema'

export const FactoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'

export function getTokenSymbol(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress)
  let symbolValue = 'unknown'
  let symbolResult = contract.try_symbol()
  if (!symbolResult.reverted) {
    symbolValue = symbolResult.value
  }
  return symbolValue
}

export function getTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress)
  let nameValue = 'unknown'
  let nameResult = contract.try_name()
  if (!nameResult.reverted) {
    nameValue = nameResult.value
  }
  return nameValue
}

export function getTokenDecimals(tokenAddress: Address): i32 {
  let contract = ERC20.bind(tokenAddress)
  let decimalValue = null
  let decimalResult = contract.try_decimals()
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value
  }
  return decimalValue as i32
}

export function createAccount(address: string): Account {
  let account = Account.load(address)
  if (account === null) {
    account = new Account(address)
    account.save()
  }
  return account
}