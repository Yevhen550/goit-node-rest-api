import Contact from "../db/Contact.js";

export const listContacts = (query) =>
  Contact.findAll({
    where: query,
  });

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

export const addContact = (payload) => Contact.create(payload);

export const updateContact = async (query, newData) => {
  const contact = await getContact(query);
  if (!contact) return null;

  await contact.update(newData);
  return contact;
};

export const removeContact = async (query) => {
  const contact = await getContact(query);
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

export const updateStatusContact = async (contactId, body) => {
  const contact = await getContact(contactId);
  if (!contact) return null;

  await contact.update({ favorite: body.favorite });
  return contact;
};
