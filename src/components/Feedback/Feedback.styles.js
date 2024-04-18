// Feedback.styles.js

export const styles = {
    container: {
        padding: '1rem',
        maxWidth: '40rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust alpha for more or less transparency
        backdropFilter: 'blur(10px)', // Optional: add a blur effect to the background
    },
    feedbackText: {
        marginBottom: '1rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1rem',
    }
};
