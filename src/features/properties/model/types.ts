import { z } from 'zod';

export const PropertySchema = z.object({
	id: z.number().int().positive({ message: 'ID must be a positive integer' }),
	image: z.url({ message: 'Image URL must be a valid URL' }),
	rating: z.number().min(0).max(5),
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(100, { message: 'Title must be at most 100 characters long' }),
	type: z
		.string()
		.min(1, { message: 'Type is required' })
		.max(50, { message: 'Type must be at most 50 characters long' }),
	location: z
		.string()
		.min(1, { message: 'Location is required' })
		.max(100, { message: 'Location must be at most 100 characters long' }),
	details: z
		.string()
		.min(1, { message: 'Details are required' })
		.max(500, { message: 'Details must be at most 500 characters long' }),
	host: z
		.string()
		.min(1, { message: 'Host is required' })
		.max(100, { message: 'Host must be at most 100 characters long' }),
	guests: z
		.number()
		.min(1, { message: 'Guests must be at least 1' })
		.optional(),
	price: z.number().min(0, { message: 'Price must be a positive number' }),
});

export type Property = z.infer<typeof PropertySchema>;
