export namespace ErrorAuthMessage {
  export function convertMessage(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'EL usuario está deshabilitado.';
      }
      case 'auth/user-not-found': {
        return 'El usuario no existe.';
      }
      case 'auth/invalid-email': {
        return 'Email inválido.';
      }
      case 'auth/email-already-in-use' : {
        return 'El email ya está en uso.';
      }
      case 'auth/wrong-password': {
        return 'Contraseña incorrecta.';
      }
      case 'auth/weak-password': {
        return 'Contraseña débil.';
      }
      default: {
        return 'Error, inténtelo de nuevo más tarde.';
      }
    }
  }
}
