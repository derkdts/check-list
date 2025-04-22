const targetColor = '#28a745'; 
const initialColor = ''; 

document.querySelectorAll('.change-color').forEach(button => {
    button.style.backgroundColor = initialColor; 

    button.addEventListener('click', () => {
        const currentColor = button.style.backgroundColor;

        if (currentColor === targetColor || currentColor === 'rgb(40, 167, 69)') {
            button.style.backgroundColor = initialColor; 
            button.style.color = ''; 
        } else {
            button.style.backgroundColor = targetColor;
            button.style.color = 'white'; 
        }
    });
});
