import { testApp } from './config/test_server';

describe('All test running in order', () => {
  beforeAll(async () => {
    await testApp.listen();
  });

  
  it('⚡️ 🤍 Tested 🤍 ⚡️', () => {
    expect('OK').toEqual('OK');
  });
});

import './apis/_initial_.test';
import './apis/college.test';
