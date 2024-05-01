import { FC } from 'react';

interface Props {
  marginleft?: string;
  marginTop?: string;
  marginRight?: string;
  title: string;
  onClick: () => void;
}
export const CustomButton: FC<Props> = ({
  onClick,
  marginRight = 'ml-0',
  marginTop = 'mt-0',
  marginleft = 'ml-0',
  title,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${marginleft} ${marginTop} ${marginRight} inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none`}
    >
      {title}
    </button>
  );
};
