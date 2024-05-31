import axios from "axios";
import { useState } from "react";
import { v4 as uuid } from "uuid"
import useLocalStorage from "./useLocalStorage";

const useAxios = (baseUrl, formatter, localStorageKey) => {
    const [responses, setResponses] = useLocalStorage(localStorageKey);

    const addResponseData = async(urlAddOn) => {
        try{
            const res = await axios.get(baseUrl + urlAddOn);
            const formattedData = formatter(res.data);
            setResponses(data => [...data, {...formattedData, id: uuid()}]);
        } catch(error){
            console.error("Error fectching data", error);
        }
    };


    const clearData = () => {
        setResponses([]);
    }
    return [responses, addResponseData, clearData]
}

export default useAxios;