import {useState} from 'react';

export function useRefetch() {
    const [refetchStatus, setRefetch] = useState(false);

    function refetch() {
        setRefetch(!refetchStatus)
    }

    return [refetchStatus, refetch];
}
