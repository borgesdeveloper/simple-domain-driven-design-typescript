import 'reflect-metadata'
import * as dotenv from 'dotenv'
import Routes from 'src/presentation/routes'
import IocResolver from '@infrastructure/injections/ioc-resolver'

dotenv.config()

async function Init () {
  const ioc = new IocResolver()
  await ioc.resolve()
  await Routes()
}

Init().catch((error) => console.log(error))
