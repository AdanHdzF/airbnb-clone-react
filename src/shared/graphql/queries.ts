import { gql } from '@apollo/client';

export const GET_PROPERTIES = gql`
	query GetProperties {
		properties {
			id
			type
			title
			details
			price
			location
			image
			rating
			host
		}
	}
`;

export const GET_PROPERTY = gql`
	query GetProperty($id: Int!) {
		property(id: $id) {
			id
			type
			title
			details
			price
			location
			image
			rating
			host
		}
	}
`;

export const ADD_PROPERTY = gql`
	mutation AddProperty($input: PropertyInput!) {
		addProperty(input: $input) {
			id
			type
			title
			details
			price
			location
			image
			rating
			host
		}
	}
`;
