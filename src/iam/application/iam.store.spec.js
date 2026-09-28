import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';

const signInMock = vi.fn();
const signUpMock = vi.fn();
const getUsersMock = vi.fn();

vi.mock('../infrastructure/iam-api.js', () => ({
  IamApi: class {
    signIn(command) {
      return signInMock(command);
    }
    signUp(command) {
      return signUpMock(command);
    }
    getUsers() {
      return getUsersMock();
    }
  }
}));

import useIamStore from './iam.store.js';
import {SignInCommand} from '../domain/sign-in.command.js';

describe('iam.store (Unit)', () => {
  beforeEach(() => {
    // ES: Pinia aislada por prueba para evitar contaminar estado entre escenarios.
    // EN: Fresh Pinia per test avoids state contamination across scenarios.
    setActivePinia(createPinia());
    localStorage.clear();
    // ES: Reset de mocks para mantener trazabilidad de llamadas en cada caso.
    // EN: Reset mocks to keep call tracking isolated per case.
    signInMock.mockReset();
    signUpMock.mockReset();
    getUsersMock.mockReset();
  });

  it('updates authentication session after successful sign-in', async () => {
    // ES: Riesgo cubierto: sesion inconsistente o navegacion incorrecta despues de login exitoso.
    // EN: Risk covered: inconsistent session or wrong navigation after successful login.
    // ES: Arrange -> simulamos respuesta HTTP 200 del backend con token valido.
    // EN: Arrange -> simulate HTTP 200 backend response with a valid token.
    // ES: Probamos el núcleo de autenticación: sesión activa, token persistido y navegación.
    // EN: We test the authentication core: active session, persisted token, and navigation.
    signInMock.mockResolvedValue({
      status: 200,
      data: {id: 5, username: 'alice', token: 'token-abc'}
    });
    const store = useIamStore();
    const router = {push: vi.fn()};

    // ES: Act -> ejecutamos el metodo del store con command + router mockeado.
    // EN: Act -> execute store method with command + mocked router.
    store.signIn(new SignInCommand({username: 'alice', password: 'secret'}), router);
    // ES: Esperamos microtareas porque internamente se usa promesa.
    // EN: Wait for microtasks because the implementation is promise-based.
    await Promise.resolve();
    await Promise.resolve();

    // ES: Assert -> estado de sesion, token persistido y redireccion final.
    // EN: Assert -> session state, persisted token, and final redirect.
    expect(store.isSignedIn).toBe(true);
    expect(store.currentUsername).toBe('alice');
    expect(store.currentUserId).toBe(5);
    expect(store.currentToken).toBe('token-abc');
    expect(router.push).toHaveBeenCalledWith({name: 'home'});
  });
});
