import React from 'react'
import { Typography } from '../src/components/Typography'

interface HeaderTitleProps {
  title: string;
  children?: React.ReactNode;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return <Typography fontSize={16}>{title}</Typography>;
};

