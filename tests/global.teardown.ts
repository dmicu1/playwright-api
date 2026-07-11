import { test as teardown } from '@playwright/test'
import Logger from '../utils/Loggers'

teardown('deleting database', async({request})=>{
    Logger.info("After all => deleting database")
})