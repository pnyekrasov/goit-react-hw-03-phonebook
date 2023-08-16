import { List, ListItem, ContactCard, Button } from './ContactList.styled';

export const ContactList = ({ items, onDelete }) => {
  return (
    <List>
      {items.map(item => (
        <ListItem key={item.id}>
          <ContactCard>
            {item.name}:&nbsp;<span>{item.number}</span>
            <Button type="button" onClick={() => onDelete(item.id)}>
              Delete
            </Button>
          </ContactCard>
        </ListItem>
      ))}
    </List>
  );
};
