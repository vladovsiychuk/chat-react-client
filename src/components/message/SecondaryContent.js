import {makeStyles} from '@mui/styles';
import {Typography, Divider} from '@mui/material';
import {useSelector} from "react-redux";
import UserTypes from "../../constants/UserTypes";

const useStyles = alignRight => makeStyles(() => ({
    translation: {
        fontSize: '0.75em',
        marginBottom: '10px',
        color: '#607d8b',
        textAlign: alignRight ? 'right' : 'left',
    },
}));

const MessageItem = ({alignRight, message, selectedTranslation = null}) => {
    const classes = useStyles(alignRight)();
    const currentUser = useSelector(state => state.users.currentUser.data);

    let content;
    if (currentUser.type === UserTypes.REGULAR_USER) {
        content = message.translations[0].translation;
    } else {
        content = message.translations.find(translation => translation.language === selectedTranslation);
    }

    return (
        <>
            <Typography className={classes.translation}>{content}</Typography>
            <Divider/>
        </>
    );
};

export default MessageItem;
