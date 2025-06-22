import { ButtonHTMLAttributes, ReactNode } from "react";

export enum ButtonVariant {
   Primary = "primary",
   PrimaryOutlined = "primaryOutlined",
   Secondary = "secondary",
   SecondaryOutlined = "secondaryOutlined",
}

export enum ButtonSize {
   Large = "large",
   Normal = "normal",
   Small = "small",
}

export type ButtonTypes = {
   onClick?: () => void;
   description?: string;
   type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
   id?: string;
   icon?: ReactNode;
   maxWidth?: string;
   maxHeight?: string;
   variant?: ButtonVariant;
   size?: ButtonSize;
   disabled?: boolean;
   className?: string;
};
