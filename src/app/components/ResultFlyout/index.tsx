import React from 'react';
import {PhotoResult} from "../../types/search.types";
import {Box, Icon, Spinner, Text} from "gestalt";
import {get} from "lodash";
import ResultCard from "../ResultCard";
import RouterLink from "../RouterLink";

interface IProps {
    results: PhotoResult[]
    loading: boolean
    query: string
}

const ResultFlyout: React.FC<IProps> = (props) => {
    const {results, loading, query} = props

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
            {(results.length === 5) &&
            <Box paddingY={1} alignItems="center" display="flex" justifyContent="center">
                <Box marginEnd={1} padding={1}>
                    <Icon icon="visit" accessibilityLabel="All Results" color="darkGray" />
                </Box>
                <Text align="center" color="darkGray" weight="bold">
                    <RouterLink to={`/search?q=${query}`} target="blank">
                        See All Results
                    </RouterLink>
                </Text>
            </Box>
            }
        </Box>
    );
};

export default ResultFlyout;
