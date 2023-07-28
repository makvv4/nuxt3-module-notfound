import makeContactsService from '../../services/contacts.service.js';

const router = createRouter();

const getContactsByFilter = defineEventHandler(async (event) => {
	const query = getQuery(event);

	try {
		const contactsService = makeContactsService();
		return await contactsService.getManyContacts(query);
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: 'An error occurred while retrieving contacts',
		});
	}
});

const createContact = defineEventHandler(async (event) => {
	const body = await readBody(event);

	if (!body?.name || !body?.phone) {
		throw createError({
			statusCode: 400,
			message: 'Name and phone can not be empty',
		});
	}

	try {
		const contactsService = makeContactsService();
		return await contactsService.createContact(body);
	} catch (error) {
		console.log(error);
		throw createError({
			statusCode: 500,
			message: 'An error occurred while creating contact',
		});
	}
});

const deleteAllContacts = defineEventHandler(async () => {
	try {
		const contactsService = makeContactsService();
		await contactsService.deleteAllContacts();
		return {
			message: 'OK',
		};
	} catch (error) {
		console.log(error);
		throw createError({
			statusCode: 500,
			message: 'An error occurred while deleting contacts',
		});
	}
});

router.use(
	'/',
	defineEventHandler(() => {
		throw createError({
			statusCode: 405,
			message: 'Method Not Allowed',
		});
	}),
);

router.get('/', getContactsByFilter);
router.post('/', createContact);
router.delete('/', deleteAllContacts);

export default useBase('/api/contacts', router.handler);
