import {
  List,
  ListItem,
  ContactCard,
  ButtonDelete,
  ButtonReset,
} from './ContactList.styled';

export const ContactList = ({ onReset, items, onDelete }) => {
  return (
    <List>
      <ButtonReset type="button" onClick={onReset}>
        Reset
      </ButtonReset>
      {items.map(item => (
        <ListItem key={item.id}>
          <ContactCard>
            {item.name}:&nbsp;<span>{item.number}</span>
            <ButtonDelete type="button" onClick={() => onDelete(item.id)}>
              Delete
            </ButtonDelete>
          </ContactCard>
        </ListItem>
      ))}
    </List>
  );
};
