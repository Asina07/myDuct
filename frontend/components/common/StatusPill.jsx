import { Badge } from "@mantine/core";
import React from "react";

export const COLOR_STATUS_CONST = Object.freeze({
  delivered: "success",
  ongoing: "pending",
  pending: "default",
  cutting: "selection",
  assembling: "error",
});
export default function StatusPill({ status, text }) {
  const Theme = {
    success: "bg-green-200 text-green-600",
    error: "bg-red-200 text-red-800",
    pending: "bg-blue-200 text-blue-800",
    selection: "bg-pink-200 text-pink-800",
    default: "bg-neutral-200 text-neutral-800",
  };

  return (
    <Badge
      className={`${
        Theme[COLOR_STATUS_CONST[status]] || "bg-neutral-200 text-neutral-800"
      }  max-w-max rounded-xl px-3 py-1 text-xs font-semibold uppercase `}
    >
      {/* {icon && <span className="mr-3">{icon}</span>} */}
      <span>
        {typeof text === "string" || typeof text === "number" ? text : status}
      </span>
    </Badge>
  );
}
