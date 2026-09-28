import {beforeEach, describe, expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import TutorialForm from './tutorial-form.vue';

const routerPushSpy = vi.fn();
const addTutorialSpy = vi.fn();
const updateTutorialSpy = vi.fn();
const fetchCategoriesSpy = vi.fn();

vi.mock('vue-i18n', () => ({
  useI18n: () => ({t: (key) => key})
}));

vi.mock('vue-router', () => ({
  useRoute: () => ({params: {}}),
  useRouter: () => ({push: routerPushSpy})
}));

vi.mock('../../application/publishing.store.js', () => ({
  default: () => ({
    errors: [],
    categories: [{id: 1, name: 'Frontend'}],
    addTutorial: addTutorialSpy,
    updateTutorial: updateTutorialSpy,
    fetchCategories: fetchCategoriesSpy,
    getTutorialById: vi.fn()
  })
}));

describe('tutorial-form.vue (Functional)', () => {
  beforeEach(() => {
    // ES: Limpiamos spies para mantener independencia entre escenarios.
    // EN: We reset spies to keep scenarios independent.
    routerPushSpy.mockReset();
    addTutorialSpy.mockReset();
    updateTutorialSpy.mockReset();
    fetchCategoriesSpy.mockReset();
  });

  it('creates a tutorial and returns to the tutorials list', async () => {
    // ES: Riesgo cubierto: flujo principal incompleto tras submit (sin alta o sin retorno).
    // EN: Risk covered: incomplete main flow after submit (no creation or no return).
    const wrapper = mount(TutorialForm, {
      global: {
        stubs: {
          // ES: Stubs para centrarnos en la logica del formulario y no en widgets PrimeVue.
          // EN: Stubs keep focus on form logic instead of PrimeVue internals.
          'pv-input-text': {
            props: ['modelValue'],
            template: '<input v-bind="$attrs" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />'
          },
          'pv-textarea': {
            props: ['modelValue'],
            template: '<textarea v-bind="$attrs" @input="$emit(\'update:modelValue\', $event.target.value)">{{ modelValue }}</textarea>'
          },
          'pv-select': {template: '<div data-stub="pv-select"><slot /></div>'},
          'pv-button': {template: '<button v-bind="$attrs"><slot /></button>'}
        }
      }
    });

    // ES: Arrange/Act -> completamos datos de negocio y enviamos formulario.
    // EN: Arrange/Act -> fill business data and submit the form.
    await wrapper.find('#title').setValue('Testing tutorial');
    await wrapper.find('#summary').setValue('How to test critical flows');
    wrapper.vm.form.categoryId = 1;
    await wrapper.find('form').trigger('submit.prevent');

    // ES: Assert -> se crea la entidad y se navega al listado de tutoriales.
    // EN: Assert -> entity is created and app navigates back to tutorials list.
    expect(addTutorialSpy).toHaveBeenCalledTimes(1);
    const [tutorial] = addTutorialSpy.mock.calls[0];
    expect(tutorial.title).toBe('Testing tutorial');
    expect(tutorial.summary).toBe('How to test critical flows');
    expect(tutorial.categoryId).toBe(1);
    expect(routerPushSpy).toHaveBeenCalledWith({name: 'publishing-tutorials'});
  });
});
