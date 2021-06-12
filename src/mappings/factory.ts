import { log, BigInt } from '@graphprotocol/graph-ts'
import { PairCreated } from '../../generated/Factory/Factory'
import { Account, Pair, Token } from '../../generated/schema'
import { Pairs as PairTemplate } from '../../generated/templates'
import * as Utils from '../utils'


export function handlePairCreated(event: PairCreated): void {
  log.debug('error 1', [])
  let factory = Account.load(Utils.FactoryAddress)
  log.debug('error 2', [])
  if (factory === null) {
    factory = new Account(Utils.FactoryAddress)
    factory.save()
  }
  // create the tokens
  let token0 = Token.load(event.params.token0.toHexString())
  let token1 = Token.load(event.params.token1.toHexString())
  log.debug('error 3', [])

  // fetch info if null
  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString())
    token0.blockNumber = event.block.number
    token0.timestamp = event.block.timestamp
    token0.symbol = Utils.getTokenSymbol(event.params.token0)
    token0.name = Utils.getTokenName(event.params.token0)
    token0.tokenStandard = 'ERC20'
    let decimals = Utils.getTokenDecimals(event.params.token0)
    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('Decimal is null', [])
      return
    }
  }
  log.debug('error 4', [])
  // fetch info if null
  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString())
    token1.blockNumber = event.block.number
    token1.timestamp = event.block.timestamp
    token1.symbol = Utils.getTokenSymbol(event.params.token1)
    token1.name = Utils.getTokenName(event.params.token1)
    token1.tokenStandard = 'ERC20'
    let decimals = Utils.getTokenDecimals(event.params.token1)
    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('Decimal is null', [])
      return
    }
  }
  log.debug('error 5', [])
  let pair = new Pair(event.params.pair.toHexString()) as Pair
  pair.token0 = token0.id
  pair.token1 = token1.id
  pair.factory = factory.id
  pair.reserve0 = BigInt.fromI32(0)
  pair.reserve1 = BigInt.fromI32(0)
  pair.totalSupply = BigInt.fromI32(0)
  pair.blockNumber = event.block.number
  pair.timestamp = event.block.timestamp
  log.debug('error 6', [])
  PairTemplate.create(event.params.pair)
  token0.save()
  token1.save()
  pair.save()
  log.debug('error 7', [])
}