import { expect, test } from '@playwright/test';
import { CheckPetWasCreated } from '../tasks/create/checkPetWasCreated';
import { CreateNewPet } from '../tasks/create/createNewPet';
import Logger from '../utils/Loggers';

test('Should create a new pet', async ({ request }) => {

  const newPetRequest = {
    name: "Bingotoday",
    type: "Perro",
    age: 1
  }
  Logger.info("creating a new pet")
  const createNewPet = new CreateNewPet(request)
  const newPetResponse = await createNewPet.withInfo(newPetRequest)

  const checkPetWasCreated = new CheckPetWasCreated(newPetRequest)
  await checkPetWasCreated.withInfo(newPetResponse)

})

test('Should update a pet', async ({ request }) => {

  const newPetRequest =
  {
    name: "Bingotoday",
    type: "Perro",
    age: 1
  }
  const newPetResponse = await request.post('http://localhost:3000/pets', {
    data: newPetRequest
  })

  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id

  const updatePetRequest =
  {
    name: "Bingo Update",
    type: "Lorro",
    age: 52
  }

  const updatePetResponse = await request.put('http://localhost:3000/pets/' + petId, {
    data: updatePetRequest

  })

  console.log(JSON.stringify(await updatePetResponse.json()))
  Logger.info("Pet was updated successfuly")


})

test('Should update partially a pet', async ({ request }) => {

  const newPetRequest =
  {
    name: "Bingotoday",
    type: "Perro",
    age: 1
  }
  const newPetResponse = await request.post('http://localhost:3000/pets', {
    data: newPetRequest
  })

  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id

  const updatePartiallyPetRequest =
  {
    name: "Loca de manicomio"
  }

  const updatePetResponse = await request.patch('http://localhost:3000/pets/' + petId, {
    data: updatePartiallyPetRequest

  })

  console.log(JSON.stringify(await updatePetResponse.json()))

})

test('Should delete a pet', async ({ request }) => {

  const newPetRequest =
  {
    name: "Bingotoday",
    type: "Perro",
    age: 1
  }
  const newPetResponse = await request.post('http://localhost:3000/pets', {
    data: newPetRequest
  })

  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id

  const deletePetResponse = await request.delete('http://localhost:3000/pets/' + petId)

  console.log("status", deletePetResponse.status())

})

test('Should get a pet by id', async ({ request }) => {

  const newPetRequest = {
    name: "Loca de manicomio",
    type: "Perro",
    age: 1
  }
  const newPetResponse = await request.post('http://localhost:3000/pets', {
    data: newPetRequest
  })

  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id

  const getPetByIdResponse = await request.get('http://localhost:3000/pets/' + petId)

  console.log("Response", await getPetByIdResponse.json())

})

test('Should get all pets', async ({ request }) => {

  const getAllPetsResponse = await request.get('http://localhost:3000/pets')
  console.log("Response", await getAllPetsResponse.json())
})



test('Should do basic authentificacion ', async ({ request }) => {

  const credentialsBase64 = Buffer.from('admin:password123').toString('base64')

  const basicAuthetificacionResponse = await request.get('http://localhost:3000/protected-basic', {

    headers: {
      Authorization: `Basic ${credentialsBase64}`
    }
  })
  console.log("Response status", basicAuthetificacionResponse.status())
  console.log("Response text", await basicAuthetificacionResponse.text())

})

test('Should do bearer authorization', async ({ request }) => {


  const authentificationTokenResponse = await request.post('http://localhost:3000/login', {

    data: {
      "username": "automation"
    }

  })
  const jsonResponse = await authentificationTokenResponse.json()
  const token = jsonResponse.data.accessToken
  console.log(`Token: ${token}`)

  const bearerResponse = await request.get('http://localhost:3000/protected-bearer', {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })

  expect(bearerResponse.status()).toBe(200)
  expect(await bearerResponse.text()).toBe('Hello automation, you have accessed a protected endpoint!')
})
