export function edit(contactToEdit, setNewData, setContacts) {
  setNewData(contactToEdit);
  setContacts((prev) =>
    prev.map((contact) =>
      contact.email === contactToEdit.email
        ? { ...contact, editMode: true }
        : { ...contact, editMode: false }
    )
  );
}
