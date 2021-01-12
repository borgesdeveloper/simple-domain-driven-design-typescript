import 'reflect-metadata'
import * as dotenv from 'dotenv'
import IocResolver from '@infrastructure/injections/ioc-resolver'
import routes from '@main/routes'

dotenv.config()

async function init () {
  const ioc = new IocResolver()
  await ioc.resolve()
  await routes()
}

init().catch((error) => console.log(error))
