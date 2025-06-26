import Contact from "../db/Contact.js";

export const listContacts = (query) =>
  Contact.findAll({
    where: query,
  });

export const getContactById = (contactId) => Contact.findByPk(contactId);

export const addContact = (payload) => Contact.create(payload);

export const updateContact = async (contactId, newData) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update(newData);
  return contact;
};

export const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

export const updateStatusContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update({ favorite: body.favorite });
  return contact;
};
