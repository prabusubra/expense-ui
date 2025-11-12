import { Chip} from '@mui/material';
import { type FC } from 'react';


interface IChipsProps {
    label: string;
    handleClick: () => void;
    current: boolean;

}

const Chips: FC<IChipsProps> = ({label, current, handleClick}) => {

    return (
        <div>
      <Chip
        label={label}
        color="primary"
        variant="outlined"
        onClick={handleClick}
        onDelete={current ? handleClick : undefined}
      />
    </div>
    );
};

export default Chips;