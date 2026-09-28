import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';

const createTutorialMock = vi.fn();
const getCategoriesMock = vi.fn();
const getTutorialsMock = vi.fn();
const updateTutorialMock = vi.fn();
const deleteTutorialMock = vi.fn();
const createCategoryMock = vi.fn();
const updateCategoryMock = vi.fn();
const deleteCategoryMock = vi.fn();

vi.mock('../infrastructure/publishing-api.js', () => ({
  PublishingApi: class {
    getCategories() {
      return getCategoriesMock();
    }
    getTutorials() {
      return getTutorialsMock();
    }
    createTutorial(resource) {
      return createTutorialMock(resource);
    }
    updateTutorial(resource) {
      return updateTutorialMock(resource);
    }
    deleteTutorial(id) {
      return deleteTutorialMock(id);
    }
    createCategory(resource) {
      return createCategoryMock(resource);
    }
    updateCategory(resource) {
      return updateCategoryMock(resource);
    }
    deleteCategory(id) {
      return deleteCategoryMock(id);
    }
  }
}));

import usePublishingStore from './publishing.store.js';
import {Tutorial} from '../domain/model/tutorial.entity.js';

describe('publishing.store (Unit)', () => {
  beforeEach(() => {
    // ES: Nueva instancia Pinia para aislamiento estricto de estado por prueba.
    // EN: New Pinia instance guarantees strict state isolation per test.
    setActivePinia(createPinia());
    // ES: Reiniciamos todos los mocks para asegurar metricas de llamada confiables.
    // EN: Reset all mocks to ensure reliable call metrics.
    createTutorialMock.mockReset();
    getCategoriesMock.mockReset();
    getTutorialsMock.mockReset();
    updateTutorialMock.mockReset();
    deleteTutorialMock.mockReset();
    createCategoryMock.mockReset();
    updateCategoryMock.mockReset();
    deleteCategoryMock.mockReset();
  });

  it('adds a tutorial to the local state after successful creation', async () => {
    // ES: Riesgo cubierto: perdida de consistencia en el CRUD principal del catalogo.
    // EN: Risk covered: loss of consistency in the catalog main CRUD flow.
    // ES: Arrange -> stub de backend con id generado para el nuevo tutorial.
    // EN: Arrange -> backend stub returning a generated id for the new tutorial.
    // ES: Validamos la operación central de negocio: alta de contenido en el catálogo.
    // EN: We validate the core business operation: adding content to the catalog.
    createTutorialMock.mockResolvedValue({
      data: {id: 20, title: 'Vue Patterns', summary: 'Composable architecture', categoryId: 1}
    });
    const store = usePublishingStore();

    // ES: Act -> invocamos el metodo del store que realiza la alta.
    // EN: Act -> invoke the store method that performs creation.
    store.addTutorial(new Tutorial({title: 'Vue Patterns', summary: 'Composable architecture', categoryId: 1}));
    await Promise.resolve();
    await Promise.resolve();

    // ES: Assert -> verificamos que el estado local refleje la nueva entidad.
    // EN: Assert -> verify local state reflects the new entity.
    expect(store.tutorials.length).toBe(1);
    expect(store.tutorials[0].id).toBe(20);
    expect(store.tutorials[0].title).toBe('Vue Patterns');
    expect(store.tutorials[0].categoryId).toBe(1);
  });
});
