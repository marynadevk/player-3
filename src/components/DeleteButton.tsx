import React from 'react';
import { Button } from './ui/button';
import { RiDeleteBinLine } from 'react-icons/ri';
import classNames from 'classnames';

interface Props {
  onClick?: () => void;
  className?: string;
}
export const DeleteButton = ({ onClick, className }: Props) => {
  return (
    <Button
      variant="outline"
      className={classNames(
        'border-1 absolute h-9 w-9 -top-5 -right-5 rounded-full hidden cursor-pointer hover:rotate-30 transition-all duration-300 ',
        className
      )}
      onClick={onClick}
    >
      <RiDeleteBinLine size={9} className="w-full" />
    </Button>
  );
};
