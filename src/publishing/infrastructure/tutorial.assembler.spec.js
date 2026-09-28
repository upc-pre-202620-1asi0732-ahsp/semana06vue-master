import {describe, expect, it} from 'vitest';
import {TutorialAssembler} from './tutorial.assembler.js';

describe('TutorialAssembler (Unit)', () => {
  it('maps API payload into tutorial entities preserving business fields', () => {
    // ES: Esta prueba protege la capa de traducción API->dominio para evitar datos inconsistentes en UI.
    // EN: This test protects the API->domain translation layer to avoid inconsistent UI data.
    const tutorials = TutorialAssembler.toEntitiesFromResponse({
      status: 200,
      data: [{id: 9, title: 'Pinia', summary: 'State patterns', categoryId: 3}]
    });

    expect(tutorials).toHaveLength(1);
    expect(tutorials[0].id).toBe(9);
    expect(tutorials[0].title).toBe('Pinia');
    expect(tutorials[0].summary).toBe('State patterns');
    expect(tutorials[0].categoryId).toBe(3);
  });
});
