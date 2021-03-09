import React from 'react';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import UttaksperiodeListe from '../uttaksperiode-liste/UttaksperiodeListe';

interface UttaksperiodePageProps {
    uttaksperioder: Uttaksperiode[];
}

const UttaksperiodePage = ({ uttaksperioder }: UttaksperiodePageProps): JSX.Element => {
    return (
        <div className="uttaksperiodePage">
            <UttaksperiodeListe uttaksperioder={uttaksperioder} />
        </div>
    );
};

export default UttaksperiodePage;
