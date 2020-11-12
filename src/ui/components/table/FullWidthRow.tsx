import * as React from 'react';

interface FullWidthRowProps {
    children: React.ReactNode;
}

const FullWidthRow = ({ children }: FullWidthRowProps): JSX.Element => (
    <tr>
        <td colSpan={6}>{children}</td>
    </tr>
);

export default FullWidthRow;
