import { useEffect, useState } from 'react';
import axios from 'axios';

const useSendGETAPI = (initialData, url, convertResponseToData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    let didCancel = false;
    setIsLoading(true);
    axios({
      method: 'GET',
      url: url
    }).then(response => {
      
      if (!didCancel) {
        setIsLoading(false);
        setData(convertResponseToData(response));
        // setPokemons(response.data.results)
      }
    }).catch(error => {
      if (!didCancel) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    });
    return () => {
      didCancel = true;
    }
  }, [url]);
  
  return {
    isLoading,
    data,
    errorMessage
  }
}

export default useSendGETAPI;
