import test from "@playwright/test"
import type { NewPetRequestModel } from "../../models/newPetRequestModel"
import { CheckPetWasCreated } from "../../tasks/create/checkPetWasCreated"
import { CreateNewPet } from "../../tasks/create/createNewPet"
import Logger from "../../utils/Loggers"


/*test.beforeEach(async () => {

   Logger.info("running before test")

})

test.beforeAll("Ante todas", async()=>{

   Logger.info("Running before all")

})*/


test('Should create a new pet', async ({ request }) => {
  const { faker } = await import("@faker-js/faker")

  const newPetRequest: NewPetRequestModel = {
    name: faker.lorem.paragraph(),
    type: "Perro",
    age: 1
  }
  Logger.info("creating a new pet")
  const createNewPet = new CreateNewPet(request)
  const newPetResponse = (await createNewPet.withInfo(newPetRequest))

  const checkPetWasCreated = new CheckPetWasCreated(newPetRequest)
  await checkPetWasCreated.withInfo(newPetResponse)

})
test('Should create a new pet 2', async ({ request }) => {
  const { faker } = await import("@faker-js/faker")

  const newPetRequest: NewPetRequestModel = {
    name: faker.lorem.paragraph(),
    type: "Perro",
    age: 1
  }
  Logger.info("creating a new pet")
  const createNewPet = new CreateNewPet(request)
  const newPetResponse = (await createNewPet.withInfo(newPetRequest))

  const checkPetWasCreated = new CheckPetWasCreated(newPetRequest)
  await checkPetWasCreated.withInfo(newPetResponse)

})

/*test.afterAll("Despues todas", async()=>{

   Logger.info("Running after all")
})

/*test.afterEach(async () => {

     Logger.info("running after test")

})
function async(arg0: { request: { (options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest; (url: string | URL, options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest } }): (args: import("playwright/test").PlaywrightTestArgs & import("playwright/test").PlaywrightTestOptions & import("playwright/test").PlaywrightWorkerArgs & import("playwright/test").PlaywrightWorkerOptions, testInfo: import("playwright/test").TestInfo) => Promise<any> | any {
  throw new Error("Function not implemented.")
}

*/