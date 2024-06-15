interface ButtonProps {
	onClick: () => void;
}

class Button implements ButtonProps {
	onClick = () => console.log('button!');
}

export { Button, ButtonProps };