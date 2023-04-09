import React, { useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import GoogleButton from 'react-google-button'

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

    const isButtonClickable = primaryLanguage && userType && (userType === 'Regular User' || languages.length > 0);

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
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Ukrainian">Ukrainian</MenuItem>
                        <MenuItem value="German">German</MenuItem>
                        <MenuItem value="Italian">Italian</MenuItem>
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
                        <MenuItem value="Regular User">Regular User</MenuItem>
                        <MenuItem value="Translator">Translator</MenuItem>
                    </Select>
                </FormControl>
                {userType === 'Translator' && (
                    <Box mt={2}>
                        <Typography variant="subtitle1" component="p">
                            Languages
                        </Typography>
                        <FormControlLabel
                            control={<Checkbox checked={languages.includes('English')} onChange={handleLanguageChange} name="English" value="English" />}
                            label="English"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={languages.includes('Ukrainian')} onChange={handleLanguageChange} name="Ukrainian" value="Ukrainian" />}
                            label="Ukrainian"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={languages.includes('German')} onChange={handleLanguageChange} name="German" value="German" />}
                            label="German"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={languages.includes('Italian')} onChange={handleLanguageChange} name="Italian" value="Italian" />}
                            label="Italian"
                        />
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
