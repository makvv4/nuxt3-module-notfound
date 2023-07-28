import makeContactsService from '../../services/contacts.service.js';

const router = createRouter();

const getContact = defineEventHandler(async (event) => {
	const { id } = event.context.params;
	try {
		const contactsService = makeContactsService();
		const contact = await contactsService.getContactById(id);
		if (contact) {
			return contact;
		}
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: `An error occurred while retrieving contact with id=${id}`,
		});
	}

	throw createError({
		statusCode: 404,
		message: 'Contact not found',
	});
});

const updateContact = defineEventHandler(async (event) => {
	const { id } = event.context.params;
	const body = await readBody(event);

	if (Object.keys(body).length === 0) {
		throw createError({
			statusCode: 400,
			message: 'Data to update can not be empty',
		});
	}

	try {
		const contactsService = makeContactsService();
		const updated = await contactsService.updateContact(id, body);
		if (updated) {
			return updated;
		}
	} catch (error) {
		console.log(error);
		throw createError({
			statusCode: 500,
			message: `An error occurred while updating contact with id=${id}`,
		});
	}

	throw createError({
		statusCode: 404,
		message: 'Contact not found',
	});
});

const deleteContact = defineEventHandler(async (event) => {
	const { id } = event.context.params;

	try {
		const contactsService = makeContactsService();
		const deleted = await contactsService.deleteContact(id);
		if (deleted) {
			return {
				message: 'OK',
			};
		}
	} catch (error) {
		console.log(error);
		throw createError({
			statusCode: 500,
			message: `An error occurred while deleting contact with id=${id}`,
		});
	}

	throw createError({
		statusCode: 404,
		message: 'Contact not found',
	});
});

router.use(
	'/:id',
	defineEventHandler(() => {
		throw createError({
			statusCode: 405,
			message: 'Method Not Allowed',
		});
	}),
);

router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default useBase('/api/contacts', router.handler);
