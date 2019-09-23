import { Mongoose } from 'mongoose'

global.console = {
  ...global.console,
  log: jest.fn()
}

describe('Database', () =>{
  let database: Mongoose
  let connection: Promise<void>
  beforeEach(async () => {
    database = (await import('./database')).default;
    connection = (await import('./database')).connection;
    await connection
  });
  afterEach(async () => {
    await database.disconnect()
  });
  it('Inicia o banco sem crashar', async (done) => {
    expect(console.log).toHaveBeenCalledWith(`Conectado com sucesso.`)
    done()
  })
})