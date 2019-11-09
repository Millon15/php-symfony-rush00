import React, {useEffect, useState} from 'react';

const Galery = () => {
    const [info, setInfo] = useState();

    useEffect(() => {
        // api call for all movies
        setInfo()
    }, []);

    return (
        <div>All monsters</div>
    )
}

export default Galery;