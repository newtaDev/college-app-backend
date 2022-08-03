import supertest from 'supertest';
import { testApp } from '../config/test_server';
import db from '../../config/database/db';
import test_data from '../config/test_data';

let accessToken: string;
describe('Initial Test', () => {
  beforeAll(async () => {
    if (process.env.NODE_ENV == 'test' && testApp.isTestingEnv) {
      await db.college.dropDatabase();
      await db.user.dropDatabase();
    }
  });

  it('Initial Health Check', async () => {
    await supertest(testApp.express).get('/health').expect(200);
    expect('OK').toEqual('OK');
  });

  describe('Create an Admin', () => {
    it('Should create admin user', async () => {
      const adminUser = await supertest(testApp.express)
        .post('/api/v1/user/register/admin')
        .send(test_data.createAdmin1)
        .expect(201);
      expect(adminUser?.body?.responseData?.accessToken).not.toBeNull();
      accessToken = adminUser.body.responseData.accessToken;
    });
  });
  describe('Create 1st College', () => {
    it('Should create 1 college', async () => {
      await supertest(testApp.express)
        .post('/api/v1/colleges')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(test_data.createCollege1Payload)
        .expect(201);
    });
    it('Should contain 1 college', async () => {
      const _res = await supertest(testApp.express)
        .get('/api/v1/colleges')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
      const collgesList = _res.body.responseData;
      expect(collgesList.length).toEqual(1);
    });
  });
  describe('Create a teacher', () => {
    it('Should create 1 teacher', async () => {
      await supertest(testApp.express)
        .post('/api/v1/user/register/teacher')
        .send(test_data.createTeacher1)
        .expect(201);
    });
    it('Teacher Login should be success', async () => {
      await supertest(testApp.express)
        .post('/api/v1/user/login')
        .send({
          email: test_data.createTeacher1.email,
          userType: 'TEACHER',
          password: test_data.createTeacher1.password,
        })
        .expect(200);
    });
  });
});
