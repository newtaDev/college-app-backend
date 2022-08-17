import { testApp } from './config/test_server';

describe('All test running in order', () => {
  beforeAll(async () => {
    await testApp.listen();
  });

  
  it('⚡️ 🤍 Testing 🤍 ⚡️', () => {
    expect('OK').toEqual('OK');
  });
});

/// By importing files in orider will also run tests in order
import './apis/_initial_.test';
import './apis/college.test';
