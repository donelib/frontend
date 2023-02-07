export interface ConfirmDialogProps {
  title: string;
  description: string;
  positiveOnClick?: () => void;
  negativeOnClick?: () => void;
  isShow: boolean;
}
