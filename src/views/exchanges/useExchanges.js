import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { 
    startGettingExchanges, 
    startSendingExchange, 
    startSettingExchange } 
from 'src/actions/exchange';

const useExchanges = () => { 

    const dispatch = useDispatch();
    
    const exchange = useSelector( (state) => state.exchange );
    const exchangeSaved = useSelector( (state) => state.exchangeSaved );

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if(exchange){
            reset(exchange);
        }
    }, [exchange])

    useEffect(() => {
        if(exchangeSaved){
            reset();
        }
    }, [exchangeSaved]);

    const settingExchange = (data) => dispatch( startSettingExchange(data) );

    const gettingExchanges = () => dispatch( startGettingExchanges() );

    const sendFormData = (data) => dispatch( startSendingExchange(data) );

    return { 
            errors,
            exchange,
            exchangeSaved, 
            gettingExchanges,
            handleSubmit, 
            register, 
            reset,
            settingExchange,
            sendFormData
    };
}

export default useExchanges;