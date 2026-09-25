import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import Toast from "../components/Toast";
import { toast } from "../components/shared/ui/molecules/Toast";

export type ToastType = "SUCCESS" | "INFO" | "WARNING" | "ERROR";

export type OpenToastParams = {
  title: string;
  subTitle?: string;
  type: ToastType;
};

type ToastContextValue = {
  openToast: (params: OpenToastParams) => void;
};

type ToastGenericParams = {
  title: string;
  subTitle?: string;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const openToast = useCallback((params: OpenToastParams) => {
    if (params.type === "ERROR") {
      openError(params);
    }

    if (params.type === "INFO") {
      openInfo(params);
    }

    if (params.type === "SUCCESS") {
      openSuccess(params);
    }

    if (params.type === "WARNING") {
      openWarning(params);
    }
  }, []);

  const openSuccess = useCallback((params: ToastGenericParams) => {
    toast.success(params.title, {
      description: params.subTitle,
    });
  }, []);

  const openWarning = useCallback((params: ToastGenericParams) => {
    toast.warning(params.title, {
      description: params.subTitle,
    });
  }, []);

  const openError = useCallback((params: ToastGenericParams) => {
    toast.error(params.title, {
      description: params.subTitle,
    });
  }, []);

  const openInfo = useCallback((params: ToastGenericParams) => {
    toast.info(params.title, {
      description: params.subTitle,
    });
  }, []);

  const contextValue = useMemo(() => ({ openToast }), [openToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
}
