import { Dialog } from "../shared/ui/organisms/dialog";
import { ModalProps } from "./ModalDTO";

import ModalError from "./ModaError";
import ModalSuccess from "./ModalSuccess";
import ModalWarning from "./ModalWarning";

const Modal = ({
  isOpen,
  onOpenChange,
  modalType,
  title,
  subTitle,
  onPress,
  titleButton,
  titleButtonCancel,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Backdrop>
        <Dialog.Content>
          {modalType === "ERROR" && (
            <ModalError
              title={title}
              subTitle={subTitle}
              titleButton={titleButton}
            />
          )}
          {modalType === "WARNING" && (
            <ModalWarning
              title={title}
              subTitle={subTitle}
              titleButton={titleButton}
            />
          )}
          {modalType === "SUCCESS" && (
            <ModalSuccess
              title={title}
              subTitle={subTitle}
              onPress={onPress}
              titleButton={titleButton}
              titleButtonCancel={titleButtonCancel}
            />
          )}
        </Dialog.Content>
      </Dialog.Backdrop>
    </Dialog>
  );
};

export default Modal;
