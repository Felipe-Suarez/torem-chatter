import { useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import NewChatModal from '../../components/HomeChat/NewChatModal';
import { DropDownProps } from '../../types/chat';
import { useRouter } from 'next/router';
import { NotificationSuccess } from '../../components/Notifications';
import { useAppDispatch } from '../../redux/hooks';
import { setLogoutData } from '../../redux/userSlice';
import { privApiClient } from '../../utils/client';

function ConfigDropdown(dropDownProps: DropDownProps) {
  const { userData, isOpen, setConfigOpen } = dropDownProps;

  const [delDialogIsOpen, setDelDialogIsOpen] = useState(false);
  const [newChatModalIsOpen, setNewChatModalIsOpen] = useState(false);

  const handleDeleteUser = () => {
    setDelDialogIsOpen(true);
    setConfigOpen(false);
  };

  const handleNewChatModal = () => {
    setNewChatModalIsOpen(true);
    setConfigOpen(false);
  };

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleConfirmDelete = () => {
    privApiClient.delete('/users').then(({ data }: { data: { message: string } }) => {
      if (data.message) {
        localStorage.removeItem('token');
        NotificationSuccess(data.message);
        router.push('/');
        dispatch(setLogoutData());
      }
    });
  };

  return (
    <div className={isOpen ? 'configDropdown scale1' : 'configDropdown'}>
      <ul>
        <li onClick={handleNewChatModal}>
          <div>Nuevo chat</div>
        </li>
        <li onClick={handleDeleteUser}>
          <div>Eliminar cuenta</div>
        </li>
      </ul>

      <NewChatModal
        isOpen={newChatModalIsOpen}
        setIsOpen={setNewChatModalIsOpen}
        userData={userData}
      />
      <ConfirmDialog
        title="Eliminar Usuario"
        text="¿Está seguro que desea eliminar la cuenta?"
        isOpen={delDialogIsOpen}
        handleCancel={setDelDialogIsOpen}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
}

export default ConfigDropdown;
