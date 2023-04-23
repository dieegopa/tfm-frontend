export namespace ErrorAuthMessage {
  export function convertMessage(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'Sorry your user is disabled.';
      }
      case 'auth/user-not-found': {
        return 'Sorry user not found.';
      }
      case 'auth/invalid-email': {
        return 'Sorry invalid email.';
      }
      case 'auth/email-already-in-use' : {
        return 'Sorry email already in use.';
      }
      case 'auth/wrong-password': {
        return 'Sorry wrong password.';
      }
      case 'auth/weak-password': {
        return 'Sorry weak password.';
      }
      default: {
        return 'Login error try again later.';
      }
    }
  }
}
