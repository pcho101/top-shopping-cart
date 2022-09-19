import { useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      console.log('Sending api request')
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch.')
        }
        const data = await response.text();
        const xml = new DOMParser().parseFromString(data, 'application/xml');
        setFetchedData(xml);
        console.log('fetched xml', xml);
        setIsLoading(false);
      }
      catch(err) {
        console.log('Error!', err);
        setIsLoading(false);
      }
    }
    getData();
  }, dependencies)

  return [isLoading, fetchedData]
}
