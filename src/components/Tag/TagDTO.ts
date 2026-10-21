interface TagBaseProps {
  title: string;
  type?: "default" | "info" | "danger" | "success" | "warning" | "gray";
  size?: "sm" | "md";
  border?: boolean;
}

export type TagProps = TagBaseProps &
  (
    | { dot?: boolean; zap?: never }
    | { dot?: never; zap?: boolean }
  );
