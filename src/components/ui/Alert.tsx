interface AlertProps {
  type: "success" | "error";
  message: string;
  className?: string;
}

export function Alert({ type, message, className = "" }: AlertProps) {
  const typeClasses =
    type === "success"
      ? "bg-green-50 text-green-800 border border-green-200"
      : "bg-red-50 text-red-800 border border-red-200";

  return <div className={`p-4 rounded-lg ${typeClasses} ${className}`}>{message}</div>;
}
