import { FC } from 'react';
import Modal, { Styles } from 'react-modal';

interface Props {
  isActive: boolean;
  children: React.ReactNode;
  onCloseModal?: () => void;
  afterOpenModal?: () => void;
}
const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '500px',
    borderRadius: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    maxHeight: '700px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
export const CustomModal: FC<Props> = ({
  children,
  onCloseModal,
  isActive = false,
  afterOpenModal,
}) => {
  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // subtitle.style.color = '#f00';
  // }

  return (
    <Modal
      isOpen={isActive}
      ariaHideApp={false}
      onAfterOpen={afterOpenModal}
      style={customStyles}
      contentLabel='Example Modal'
      onRequestClose={onCloseModal}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
};
