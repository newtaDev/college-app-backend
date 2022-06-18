import mongoose from 'mongoose';

const db = mongoose.connection.useDb('test');

export const testDb = {
    // Product: db.model<ProductDocument>('Product', productSchema),
} 