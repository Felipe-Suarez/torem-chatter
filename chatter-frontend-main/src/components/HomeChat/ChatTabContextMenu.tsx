import * as Menu from '@radix-ui/react-context-menu';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { setOpenTicket, setVisibility } from '../../redux/ticketSlice';

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  padding: 5px;
`;

const Item = styled(Menu.Item)`
  color: #000;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #fff;
    background-color: ${(props) => props.color};
  }
`;

export default function ChatTabContextMenu() {
  const dispatch = useAppDispatch();

  const handleShowOpenTicket = () => {
    dispatch(setVisibility(true));
    dispatch(setOpenTicket(false));
  };

  const handleShowClosedTicket = () => {
    dispatch(setOpenTicket(true));
    dispatch(setVisibility(true));
  };

  return (
    <Container>
      <Item color="#36dd81" onClick={handleShowOpenTicket}>
        Ver ticket abierto
      </Item>
      <Menu.Separator />
      <Item color="#FF3633" onClick={handleShowClosedTicket}>
        Ver ticket cerrado
      </Item>
    </Container>
  );
}
