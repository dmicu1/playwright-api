import { test as setup } from '@playwright/test'
import Logger from '../utils/Loggers'

setup('Create a new database', async({request}) => {

    Logger.info('Before all test =>creating database')
})