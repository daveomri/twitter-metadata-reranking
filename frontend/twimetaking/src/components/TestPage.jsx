import React from 'react';

const TestPage = ({data}) => {
    if (!data) return <div />;
    
    return(
        <div>
            <h1>{data.name}</h1>
            <h1>{data.rtl}</h1>
        </div>
    );
}

export default TestPage;
