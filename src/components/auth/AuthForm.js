import React, { useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import GoogleButton from 'react-google-button';

const AuthForm = () => {
    const [primaryLanguage, setPrimaryLanguage] = useState('');
    const [userType, setUserType] = useState('');
    const [languages, setLanguages] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g. by triggering the Google login API
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
        setLanguages([]);
    };

    const handleLanguageChange = (event) => {
        if (event.target.checked) {
            setLanguages([...languages, event.target.value]);
        } else {
            setLanguages(languages.filter(language => language !== event.target.value));
        }
    };

    const languagesEnum = {
        ENGLISH: { value: 'English' },
        UKRAINIAN: { value: 'Ukrainian' },
        ITALIAN: { value: 'Italian' },
    };

    const userTypeEnum = {
        REGULAR_USER: { value: 'Regular User' },
        TRANSLATOR: { value: 'Translator' },
    };

    const isButtonClickable = primaryLanguage && userType && (userType === 'REGULAR_USER' || languages.length > 0);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Typography variant="h4" component="h1" gutterBottom>
                Wellcome to you Business Chat!
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl variant="outlined" margin="normal" style={{ width: 400 }}>
                    <InputLabel id="primaryLanguage-label">Primary Language</InputLabel>
                    <Select
                        labelId="primaryLanguage-label"
                        id="primaryLanguage"
                        value={primaryLanguage}
                        onChange={(event) => setPrimaryLanguage(event.target.value)}
                        label="Primary Language"
                    >
                        <MenuItem value="">Select a language</MenuItem>
                        {
                            Object.keys(languagesEnum)
                                .map((language) => (
                                    <MenuItem value={language.toUpperCase()}>{languagesEnum[language].value}</MenuItem>
                                ))
                        }
                    </Select>
                </FormControl>
                <FormControl variant="outlined" margin="normal" style={{ width: 400 }}>
                    <InputLabel id="userType-label">User Type</InputLabel>
                    <Select
                        labelId="userType-label"
                        id="userType"
                        value={userType}
                        onChange={handleUserTypeChange}
                        label="User Type"
                    >
                        <MenuItem value="">Select a user type</MenuItem>

                        {
                            Object.keys(userTypeEnum)
                                .map((userType) => (
                                    <MenuItem value={userType.toUpperCase()}>{userTypeEnum[userType].value}</MenuItem>
                                ))
                        }
                    </Select>
                </FormControl>
                {userType === userTypeEnum.TRANSLATOR.value.toUpperCase() && (
                    <Box mt={2}>
                        <Typography variant="subtitle1" component="p">
                            Languages
                        </Typography>

                        {
                            Object.keys(languagesEnum)
                                .filter(
                                    (language) => languagesEnum[language].value.toUpperCase() !== primaryLanguage.toUpperCase()
                                )
                                .map((language) => (

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={languages.includes(languagesEnum[language].value.toUpperCase())}
                                                onChange={handleLanguageChange}
                                                name={languagesEnum[language].value}
                                                value={languagesEnum[language].value.toUpperCase()}
                                            />
                                        }
                                        label={languagesEnum[language].value}
                                    />
                                ))
                        }
                    </Box>
                )}
                <Box mt={4}>
                    <GoogleButton
                        disabled={!isButtonClickable}
                        onClick={() => {
                            window.location.replace('http://localhost:8082/oauth/login/google');
                        }}
                    />
                </Box>
            </form>
        </Box>
    );
};

export default AuthForm;
