import mongoose from 'mongoose';

const _db = mongoose.connection.useDb('main_db');

/// This will be the main database name
export const db = {
  // Product: _db.model<ProductDocument>('Product', productSchema),
};
