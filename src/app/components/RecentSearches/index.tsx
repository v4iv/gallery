import React, {useEffect, useState} from 'react';
import {Box, Heading, Icon} from "gestalt";
import RouterLink from "../RouterLink";
import {isEmpty} from "lodash";

const RecentSearches: React.FC = () => {
    const [recents, setRecents] = useState([])

    useEffect(() => {
        if (localStorage && localStorage.getItem("recentSearches")) {
            const storedString = localStorage.getItem("recentSearches")

            if (storedString != null) {
                const recentSearches = JSON.parse(storedString)

                setRecents(recentSearches)
            }
        }
    }, [])
    return (
        <Box
            marginBottom={2}
            display="flex"
            alignItems="center"
        >
            {!isEmpty(recents)
                ? recents.map((q) => <Box key={q} marginStart={1} display="flex" alignItems="center" paddingY={1} paddingX={3} borderStyle="sm"
                                     rounding="pill">
                <Box marginEnd={2}>
                    <Icon accessibilityLabel="Link" icon="search"/>
                </Box>
                <Box>
                    <Heading size="sm">
                        <RouterLink to={`/search?q=${q}`} target="blank">{q}</RouterLink>
                    </Heading>
                </Box>
                <Box marginStart={2}>
                    <Icon accessibilityLabel="Link" icon="visit"/>
                </Box>
            </Box>)
                : <Heading size="sm">Your Recent Searches Will Appear Here</Heading>
            }
        </Box>
    );
};

export default RecentSearches;
