import {describe, expect, it, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import SignInForm from './sign-in-form.vue';

const signInSpy = vi.fn();
const routerPushSpy = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({push: routerPushSpy})
}));

vi.mock('../../application/iam.store.js', () => ({
  default: () => ({signIn: signInSpy})
}));

describe('sign-in-form.vue (Functional)', () => {
  beforeEach(() => {
    // ES: Limpieza por caso para que cada assert mida solo este escenario.
    // EN: Per-test cleanup so each assert measures only this scenario.
    signInSpy.mockReset();
    routerPushSpy.mockReset();
  });

  it('submits only when credentials are complete', async () => {
    // ES: Riesgo cubierto: intentos de autenticacion invalidos por submit incompleto.
    // EN: Risk covered: invalid authentication attempts due to incomplete submit.
    const wrapper = mount(SignInForm, {
      global: {
        stubs: {
          // ES: Stubs reducen ruido de PrimeVue y enfocan la prueba en la regla de negocio.
          // EN: Stubs reduce PrimeVue noise and keep focus on the business rule.
          'pv-float-label': {template: '<div><slot /></div>'},
          'pv-input-text': {
            props: ['modelValue'],
            template: '<input v-bind="$attrs" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />'
          },
          'pv-button': {template: '<button v-bind="$attrs"><slot /></button>'}
        }
      }
    });

    // ES: Act #1 -> trigger de submit sin datos.
    // EN: Act #1 -> trigger submit with empty inputs.
    await wrapper.find('form').trigger('submit.prevent');
    // ES: Assert #1 -> no se debe llamar al signIn del store.
    // EN: Assert #1 -> store signIn must not be called.
    expect(signInSpy).not.toHaveBeenCalled();

    // ES: Act #2 -> cargamos credenciales validas y reenviamos el formulario.
    // EN: Act #2 -> fill valid credentials and submit again.
    await wrapper.find('#username').setValue('alice');
    await wrapper.find('#password').setValue('secure-pass');
    await wrapper.find('form').trigger('submit.prevent');

    // ES: Assert #2 -> verificamos payload y dependencia de navegacion.
    // EN: Assert #2 -> verify payload and navigation dependency.
    expect(signInSpy).toHaveBeenCalledTimes(1);
    const [command, router] = signInSpy.mock.calls[0];
    expect(command.username).toBe('alice');
    expect(command.password).toBe('secure-pass');
    expect(router).toBeDefined();
  });
});
