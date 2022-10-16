import { Button } from '../components/UI/button';
import styles from './styles/Auth.module.css';

function Auth() {
	return (
		<div class={styles.Auth}>
			<a href="http://localhost:8080/auth/google" class={styles.AuthButtonLink}>
				<Button class={styles.AuthButton}> Sign In</Button>
			</a>
			<div class={styles.Background} />
		</div>
	);
}

export default Auth;
