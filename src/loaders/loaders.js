import { getContact, getContacts } from '../utils/utils';

export const contactsLoader = async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';
    const contacts = await getContacts(q);
    return { contacts, q };
};

export const contactLoader = async ({ params }) => {
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response('', {
            status: 404,
            statusText: 'Not Found',
        });
    }
    return { contact };
};
