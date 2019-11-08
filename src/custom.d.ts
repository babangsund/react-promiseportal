type OnConfirm = (event: Event | React.SyntheticEvent) => void;

type OnCancel = () => void;

type PromisePortalElement = (OnConfirm, onCancel) => React.ReactElement;

type Portal = {
  id: number;
  element: PromisePortalElement;
  onCancel: OnCancel;
  onConfirm: OnConfirm;
};

type PromisePortalProvider = (
  portal: PromisePortalElement
) => Promise<boolean | unknown>;
