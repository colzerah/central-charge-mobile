import { Toaster } from "../shared/ui/molecules/Toast";

const Toast = () => {
  return (
    <Toaster
      position={"top"}
      offset={15}
      theme="dark"
      duration={2000}
      visibleToasts={3}
      closeButton
      swipeToDismiss={false}
      swipeDirection="vertical"
      icons={
        {
          // success?: ReactNode;
          // info?: ReactNode;
          // warning?: ReactNode;
          // error?: ReactNode;
          // loading?: ReactNode;
          // close?: ReactNode;}
        }
      }
      colors={
        {
          // card: "red",
          // border: "blue",
          // foreground: "green",
          // mutedForeground: "brown",
          // primaryForeground: "pink",
          // subtle: "black",
          // destructive: "red",
          // success: "red",
          // info: "red",
          // warning: "red",
          // shadow: "red",
        }
      }
    />
  );
};

export default Toast;
