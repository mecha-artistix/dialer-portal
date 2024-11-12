import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import { LinkBtn } from "./LinkBtn";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>{headerLabel}</CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && <CardFooter>all rights reserved</CardFooter>}
      <CardFooter>
        <LinkBtn href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
