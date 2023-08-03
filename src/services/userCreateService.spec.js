const UserCreateService = require("./userCreateService");
const UserRepositoryInMemory = require('../repositories/userRepositoryinMemory')
const AppError = require("../utils/AppError");


describe("UserCreateService tests", () => {

  let userRepository = null;
  let userCreateService = null;

  // O beforeEach faz com que executemos comandos semelhantes a todos os testes englobados pelo describe.

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  })
  

  it("user should be create", async () => {
    const user = {
      name: "user teste",
      email: "user@test.com",
      password: "123"
    }
    const userCreated = await userCreateService.execute(user);    
    expect(userCreated).toHaveProperty("id");
  })
  
  it("user not should be create with exists email", async () => {
    
    const user1 = {
      name: "user1",
      email: "user@test.com",
      password: "123"
    }
    
    const user2 = {
      name: "user2",
      email: "user@test.com",
      password: "124"
    }

    await userCreateService.execute(user1)/
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Email já está em uso."))
    // esperamos que o segundo usuário seja rejeitado (rejects) e que a msg disparada seja igual a dentro do new AppError.
  })
})
