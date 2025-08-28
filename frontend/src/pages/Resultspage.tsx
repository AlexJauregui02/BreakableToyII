
import { useFlightOffersResponse } from '@/context/FlightOffersContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ResultsPage() {
    const navigate = useNavigate();
    const { results } = useFlightOffersResponse();

    console.log(results);

    useEffect(() => {
        if(!results) {
            navigate('/');
        }
    }, [results, navigate])

    if (!results) return null;

    return (
        <div>hola</div>
    );
}