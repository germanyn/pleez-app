import { Express } from 'express'
import { Server } from 'net';

global.console = {
  ...global.console,
  log: jest.fn()
}

describe('Server', () => {
  let app: Express
  let server: Server
  beforeEach(async () => {
    app = (await import('./server')).default;
    server = (await import('./server')).ready;
    await server
  });
  afterEach(async () => {
    await server.close()
  });
  it('Inicia o server sem crashar', async (done) => {
    expect(console.log).toHaveBeenCalledWith(`🚀 Server ready at http://localhost:4000/`)
    done()
  })
})