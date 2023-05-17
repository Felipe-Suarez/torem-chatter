import styled from 'styled-components';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getTypeTicket, getVisibility, setVisibility } from '../redux/ticketSlice';

import { MockTicketData } from '../utils/mockData';
import { useCallback, useEffect, useState } from 'react';
import { TicketData } from '../types/chat';

const greenColor = '#36dd81';
const redColor = '#FF3633';

const BGTicket = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  cursor: default;
  background-color: ${(props) => (props.isVisible ? '#0001' : 'transparent')};
  transition: backgroundColor 0.3s ease;
  pointer-events: ${(props) => (props.isVisible ? 'all' : 'none')};
`;

const TicketBox = styled.div<{ isVisible: boolean }>`
  width: 350px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  overflow: hidden;
  transform: ${(props) => (props.isVisible ? 'translateX(0)' : 'translateX(-200%)')};
  transition: transform 0.3s ease;

  @media screen and (min-width: 700px) {
    height: 200px;
    width: 600px;
    gap: 50px;
  }

  @media screen and (max-width: 350px) {
    transform: scale(0.9);
  }
`;

const halfTicket = `
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;

  @media screen and (min-width: 700px) {
    padding: 30px;
  }
`;

const TicketLeft = styled.div<{ openTicket: boolean }>`
  ${halfTicket}
  background-color: ${(props) => (props.openTicket ? redColor : greenColor)};
  width: 70%;
`;
const TicketRight = styled.div<{ openTicket: boolean }>`
  ${halfTicket}
  background-color: ${(props) => (props.openTicket ? redColor : greenColor)};
  width: 30%;
  align-items: flex-end;
  font-size: 18px;
`;
const TicketMiddle = styled.div<{ openTicket: boolean }>`
  background-color: ${(props) => (props.openTicket ? redColor : greenColor)};
  position: absolute;
  right: calc(30% - 12px);
  height: 70%;
  width: 40px;
  top: 15%;
  @media screen and (min-width: 700px) {
    width: 50px;
    right: calc(30% - 15px);
  }

  ::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 100%;
    background-color: ${(props) => (props.openTicket ? redColor : greenColor)};
    top: 0;
    left: -50%;
    z-index: -1;
  }

  ::after {
    content: '';
    position: absolute;
    border-right: 2px dashed #fafafa;
    height: 100%;
    top: 0;
    left: 9px;
    @media screen and (min-width: 700px) {
      left: 23px;
    }
  }
`;
const itemStyles = `
    width: 60px;
    height: 60px; 
    left: -20px;
    position: absolute;
    z-index: -1;
    @media screen and (min-width: 700px) {
      left: -10px;
      width: 70px;
      height: 70px;
    }
    @media screen and (max-width: 350px) {
      left: -10px;
    }
`;

const bgColorGreen = `radial-gradient(circle, rgba(131, 234, 255, 0) 43%, ${greenColor} 43%)`;
const bgColorRed = `radial-gradient(circle, rgba(131, 234, 255, 0) 43%, ${redColor} 43%)`;

const ItemTop = styled.div<{ openTicket: boolean }>`
  ${itemStyles}
  background: ${(props) => (props.openTicket ? bgColorRed : bgColorGreen)};
  top: -55px;
  @media screen and (min-width: 700px) {
    top: -65px;
  }
`;
const ItemBottom = styled.div<{ openTicket: boolean }>`
  ${itemStyles}
  background: ${(props) => (props.openTicket ? bgColorRed : bgColorGreen)};
  bottom: -55px;
  @media screen and (min-width: 700px) {
    bottom: -65px;
  }
`;

const CloseTicket = styled(AiOutlineCloseCircle)`
  position: absolute;
  top: 60px;
  right: 50px;
  font-size: 35px;
  cursor: pointer;
  color: ${redColor};
`;

const Title = styled.h4`
  font-weight: 600;
`;

const BoxInfo = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: row;
  align-items: center;
`;

const Brand = styled.div`
  background-color: #fafafa;
  padding: 5px;
  border-radius: 5px;
  color: #000;
  box-shadow: 0 5px 5px #0005;
`;

const Line = styled.div`
  background-color: #fafafa;
  width: 2px;
  height: 100%;
`;

const Priority = styled.span`
  background-color: #fafafa;
  padding: 5px;
  border-radius: 5px;
  color: ${greenColor};
`;

const priority = ['BAJA', 'MEDIA', 'ALTA'];

export function Ticket() {
  const visibility = useAppSelector(getVisibility);
  const typeTicket = useAppSelector(getTypeTicket);

  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => dispatch(setVisibility(false)), [dispatch]);

  const [ticket, setTicket] = useState({} as TicketData);

  useEffect(() => {
    const selectedTicket = MockTicketData.find((ticket) => {
      return typeTicket ? ticket.status === 1 : ticket.status === 0;
    });
    setTicket(selectedTicket!);
  }, [typeTicket]);

  return (
    <BGTicket isVisible={visibility}>
      <TicketBox isVisible={visibility}>
        <TicketLeft openTicket={typeTicket}>
          <Title>{ticket.title}</Title>
          <span title={ticket.description}>{ticket.description?.slice(0, 35)} ...</span>
          <BoxInfo>
            <Brand>{ticket.brand?.toUpperCase()}</Brand>
            <Line />
            <span>{ticket.tag?.toUpperCase()}</span>
          </BoxInfo>
        </TicketLeft>

        <TicketMiddle openTicket={typeTicket}>
          <ItemTop openTicket={typeTicket} />
          <ItemBottom openTicket={typeTicket} />
        </TicketMiddle>

        <TicketRight openTicket={typeTicket}>
          <span>
            {ticket.date?.getDate()}/{ticket.date?.getMonth()}/{ticket.date?.getFullYear()}
          </span>
          <Priority>{priority[ticket.priority]}</Priority>
          <span>#{ticket.id}</span>
        </TicketRight>
      </TicketBox>
      {visibility && <CloseTicket onClick={handleClick} />}
    </BGTicket>
  );
}
