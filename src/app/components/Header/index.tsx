import React, {useCallback, useContext, useRef, useState,} from 'react';
import {Box, Icon, IconButton, Pog, SearchField, SearchFieldProps, Tooltip,} from "gestalt"
import ThemeContext from "../../contexts/ThemeContext"
import RouterLink from "../RouterLink"
import {githubSVGPath} from "../../../assets/images/svg";

const Header: React.FC = () => {
    const themeContext = useContext(ThemeContext)

    const anchorRef = useRef(null)

    const [query, setQuery] = useState("")

    const changeHandler: SearchFieldProps["onChange"] = useCallback(
        ({value}) => {
            setQuery(value)
        },
        []
    )

    return (
        <>
            <Box
                color="white"
                rounding={1}
                margin={1}
                padding={2}
                display="flex"
                alignItems="center"
                borderStyle="sm"
            >
                <Box padding={2}>
                    <RouterLink to="/" hoverStyle="none" accessibilityLabel="Home">
                        <Icon
                            icon="camera-roll"
                            color="watermelon"
                            size={32}
                            inline
                            accessibilityLabel="Pokedex"
                        />
                    </RouterLink>
                </Box>

                <Box flex="grow" paddingX={1} ref={anchorRef}>
                    <SearchField
                        accessibilityLabel="Search"
                        id="searchField"
                        autoComplete="off"
                        onChange={changeHandler}
                        placeholder="Search"
                        value={query}
                    />
                </Box>

                <Tooltip
                    inline
                    text={themeContext.theme === "light" ? "Dark Mode" : "Light Mode"}
                >
                    <Box paddingX={2} display="inlineBlock">
                        <IconButton
                            accessibilityLabel="toggle color scheme: light / dark mode views"
                            icon="workflow-status-in-progress"
                            size="md"
                            onClick={themeContext.toggleTheme}
                        />
                    </Box>
                </Tooltip>

                <Tooltip inline text="Github">
                    <Box paddingX={2} display="inlineBlock">
                        <RouterLink to="https://github.com/v4iv/gallery" target="blank">
                            <Pog
                                accessibilityLabel="Github"
                                dangerouslySetSvgPath={githubSVGPath}
                                size="md"
                            />
                        </RouterLink>
                    </Box>
                </Tooltip>
            </Box>
        </>
    );
};

export default Header;
