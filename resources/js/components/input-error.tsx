import type { FC } from 'react';

import { cn } from '@/lib/utils';

import type { InputErrorProps } from './input-error.types';

const InputError: FC<InputErrorProps> = ({
    message,
    className = '',
    ...props
}) => {
    return message ? (
        <p
            {...props}
            className={cn('text-sm text-red-600 dark:text-red-400', className)}
        >
            {message}
        </p>
    ) : null;
};

export default InputError;
