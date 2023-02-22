import mongoose from 'mongoose';
import 'dotenv/config';

const connectDb = async () => {
	try {
		mongoose.set('strictQuery', false);
		const conn = await mongoose.connect(process.env.MONGO_URI!);
		console.log(`MongoDB connected at: ${conn.connection.host}`);
	} catch (error: any) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

export {connectDb};


//test!