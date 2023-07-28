import db from '../database/index.js';

function makeContactsService() {
	const contacts = db('contacts');

	function readContact(payload) {
		const contact = {
			name: payload.name,
			email: payload.email,
			address: payload.address,
			phone: payload.phone,
			favorite: payload.favorite,
		};
		// Remove undefined fields
		Object.keys(contact).forEach(
			(key) => contact[key] === undefined && delete contact[key],
		);
		return contact;
	}

	async function createContact(payload) {
		const contact = readContact(payload);
		const [id] = await contacts.insert(contact);
		return { id, ...contact };
	}

	async function getManyContacts(query) {
		const { name, favorite } = query;
		return contacts
			.where((builder) => {
				if (name) {
					builder.where('name', 'like', `%${name}%`);
				}
				if (favorite !== undefined) {
					builder.where('favorite', 1);
				}
			})
			.select('*');
	}

	async function getContactById(id) {
		return contacts.where('id', id).select('*').first();
	}

	async function updateContact(id, payload) {
		const update = readContact(payload);
		return contacts.where('id', id).update(update);
	}

	async function deleteContact(id) {
		return contacts.where('id', id).del();
	}

	async function deleteAllContacts() {
		return contacts.del();
	}

	return {
		getManyContacts,
		deleteAllContacts,
		getContactById,
		createContact,
		updateContact,
		deleteContact,
	};
}

export default makeContactsService;
