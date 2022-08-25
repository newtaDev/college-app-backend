import { MongooseDocumentMiddleware, MongooseQueryMiddleware } from 'mongoose';

/// Added All Docs hook except [validate] hook
/// because both [save] and [validate] hooks are invoked while creating docs
export const docHooks: MongooseDocumentMiddleware[] = [
  'validate',
  'remove',
  'updateOne',
  'deleteOne',
  'init',
];
export const queryHooks: MongooseQueryMiddleware[] = [
  'count',
  'deleteMany',
  'deleteOne',
  'distinct',
  'find',
  'findOne',
  'findOneAndDelete',
  'findOneAndRemove',
  'findOneAndUpdate',
  'remove',
  'update',
  'updateOne',
  'updateMany',
];
