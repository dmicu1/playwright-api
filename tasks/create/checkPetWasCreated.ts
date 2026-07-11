import test, { APIResponse, expect } from "@playwright/test";

import type { NewPetResponseModel } from "../../models/newPetResponseModel";
import Logger from "../../utils/Loggers";

export class CheckPetWasCreated {

    private expectedPet: any

    constructor(expectedPet: any) {
        this.expectedPet = expectedPet
    }

    public async withInfo(newPetResponse: APIResponse): Promise<void> {
     await test.step(`Checking the pet was created`, async()=>{
        const newPetJsonResponse = await newPetResponse.json()
        console.log(JSON.stringify(newPetJsonResponse))

        const newPetResponseModel = newPetJsonResponse as NewPetResponseModel

        const headers = newPetResponse.headersArray()
        headers.forEach(cabecera => console.log(`name: ${cabecera.name} value:${cabecera.value}`))

        const keepAliveHeader = headers.find(header => header.name.toLowerCase() === 'keep-alive')?.value
        console.log('Keep Alive header value', keepAliveHeader)

        expect(newPetResponse.status()).toBe(201)
        expect(newPetJsonResponse.status).toBe("success")
        expect(newPetJsonResponse.message).toContain("Pet")


        expect(newPetResponseModel.data.name).toBe(this.expectedPet.name)
        expect(newPetResponseModel.data.type, "the pet type is not the expected").toBe(this.expectedPet.type)
        expect(newPetJsonResponse.data.id).toBeTruthy()

        console.log("status:", newPetJsonResponse.status)
        console.log("message:", newPetJsonResponse.message)
        console.log("data type:", newPetJsonResponse.data.type)


        Logger.error("this is an error")
        Logger.info("Pet was created successfuly")



        })

        
    }

}
