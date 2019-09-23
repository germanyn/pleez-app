import { ApolloServer } from 'apollo-server';

global.console = {
  ...global.console,
  log: jest.fn()
}

describe('Server', () => {
  let server: ApolloServer
  let ready: Promise<void>
  beforeEach(async () => {
    server = (await import('./server')).default;
    ready = (await import('./server')).ready;
    await ready
  });
  afterEach(async () => {
    await server.stop()
  });
  it('Inicia o server sem crashar', async (done) => {
    expect(console.log).toHaveBeenCalledWith(`🚀 Server ready at http://localhost:4000/`)
    done()
  })
})