import { redirect } from 'react-router-dom';
import { createContact, deleteContact, updateContact } from '../utils/utils';

export const createContactAction = async () => {
    const contact = await createContact();
    return redirect(`contacts/${contact.id}/edit`);
};

export const updateContactAction = async ({ request, params }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
};

export const toggleFavoriteContactAction = async ({ request, params }) => {
    const formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get('favorite') == 'true',
    });
};

export const destroyContactAction = async ({ params }) => {
    // throw new Error('oh dang!');
    await deleteContact(params.contactId);
    return redirect('/');
};
