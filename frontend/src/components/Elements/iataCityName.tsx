

import { useEffect, useState } from 'react';
import { useIataCode } from '@/context/IataCodeContext';

export const IataCityName = ({ code }: { code: string | undefined }) => {
    if(!code) return '';
    const { getCityName } = useIataCode();
    const [cityName, setCityName] = useState<string>(code);

    useEffect(() => {
    let active = true;
    getCityName(code).then(name => {
        if (active) setCityName(name);
    });
    return () => {
        active = false;
    };
    }, [code]);

    return <span>{cityName}</span>;
};
