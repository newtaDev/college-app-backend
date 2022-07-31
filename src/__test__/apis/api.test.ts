import App from '../../app';
import supertest from 'supertest';
import { connectToTestingDb, disconnectAllTestingDb } from '../test_server';

let app: App;
describe('Check api test', () => {
  beforeAll(async () => {
    app = await connectToTestingDb();
    // await db.college.dropDatabase();
    // await db.user.dropDatabase();
  });
  afterAll(async () => {
    await disconnectAllTestingDb();
  });
  it('Initial test should pass', async () => {
    await supertest(app.express).get('/api/v1/colleges').expect(401)
    // app.express.get('http://localhost:1377/api/v1/colleges')
    expect('OK').toEqual('OK');
  });
});
