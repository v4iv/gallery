import React from 'react';
import {PhotoResult} from "../../types/search.types";
import {Box, Spinner, Text} from "gestalt";
import {get} from "lodash";
import ResultCard from "../ResultCard";

interface IProps {
    results: PhotoResult[]
    loading: boolean
}

const ResultFlyout: React.FC<IProps> = (props) => {
    const {results, loading} = props

    return (
        <Box padding={3} column={12}>
            {results.length
                ? (<>
                    {results.map((photo) => {
                        const id = get(photo, ['id'])

                        return <ResultCard key={id} photo={photo}/>
                    })}</>)
                : (!loading && <Text>Sorry, No Records Found!</Text>)}
            <Spinner accessibilityLabel="Loading..." show={loading} />
        </Box>
    );
};

export default ResultFlyout;
