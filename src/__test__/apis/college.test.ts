import supertest from 'supertest';
import { I_College } from '../../modules/college/college.model';
import test_data from '../config/test_data';
import test_ids from '../config/test_ids';
import { disconnectAllTestingDb, testApp } from '../config/test_server';

let accessToken: string;

const createCollegePayload = <I_College>{
  _id: test_ids.collgeId1,
  name: 'Scared Heart',
  email: 'emailId@gmail.com',
  mobile: 8374837,
  website: 'www.college.com',
  address: 'Addres of the specified collge will be here',
  description: 'description of the specified college wwill be here',
};

describe('College routes', () => {
  // beforeAll(async () => {
  //   server = await testApp.listen();
  // });
  afterAll(async () => {
    await disconnectAllTestingDb();
  });
  describe('Create College', () => {
    describe('User Login', () => {
      it('Should Login as teacher', async () => {
        const teacher = await supertest(testApp.express)
          .post('/api/v1/user/login')
          .send({
            email: 'newta.teacher@gmail.com',
            password: 'Newta1234',
            userType: 'TEACHER',
          })
          .expect(200);
        expect(teacher?.body?.responseData?.accessToken).not.toBeNull();
        accessToken = teacher.body.responseData.accessToken;
      });
    });

    //* First create users and authenticate to run these test
    describe('Validate Create College', () => {
      describe('If Invalid data passed', () => {
        ///
        it('Name should not be number', async () => {
          await supertest(testApp.express)
            .post('/api/v1/colleges')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              name: 123,
            })
            .expect(422);
        });
      });
      describe('If payload contains unwanted fields', () => {
        it('Unwanted fields should not accept', async () => {
          await supertest(testApp.express)
            .post('/api/v1/colleges')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              ...createCollegePayload,
              unwaaaaamted: 'valuessss',
            })
            .expect(422);
        });
      });
      describe('If payload missed required fields', () => {
        it('No required fields should be null', async () => {
          await supertest(testApp.express)
            .post('/api/v1/colleges')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({})
            .expect(422);
        });
      });
    });
    describe('Create 2nd college', () => {
      it('Should create 2nd college', async () => {
        await supertest(testApp.express)
          .post('/api/v1/colleges')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(test_data.createCollege2Payload)
          .expect(201);
      });
      it('Should find 2nd college', async () => {
        await supertest(testApp.express)
          .get(`/api/v1/colleges/${test_data.createCollege1Payload._id}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
    });
    describe('After Creating College', () => {
      it('Should contain 2 colleges', async () => {
        const _res = await supertest(testApp.express)
          .get('/api/v1/colleges')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
        const collgesList = _res.body.responseData;
        expect(collgesList.length).toEqual(2);
      });
      it('Collge creation should fail with same payload', async () => {
        await supertest(testApp.express)
          .post('/api/v1/colleges')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(test_data.createCollege2Payload)
          .expect(400);
      });
    });
  });
});
