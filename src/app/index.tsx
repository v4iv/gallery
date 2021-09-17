import React, {lazy, Suspense, useEffect, useState} from 'react';
import {
    Box,
    Container,
    ColorSchemeProvider,
    ColorSchemeProviderProps,
    Spinner,
} from "gestalt"
import {Provider} from "react-redux"
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ThemeContext from './contexts/ThemeContext';
import store from "./store"
import Header from './components/Header';
// Pages
const HomePage = lazy(() => import("./pages/HomePage"))
const PageNotFound = lazy(() => import("./pages/404"))


const App: React.FC = () => {
    const [theme, setTheme] = useState<ColorSchemeProviderProps["colorScheme"]>(
        "light"
    )

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light"
        localStorage.setItem("colorScheme", nextTheme)
        setTheme(nextTheme)
    }

    useEffect(() => {
        if (typeof window === "undefined") return

        if (localStorage && localStorage.getItem("colorScheme")) {
            const colorScheme = localStorage.getItem("colorScheme")

            // @ts-ignore
            setTheme(colorScheme)
        }
    }, [])

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <ColorSchemeProvider colorScheme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Box color="white" minHeight="100vh">
                            <Container>
                                <Header/>
                                <Suspense
                                    fallback={
                                        <Box
                                            position="fixed"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            top
                                            left
                                            right
                                            bottom
                                        >
                                            <Spinner accessibilityLabel="Loading..." show/>
                                        </Box>
                                    }
                                >
                                    <Switch>
                                        <Route component={HomePage} exact path="/"/>
                                        <Route component={PageNotFound} />
                                    </Switch>
                                </Suspense>
                            </Container>
                        </Box>
                    </BrowserRouter>
                </Provider>
            </ColorSchemeProvider>
        </ThemeContext.Provider>
    )
}

export default App;
