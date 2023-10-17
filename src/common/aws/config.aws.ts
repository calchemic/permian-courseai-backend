import { SESClient } from '@aws-sdk/client-ses';
import { fromEnv } from '@aws-sdk/credential-providers';

export const AWSSES = new SESClient({
  apiVersion: '2010-12-01',
  credentials: fromEnv(),
  region: 'ca-central-1',
});
